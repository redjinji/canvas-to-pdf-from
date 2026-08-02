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
// So the true no-scale-needed boundary sits at ~329.6mm in this proxy's units, with the gate
// below (329.5) sitting only ~0.1mm below the last confirmed-good point - a thin margin, not a
// generous one. (Fix round 2's write-up claimed the opposite - that marginal overflow "may be
// under-rescued" - which had it backwards: the risk at this boundary is running the gate too
// close, not under-correcting past it. Corrected in fix round 3.)
//
// Derivation (fix round 3) - the *criterion* fix round 2 calibrated its scale curve against was
// wrong. It treated "whole document collapses to 1 physical page" as the target, but even the
// fixture (contentHeightMm=326.24, comfortably below the gate) genuinely renders as 2 physical
// pages at scale 1 - page 2 is harmless body min-height/margin spillover with no content on it,
// and that fixture PDF is correct today. The only invariant that actually matters is "the footer
// lands on printed page 1"; a second, empty trailing page is fine. Judged against that corrected
// criterion, fix round 2's power-of-5 curve was badly over-corrected - independently re-bisected
// here (via real, unrestricted `page.pdf({scale})` renders, checking with `pdftotext -bbox-layout`
// + `pdfinfo` which physical page the footer's ".business-card" text lands on) at three magnitudes:
//   contentHeightMm=329.66 -> footer-on-page-1 needs scale <= ~1.00   (old ^5 curve applied 0.9629)
//   contentHeightMm=336.05 -> footer-on-page-1 needs scale <= ~0.978  (old ^5 curve applied 0.8724)
//   contentHeightMm=381.84 -> footer-on-page-1 needs scale <= ~0.850  (old ^5 curve applied 0.4606,
//                                                                       i.e. ~5pt text, half the
//                                                                       sheet left blank)
// The old curve's justification - "a plain ratio can never correct enough while leaving the
// fixture untouched" - assumed the correction had to hit ~0.96 at contentHeightMm=329.675 (the
// wrong, too-strict criterion above). Under the real criterion, that same point only needs
// scale <= ~1.00, i.e. next to no correction at all; the NO_SCALE_MM gate already keeps the
// fixture untouched, so anchoring the ratio's target *above* the fixture height was never
// necessary. A plain linear ratio is sufficient once anchored correctly:
//   scale = Math.min(1, TARGET_MM / contentHeightMm)
// With TARGET_MM=324 this gives scale ~0.983 / ~0.964 / ~0.849 at the three points above -
// comfortably inside the empirically-measured safe region at each (re-verified directly against
// real renders, not just the arithmetic). Note this is a local calibration: spot-checked well
// beyond these points (a ~473mm synthetic case) the plain ratio's margin shrinks and can invert -
// this formula is tuned for the realistic long-submission range demonstrated above, not proven
// safe at arbitrary overflow. See task-7-report.md, "Fix round 3" for the full data.
const NO_SCALE_MM = 329.5; // below this, content already fits at scale 1 - no correction applied
const TARGET_MM = 324; // linear ratio target; empirically verified (see derivation above) to give
                        // enough correction at realistic overflow magnitudes while the NO_SCALE_MM
                        // gate (not this constant) is what keeps the fixture untouched

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
	TARGET_MM,
	puppetPdf: async function (fields, outPath = 'server/pdfs/mypdf.pdf', options = {}) {
		// pageRanges defaults to '1' (existing behavior: print only physical page 1). Callers can
		// pass { pageRanges: '' } (or undefined) to print every physical page instead - used by
		// server/test/pdf.test.js's real end-to-end check, which needs to see the *whole* rendered
		// document to confirm it is truly only 1 physical page, not just that page 1 was printed.
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
