const formidable = require('formidable'),
	googleApi = require('./google_api'),
	fs = require('fs-extra'),
	puppet = require('puppeteer'),
	htmlTemplate = require('angular-template'),
	process = require('process');

module.exports = {
	init: function (req, res) {
		
		var form = new formidable.IncomingForm({
			uploadDir: process.cwd() + '/server/temp_image',
			keepExtensions: true,
		});
		form.on('fileBegin', function (name, file) {
			file.path = process.cwd() + '/server/temp_image/' + file.name;
		});
		
		form.addListener('file', function (name, file) {
		});
		form.parse(req, function (err, fields, files) {
			fs.writeFile('server/assets/testMeText.json', JSON.stringify(fields));
			if (err) {
				// Check for and handle any errors here.
				console.error('error parse: ', err.message);
				return;
			}
			this.generatePdf(googleApi.sendToDrive, fields, res);
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
	puppetPdf: async function (fields) {
		const browser = await puppet.launch({
				//remove security issue with chromium
				headless: true,
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
		await page.pdf({
			path: 'server/pdfs/mypdf.pdf',
			format: 'A4',
			printBackground: true,
			pageRanges: '1'
		});
		await browser.close();
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
