const { formidable } = require('formidable'),
	googleApi = require('./google_api'),
	fs = require('fs-extra'),
	puppet = require('puppeteer'),
	htmlTemplate = require('angular-template'),
	process = require('process');

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
		// Regression guard: body.getBoundingClientRect().height (CSS px -> mm @ 96dpi) *before*
		// Chrome's print pipeline runs. Because <body> is deliberately wider (225mm) than the
		// A4 page (210mm) and Chrome's printToPDF scales the whole page down to fit page width,
		// this number is NOT the physical printed height (it runs ~30mm above the true ~292-297mm
		// print result) - it's a stable, deterministic proxy for "how tall the content wants to
		// be". See server/test/pdf.test.js for the calibrated threshold and rationale: it exists
		// to catch exactly the class of bug fixed alongside this comment, where Chromium's default
		// line-height for the Alef webfont grew across a Puppeteer/Chrome upgrade, silently pushing
		// the footer (business contact bar) onto a second page that pageRanges discards.
		const contentHeightMm = await page.evaluate(() => document.body.getBoundingClientRect().height / 96 * 25.4);
		await page.pdf({
			path: outPath,
			format: 'A4',
			printBackground: true,
			pageRanges: '1'
		});
		await browser.close();
		return { contentHeightMm };
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
