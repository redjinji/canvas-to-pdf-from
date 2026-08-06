const { formidable } = require('formidable'),
	googleApi = require('./google_api'),
	fs = require('fs-extra'),
	puppet = require('puppeteer'),
	htmlTemplate = require('angular-template'),
	process = require('process');

// Scale-to-fit safety net constants, in the same "pre-print, screen-media proxy mm" units as
// contentHeightMm below (NOT physical printed mm - see the comment on that measurement, in
// puppetPdf). NOT the physical A4 page height (297mm) either.
//
// The invariant these protect: the footer ".business-card" text lands on printed page 1 (a second,
// EMPTY trailing page from body min-height/margin spillover is normal and fine - even the fixture,
// contentHeightMm=326.24, renders that way).
//
// NO_SCALE_MM: the true no-scale-needed boundary was bisected at ~329.6mm in these proxy units
// (329.588 -> footer on page 1; 329.675 -> footer dropped to page 2, checked with
// `pdftotext -bbox-layout` on unrestricted renders). The 329.5 gate sits only ~0.1mm below the
// last confirmed-good point - a thin margin, not a generous one.
//
// TARGET_MM: applied as scale = Math.min(1, TARGET_MM / contentHeightMm). The largest value that
// would keep the footer on page 1 declines as content grows (bisected via real `page.pdf({scale})`
// renders): implied-safe TARGET_MM is 324.29 at 388mm of content, 323.20 at 401mm, 322.40 at
// 415mm, 320.85 at 437mm, 319.38 at 464mm, 318.82 at 477mm. 318 sits below every measured value,
// so it is verified safe through ~477mm; the cost on realistic submissions is negligible (scale
// 0.946 instead of 0.964 at the 336mm long-text point). Beyond ~480mm the series keeps declining
// and is NOT verified - reaching it needs several thousand characters of free text, which the UI
// permits (maxLength 10000 per textarea) and the server does not cap; capping server-side is the
// right future hardening for that tail.
const NO_SCALE_MM = 329.5; // below this, content already fits at scale 1 - no correction applied
const TARGET_MM = 318; // linear ratio target, verified safe across the measured 330-477mm sweep

