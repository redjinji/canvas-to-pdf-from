const express = require('express');
const bodyParser = require('body-parser');
const puppet = require('puppeteer');
const FormData = require('form-data');
const formidable = require('formidable');
const http = require('http');
const path = require('path');
const fs = require('fs-extra');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();

async function generatPdf(data) {
	try {
		
		const browser = await puppet.launch();
		const page = await browser.newPage();
		
		await page.setContent(`<h1>Hello World</h1>
<img alt="this is the camvas" style="background-color: red" width="300" height="300" src="http://localhost:3000/temp_image/canvas1.jpg" />
<p>end of pdf</p>
`);
		await page.emulateMedia('screen');
		await page.pdf({
			path: 'pdfs/mypdf.pdf',
			format: 'A4',
			prontBackground: true
		});
		console.log('done');
		await browser.close();
		console.log('close');
	} catch (e) {
		console.log('our error', e);
	}
}

const port = 3000;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/js/:filename', (req, res) => {
	res.sendFile(path.join(__dirname + '/js/' + req.params.filename));
});

app.get('/css/:filename', (req, res) => {
	res.sendFile(path.join(__dirname + '/css/' + req.params.filename));
});

app.get('/temp_image/:filename', (req, res) => {
	res.sendFile(path.join(__dirname + '/temp_image/' + req.params.filename));
});

app.get('/some/:params', (req, res) => {
	app.use(bodyParser);
	console.log(req.params);
	res.send('Hello country!');
});

app.post('/something', (req, res) => {
	var form = new formidable.IncomingForm({
		uploadDir: __dirname + '/temp_image',
		encoding: 'binary',
		keepExtensions: false,
	});
	
	form.on('fileBegin', function (name, file) {
		file.path = __dirname + '/temp_image/' + file.name;
	});
	
	form.addListener('file', function (name, file) {
		// console.log(59,name);
		// console.log(60,file);
	});
	form.parse(req, function (err, fields, files) {
		console.log('start partsing');
		// console.log(64,files);
		// console.log(65,fields);
		// console.log(66,err);
		if (err) {
			
			// Check for and handle any errors here.
			
			// console.error(71,err.message);
			return;
		}
		// res.writeHead(200, {'content-type': 'text/plain'});
		// res.write('received upload:\n\n');
		// res.sendFile(path.join(__dirname + '/index.html'));
		// res.end();
		// This last line responds to the form submission with a list of the parsed data and files.
		generatPdf();
		//res.end(util.inspect({fields: fields, files: files}));
	});
	
	// console.log(82,req.body);
	// console.log(req.body.image_file);
	// console.log(req.body.userName);
	
	res.sendFile(path.join(__dirname + '/index.html'));
	
	// res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
