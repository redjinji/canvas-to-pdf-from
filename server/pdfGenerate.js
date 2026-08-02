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
// Derivation (fix round 2), part 1 - find the true single-page boundary: the previous regression
// guard only asserted contentHeightMm against a static 333mm ceiling, which a reviewer showed
// still passes states where the footer contact bar has already fallen onto page 2 (which
// `pageRanges: '1'` then silently discards) - up to 332.78mm on a realistic 3-line
// pathology-description submission. To find the *real* boundary, we bisected on a synthetic
// line-height sweep of the fixture template, rendering full PDFs (no pageRanges restriction) and
// checking with `pdftotext -bbox-layout` which physical page the footer's ".business-card" text
// (active8.il / phone numbers) actually lands on:
//   contentHeightMm=329.588 (line-height 1.132) -> footer text found on page 1 (fits)
//   contentHeightMm=329.675 (line-height 1.135) -> footer text found on page 2 (dropped)
// So the true no-scale-needed boundary sits at ~329.6mm in this proxy's units.
//
// Derivation, part 2 - why a plain `TARGET_MM / contentHeightMm` ratio (as first specified) is
// NOT used: that plain ratio was implemented and directly tested against real, unrestricted
// (no-pageRanges) renders at several overflow magnitudes, bisecting page.pdf()'s `scale` option
// to find the real minimum scale that actually produces a single physical page:
//   contentHeightMm=329.675 -> real single-page requires scale <= ~0.96   (plain ratio gives 0.9995 - not enough)
//   contentHeightMm=336.054 -> real single-page requires scale <= ~0.917  (plain ratio gives 0.980  - not enough)
//   contentHeightMm=375.295 -> real single-page requires scale <= ~0.80   (plain ratio gives 0.878  - not enough)
// Chrome's print engine turns out to be far more sensitive than a linear ratio near the boundary:
// a fraction of a millimeter of overflow can flip a whole line of justified Hebrew text between
// wrapping and not wrapping, which is a step change, not a smooth one. A plain reciprocal ratio,
// anchored so the fixture (contentHeightMm=326.24) is untouched (ratio >= 1), is provably unable
// to ever produce a strong enough correction (verified: even the most aggressive ratio allowed by
// that constraint, using TARGET_MM=326.24 itself, only reaches ~0.99 at the 329.675 case - nowhere
// near the ~0.96 actually required). So the ratio is raised to an empirically-fit power (5) using
// a slightly lower base target (327mm, still >= the fixture so it stays untouched) to inject the
// needed steepness just past the boundary; this was verified against all three real data points
// above (each comes out comfortably on the safe/aggressive side) plus a fourth direct check at the
// most marginal point (computed scale 0.9601 at contentHeightMm=329.675, empirically confirmed via
// a real Puppeteer render to still produce a single physical page).
const NO_SCALE_MM = 329.5; // below this, content already fits at scale 1 - no correction applied
const SCALE_TARGET_MM = 327; // base for the correction below; kept >= fixture height (326.24) so
                              // the fixture is never touched, regardless of the exponent