module.exports = {
	init: function (req, res) {
		const uploadDir = process.cwd() + '/server/temp_image';
		fs.ensureDirSync(uploadDir);
		const form = formidable({ uploadDir, keepExtensions: true });
		form.on('fileBegin', function (name, file) {
			file.filepath = uploadDir + '/' + file.originalFilename;
		});
		form.parse(req, function (err, fields, files) {
			if (err) {
				console.error('error parse: ', err.message);
				// An aborted/failed upload must still get a response, or the client
				// hangs until the router's idle timeout (seen in production as H28/499).
				if (!res.headersSent) res.status(400).json({status: 'fail', error: err.message});
				return;
			}
			const single = {};
			for (const [k, v] of Object.entries(fields)) single[k] = Array.isArray(v) ? v[0] : v;
			const imageBytes = ['image0', 'image1', 'image2']
				.map(k => `${k}=${((single[k] || '').length / 1024).toFixed(0)}KB`).join(' ');
			console.log(`sendForm parsed: ${Object.keys(single).length} fields, ` +
				`${(JSON.stringify(single).length / 1024).toFixed(0)}KB total, ${imageBytes}`);
			fs.writeFile('server/assets/testMeText.json', JSON.stringify(single));
			this.generatePdf(googleApi.sendToDrive, single, res);
		}.bind(this));

		// res.sendFile(path.join(process.cwd() + '/client/index.html'));

		// res.end();
	},
	regeneratePdf: async function(req, res) {
		try {
			const json = await fs.readJson('server/assets/testMeText.json');
			await this.puppetPdf(json);
			res.send('done');
		} catch (e) {
			console.error('regeneratePdf error:', e);
			res.status(500).json({ status: 'fail', error: e && e.message ? e.message : String(e) });
		}
	},
	// Exposed so server/test/pdf.test.js asserts against the same single source of truth rather
	// than duplicated magic numbers. See the derivation comment above for what each one means.
	NO_SCALE_MM,
	TARGET_MM,
	// Submissions saved before Task 3 (and old test fixtures) lack these keys, and
	// angular-template throws on any interpolated key that is absent - so default them
	// before every render. insolesDetail is derived here rather than tested in the
	// template because ht-if cannot compare against Hebrew literals (the template source
	// is entity-encoded, so treatedInsoles === 'כן' never matches).
	prepareTemplateFields: function (fields) {
		for (const key of ['treatedInsoles', 'insolesType', 'insolesDuration', 'midrasType']) {
			if (fields[key] === undefined) fields[key] = '';
		}
		fields.insolesDetail = [
			fields.insolesType && `סוג: ${fields.insolesType}`,
			fields.insolesDuration && `זמן: ${fields.insolesDuration}`,
		].filter(Boolean).join(', ');
		return fields;
	},
	puppetPdf: async function (fields, outPath = 'server/pdfs/mypdf.pdf', options = {}) {
		// pageRanges defaults to '1' (existing behavior: print only physical page 1). Pass an
		// explicit empty string ({ pageRanges: '' }) to print every physical page instead; omitting
		// the key (or passing undefined) takes the '1' default, since that is how the destructuring
		// default below behaves. The empty-string form is used by server/test/pdf.test.js's real
		// end-to-end checks, which need to see the *whole* rendered document so they can tell which
		// physical page the footer actually landed on - the invariant that matters (a trailing empty
		// page is fine and expected; see the derivation comment above).
		const { pageRanges = '1' } = options;
		const browser = await puppet.launch({
				//remove security issue with chromium
				headless: true,
				executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH || undefined,
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
				]
			}
		);
		// Everything from here on is wrapped in try/finally so the Chromium process launched above is
		// always closed - including when rendering throws (e.g. a template error from a malformed
		// submission missing an expected field). Without this, a single bad render leaks a whole
		// Chromium process that outlives the request and is never cleaned up; repeated failures
		// accumulate leaked processes without bound.
		try {
			const page = await browser.newPage();

			this.prepareTemplateFields(fields);
			const htmlToParce = htmlTemplate(__dirname + '/final-form.html', fields);
			fs.writeFile('server/assets/testMeText.html', htmlToParce);
			await page.setContent(htmlToParce);

			await page.emulateMediaType('screen');
			// page.setContent only waits for the 'load' event, which does not guarantee the Alef webfont
			// (requested via <link> in final-form.html's <head>) has finished loading and applying yet.
			// If the measurement below ran before Alef was ready, the browser would still be rendering
			// with its fallback (Arial) metrics at that instant - shorter than Alef's - so
			// contentHeightMm would be under-measured and the scale-to-fit safety net below could fail to
			// engage for content that actually needs it, silently dropping the footer onto page 2 (the
			// exact regression this whole safety net exists to prevent). Waiting on document.fonts.ready
			// guarantees the font used for the height measurement is the same one Chrome will actually
			// print with.
			await page.evaluate(() => document.fonts.ready);
			// Regression guard measurement: body.getBoundingClientRect().height (CSS px -> mm @ 96dpi)
			// *before* Chrome's print pipeline runs. Because <body> is deliberately wider (225mm) than
			// the A4 page (210mm) and Chrome's printToPDF scales the whole page down to fit page width,
			// this number is NOT the physical printed height (it runs ~30mm above the true ~292-297mm
			// print result) - it's a stable, deterministic proxy for "how tall the content wants to
			// be". See the scale-to-fit constants above and server/test/pdf.test.js for how it's used
			// and calibrated.
			// Why content can overflow at all: Chromium >=151 actually applies the Alef webfont
			// (older renders silently fell back to Arial) and Alef's line box is taller - see the
			// line-height comment in final-form.html. The scale net exists because that line-height
			// compensation leaves only a few mm of headroom for longer real-world submissions.
			const { contentHeightMm, footerBottomMm } = await page.evaluate(() => {
				const toMm = (px) => px / 96 * 25.4;
				const footerEl = document.querySelector('.business-card');
				return {
					contentHeightMm: toMm(document.body.getBoundingClientRect().height),
					footerBottomMm: footerEl ? toMm(footerEl.getBoundingClientRect().bottom) : null,
				};
			});

			// Dynamic scale-to-fit safety net: the line-height fix restores parity for the fixture, but
			// only leaves a few mm of headroom before longer real-world submissions (extra lines in
			// patalog/comments, etc.) push the footer onto page 2 again. Rather than relying solely on
			// a static content-height ceiling to *detect* that (which can pass while the footer is
			// already lost), shrink the printed page whenever measured content exceeds NO_SCALE_MM,
			// so pathological submissions degrade
			// to a slightly smaller single page instead of silently losing the contact bar. Typical/
			// fixture submissions measure below NO_SCALE_MM and print at scale 1 (unchanged from
			// before this safety net existed). See the derivation comment above NO_SCALE_MM/TARGET_MM
			// for why a plain linear ratio (not a power curve) is correct here.
			const scale = contentHeightMm <= NO_SCALE_MM
				? 1
				: Math.max(0.1, Math.min(1, TARGET_MM / contentHeightMm));

			await page.pdf({
				path: outPath,
				format: 'A4',
				printBackground: true,
				pageRanges,
				scale
			});
			return { contentHeightMm, scale, footerBottomMm };
		} finally {
			await browser.close();
		}
	},
	generatePdf: async function(callbackFunc, fields, res) {

		function sendResolve(status) {
			res.json(status);
		}

		let generatePdfPromise;
		try {
			await this.puppetPdf(fields)

			generatePdfPromise = callbackFunc(fields);
			// Attach a handler to the Drive-upload promise immediately, at creation. Without this, a
			// rejection (e.g. missing MAIN_CREDENTIALS, which sendToDrive rejects synchronously) can
			// be reported as an unhandled promise rejection - and crash the whole process - while
			// we're still awaiting sendMail below, since that await introduces a microtask gap before
			// generatePdfPromise.then(...) is reached further down. The no-op catch here just marks
			// the promise as handled; the real resolved/rejected value is still read from
			// generatePdfPromise via the .then(sendResolve, sendResolve) call below, so the response
			// sent to the client is unchanged for the fully-credentialed path.
			generatePdfPromise.catch(() => {});

			if (fields.email && fields.email.indexOf('@') > -1 || fields.fieldAgentMail && fields.fieldAgentMail.indexOf('@') > -1) {
				await googleApi.sendMail(fields);
			}

			await generatePdfPromise.then(sendResolve, sendResolve);
		} catch (e) {
			console.log('our error', e);
			if (!res.headersSent) {
				res.status(500).json({ status: 'fail', error: e && e.message ? e.message : String(e) });
			}
		}
	},
	getTemplate: function () {
		return fs.readFileSync('final-form.html');
	}
};
