const express = require('express');
const bodyParser = require('body-parser');
const puppet = require('puppeteer');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');
const readline = require('readline');
const {google} = require('googleapis');
const process = require('process');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
var driveAUTH;
var drive;
console.log('process',process.cwd());
console.log('dir',__dirname);

async function generatPdf(data) {
	try {
		
		const browser = await puppet.launch();
		const page = await browser.newPage();
		
		await page.setContent(`<body dir="rtl"></bocy><h1 style="">טופס הזמנת מדרסים</h1>
<img alt="this is the camvas" style="background-color: red" width="300" height="300" src="http://localhost:3000/temp_image/canvas1.jpg" />
<p>סוף טופס הזמנת מדרסים</p></body>
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
		uploadPdf();
	} catch (e) {
		console.log('our error', e);
	}
}

const port = 3000;

app.get('/', (req, res) => {
	res.sendFile(path.join(process.cwd() + '/client/index.html'));
});

app.get('/js/:filename', (req, res) => {
	res.sendFile(path.join(process.cwd() + '/client/js/' + req.params.filename));
});

app.get('/css/:filename', (req, res) => {
	res.sendFile(path.join(process.cwd() + '/client/css/' + req.params.filename));
});

app.get('/temp_image/:filename', (req, res) => {
	res.sendFile(path.join(process.cwd() + '/server/temp_image/' + req.params.filename));
});

app.get('/pdfs/:filename', (req, res) => {
	res.sendFile(path.join(process.cwd() + '/server/pdfs/' + req.params.filename));
});

app.get('/some/:params', (req, res) => {
	app.use(bodyParser);
	console.log(req.params);
	res.send('Hello country!');
});

app.post('/something', (req, res) => {
	var form = new formidable.IncomingForm({
		uploadDir: process.cwd() + '/server/temp_image',
		encoding: 'binary',
		keepExtensions: false,
	});
	
	form.on('fileBegin', function (name, file) {
		file.path = process.cwd() + '/server/temp_image/' + file.name;
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
	
	res.sendFile(path.join(process.cwd() + '/client/index.html'));
	
	// res.end();
});

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
fs.readFile('server/driveCredentials.json', (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	// Authorize a client with credentials, then call the Google Drive API.
	authorize(JSON.parse(content), listFiles);
});
function authorize(credentials, callback) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);
	
	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getAccessToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}
function getAccessToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
			callback(oAuth2Client);
		});
	});
}
function listFiles(auth) {
	driveAUTH = auth;
	drive = google.drive({version: 'v3', auth});
	drive.files.list({
		pageSize: 10,
		fields: 'nextPageToken, files(id, name)',
	}, (err, res) => {
		if (err) return console.log('The API returned an error: ' + err);
		const files = res.data.files;
		if (files.length) {
			console.log('Files:');
			files.map((file) => {
				console.log(`${file.name} (${file.id})`);
			});
		} else {
			console.log('No files found.');
		}
	});
}

function uploadPdf(params) {
	console.log('pdf',fs.createReadStream(process.cwd() +'/server/pdfs/mypdf.pdf'));
	// console.log('jpg', fs.createReadStream(__dirname + '/temp_image/canvas1.jpg'));
	console.log('----------');
	const fileMetadata = {
		'name': 'mypdf.pdf',
		parents:['1jlag_Kq8VCH-MkD10whsaxacOxUPOECp']
	};
	const media = {
		mimeType: 'application/pdf',
		body: fs.createReadStream(process.cwd() +'/server/pdfs/mypdf.pdf')
	};
	drive.files.create({
		resource: fileMetadata,
		media: media,
		fields: 'id'
	}, function (err, file) {
		if (err) {
			// Handle error
			console.error('error uploding',err);
		} else {
			console.log('File Id: ', file.id);
		}
	});
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
