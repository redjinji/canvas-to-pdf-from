const formidable = require('formidable'),
	googleApi = require('./google_api'),
	puppet = require('puppeteer'),
	process = require('process');

module.exports = {
	init:function (req, res) {
		
		async function generatPdf(callbackFunc) {
			try {
				const browser = await puppet.launch();
				const page = await browser.newPage();

				await page.setContent(`<body dir="rtl"></bocy><h1 style="">טופס הזמנת מדרסים</h1>
<img alt="this is the camvas" style="background-color: red" width="300" height="300" src="http://localhost:3000/temp_image/canvas1.jpg" />
<p>סוף טופס הזמנת מדרסים</p></body>
`);

				await page.emulateMedia('screen');
				await page.pdf({
					path: 'server/pdfs/mypdf.pdf',
					format: 'A4',
					printBackground: true
				});
				await browser.close();

				callbackFunc();
			} catch (e) {
				console.log('our error', e);
			}
		}
		
		var form = new formidable.IncomingForm({
			uploadDir: process.cwd() + '/server/temp_image',
			encoding: 'binary',
			keepExtensions: false,
		});
		
		form.on('fileBegin', function (name, file) {
			file.path = process.cwd() + '/server/temp_image/' + file.name;
		});
		
		form.addListener('file', function (name, file) {
		});
		form.parse(req, function(err, fields, files) {
			if (err) {
				// Check for and handle any errors here.
				console.error('error parse: ',err.message);
				return;
			}
			generatPdf(googleApi.sendToDrive);
		}.bind(this));
		
		// res.sendFile(path.join(process.cwd() + '/client/index.html'));
		
		// res.end();
	}
};