const SCALE_POWER = 5;

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
				// Check for and handle any errors here.
				console.error('error parse: ', err.message);
				return;
			}
			const single = {};
			for (const [k, v] of Object.entries(fields)) single[k] = Array.isArray(v) ? v[0] : v;
			fs.writeFile('server/assets/testMeText.json', JSON.stringify(single));
			this.generatePdf(googleApi.sendToDrive, single, res);
		}.bind(this));

		// res.sendFile(path.join(process.cwd() + '/client/index.html'));

		// res.end();
	},
	regeneratePdf: async function(req, res) {
		await fs.readJson('server/assets/testMeText.json').then(async (json) => {
			await this.puppetPdf(json)
			res('done')
		})
	},
	// Exposed so server/test/pdf.test.js asserts against the same single source of truth rather
	// than duplicated magic numbers. See the derivation comment above for what each one means.
	NO_SCALE_MM,
	SCALE_TARGET_MM,
	SCALE_POWER,
	puppetPdf: async function (fields, outPath = 'server/pdfs/mypdf.pdf') {
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
		const page = await browser.newPage();

		const htmlToParce = htmlTemplate(__dirname + '/final-form.html', fields);
		fs.writeFile('server/assets/testMeText.html', htmlToParce);
		await page.setContent(htmlToParce);

		await page.emulateMediaType('screen');
		// Regression guard measurement: body.getBoundingClientRect().height (CSS px -> mm @ 96dpi)
		// *before* Chrome's print pipeline runs. Because <body> is deliberately wider (225mm) than
		// the A4 page (210mm) and Chrome's printToPDF scales the whole page down to fit page width,
		// this number is NOT the physical printed height (it runs ~30mm above the true ~292-297mm
		// print result) - it's a stable, deterministic proxy for "how tall the content wants to
		// be". See the scale-to-fit constants above and server/test/pdf.test.js for how it's used
		// and calibrated.
		//
		// Root cause of the Task 7 (Puppeteer 17 -> 25) overflow regression, corrected: `pdffonts`
		// on the Task 1 baseline PDF (Puppeteer 17 / Chromium 106) shows every glyph embedded as
		// Arial - the `Alef` webfont requested via <link> in this template's <head> was NEVER
		// applied, i.e. the baseline shipped in a silent web-font-load failure/fallback. Under
		// Puppeteer 25 / Chromium 151, Alef *does* load and apply (confirmed via `pdffonts` on a
		// fresh render: embedded font is Alef-Regular), and Alef's normal line box is taller than
		// Arial's. That per-line growth, compounded across every stacked text block on the page, is
		// what pushes the footer business-card onto a second page that `pageRanges: '1'` then
		// discards - it is a font-substitution change (Arial fallback -> real Alef), not "Alef's
		// own line-height changing between browser versions." The explicit `line-height: 1.03` on
		// `html` below in final-form.html compensates for Alef's taller line box; the dynamic
		// scale-to-fit safety net here exists because the line-height compensation alone still has
		// only a few mm of headroom for longer real-world submissions.
		const { contentHeightMm, footerBottomMm } = await page.evaluate(() => {
			const toMm = (px) => px / 96 * 25.4;
			const footerEl = document.querySelector('.business-card');
			return {
				contentHeightMm: toMm(document.body.getBoundingClientRect().height),
				footerBottomMm: footerEl ? toMm(footerEl.getBoundingClientRect().bottom) : null,
			};
		});

		// Dynamic scale-to-fit safety net: the line-height fix restores parity for the fixture, but
		// only leaves a few mm of headroom (see task-7-report.md fix round 2) before longer
		// real-world submissions (extra lines in patalog/comments, etc.) push the footer onto page
		// 2 again. Rather than relying solely on a static content-height ceiling to *detect* that
		// (which a reviewer showed can pass while the footer is already lost), shrink the printed
		// page whenever measured content exceeds NO_SCALE_MM, so pathological submissions degrade
		// to a slightly smaller single page instead of silently losing the contact bar. Typical/
		// fixture submissions measure below NO_SCALE_MM and print at scale 1 (unchanged from
		// before this safety net existed). See the derivation comment above NO_SCALE_MM for why
		// this is a power curve rather than a plain ratio.
		const scale = contentHeightMm <= NO_SCALE_MM
			? 1
			: Math.max(0.1, Math.min(1, Math.pow(SCALE_TARGET_MM / contentHeightMm, SCALE_POWER)));

		await page.pdf({
			path: outPath,
			format: 'A4',
			printBackground: true,
			pageRanges: '1',
			scale
		});
		await browser.close();
		return { contentHeightMm, scale, footerBottomMm };
	},
	generatePdf: async function(callbackFunc, fields, res) {

		function sendResolve(status) {
			res.json(status);
		}

		try {
			await this.puppetPdf(fields)

			const generatePdfPromise = callbackFunc(fields);
			if (fields.email.indexOf('@') > -1 || fields.fieldAgentMail.indexOf('@') > -1) {
				await googleApi.sendMail(fields);
			}

			await generatePdfPromise.then(sendResolve, sendResolve);
		} catch (e) {
			console.log('our error', e);
		}
	},
	getTemplate: function () {
		return fs.readFileSync('final-form.html');
	}
};
