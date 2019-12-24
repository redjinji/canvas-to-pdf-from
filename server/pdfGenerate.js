const formidable = require('formidable'),
	googleApi = require('./google_api'),
    fs = require('fs-extra'),
	puppet = require('puppeteer'),
	htmlTemplate = require('angular-template'),
	process = require('process');

module.exports = {
	init:function (req, res) {
		var reqBody = req.body;
		async function generatPdf(callbackFunc, fields) {
			try {
				const browser = await puppet.launch({
					//remove security issue with chromium
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

				await page.emulateMedia('screen');
				await page.pdf({
					path: 'server/pdfs/mypdf.pdf',
					format: 'A4',
					printBackground: true
				});
				await browser.close();

				callbackFunc(fields);
			} catch (e) {
				console.log('our error', e);
			}
		};
		var form = new formidable.IncomingForm({
			uploadDir: process.cwd() + '/server/temp_image',
			keepExtensions: true,
		});
		form.on('fileBegin', function (name, file) {
			file.path = process.cwd() + '/server/temp_image/' + file.name;
		});
		
		form.addListener('file', function (name, file) {
		});
		form.parse(req, function(err, fields, files) {
			let lessfiled = fields;
            fs.writeFile('server/assets/testMeText.json', JSON.stringify(fields));
			if (err) {
				// Check for and handle any errors here.
				console.error('error parse: ',err.message);
				return;
			}
			generatPdf(googleApi.sendToDrive, fields);
		}.bind(this));
		
		// res.sendFile(path.join(process.cwd() + '/client/index.html'));
		
		// res.end();
	},
	getTemplate: function () {
		return fs.readFileSync('final-form.html');
    }
};
