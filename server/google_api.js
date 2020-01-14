const fs = require('fs-extra'),
	readline = require('readline'),
	nodemailer = require('nodemailer'),
	xoauth2 = require('xoauth2'),
	{google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/'];

//configure environment variable
var BASE_FOLDER_LOCATION = process.cwd() + '/server/assets/google/';
var TOKEN_PATH_DRIVE = '';
var CREDENTIAL_PATH_DRIVE = '';
var TOKEN_PATH_SHEETS = '';
var TOKEN_PATH_GMAIL = '';
var CREDENTIAL_PATH_SHEETS = '';
var SPEADSHEET_ID = '';
var DRIVE_UPLOAD_FOLDER = '';
if (process.env.PORT) {
	TOKEN_PATH_DRIVE = `${BASE_FOLDER_LOCATION}prodDriveToken.json`;
	TOKEN_PATH_SHEETS = `${BASE_FOLDER_LOCATION}prodSheetsToken.json`;
	CREDENTIAL_PATH_DRIVE = `${BASE_FOLDER_LOCATION}prodDriveCredentials.json`;
	CREDENTIAL_PATH_SHEETS = `${BASE_FOLDER_LOCATION}prodSheetsCredentials.json`;
	SPEADSHEET_ID = '1FSERWuYpuGe3c8i0EGaVyOd_lXhfluGCEQUkrX7H_pI';
	DRIVE_UPLOAD_FOLDER = '1W3sXBWrWIwRKwjH-hcVZCyJDZVGBKwCU';
} else {
	TOKEN_PATH_GMAIL = `${BASE_FOLDER_LOCATION}stgGmailToken.json`;
	TOKEN_PATH_DRIVE = `${BASE_FOLDER_LOCATION}stgDriveToken.json`;
	TOKEN_PATH_SHEETS = `${BASE_FOLDER_LOCATION}stgSheetsToken.json`;
	CREDENTIAL_PATH_DRIVE = `${BASE_FOLDER_LOCATION}stgDriveCredentials.json`;
	CREDENTIAL_PATH_SHEETS = `${BASE_FOLDER_LOCATION}stgSheetsCredentials.json`;
	SPEADSHEET_ID = '1vCpaiEg8BFRvJ9u_ywKBhJbQGOdCD8-Gv6ABIrWKIiI';
	DRIVE_UPLOAD_FOLDER = '1jlag_Kq8VCH-MkD10whsaxacOxUPOECp';
}

//end of configure environment

function getAccessToken(oAuth2Client, callback, service, tokenPath) {
	let authUrl;
	if(service === 'gmail'){
		authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://mail.google.com/',
		});
	} else {
		authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: `${SCOPES}${service}`,
		});
	}
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', function (code) {
		rl.close();
		oAuth2Client.getToken(code, function (err, token) {
			if (err) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(tokenPath, JSON.stringify(token), function (err) {
				if (err) return console.error(err);
				console.log('Token stored to', tokenPath);
			});
			callback(oAuth2Client);
		});
	});
}

function authorize(credentials, callback, dataForCallback, service, tokenPath) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);
	
	// Check if we have previously stored a token.
	fs.readFile(tokenPath, function (err, token) {
		if (err) return getAccessToken(oAuth2Client, callback, service, tokenPath);
		let parsedToken = JSON.parse(token);
		oAuth2Client.setCredentials(parsedToken);
		callback(oAuth2Client, dataForCallback, credentials);
	});
}

module.exports = {
	sendMail: function () {
		fs.readFile(CREDENTIAL_PATH_DRIVE, function (err, content) {
			// console.log(JSON.parse(content));
			if (err) return console.log('Error loading client secret file:', err);
			authorize(JSON.parse(content), sendMail, '', 'gmail', TOKEN_PATH_GMAIL);
		});
		
		function sendMail(oAuth2Client, dataForCallback, credentials) {
			var smtpTransport = nodemailer.createTransport({
				debug: true,
				logger: true,
				service: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user: 'redjinji@gmail.com',
					// pass: 'tr1234569870',
					
					type: 'OAuth2',
					clientId: credentials.client_id,
					clientSecret: credentials.client_secret,
					refreshToken: oAuth2Client.refresh_token,
					accessToken: oAuth2Client.access_token,
					expires: oAuth2Client.expiry_date
				}
				/*service: 'gmail',
				auth:{
					xoauth2: xoauth2.createXOAuth2Generator({
						user: 'redjinji@gmail.com',
						clientId: credentials.client_id,
						clientSecret: credentials.client_secret,
						refreshToken: oAuth2Client.refresh_token,
						accessToken: oAuth2Client.access_token
					})
				}*/
			});
			
			let message = {
				from: 'redjinji@gmail.com',
				to: 'redjinji@gmail.com',
				subject: 'test mail subject',
				text: 'test mail text',
				html: '<p>test mail html</p>'
			};
			
			smtpTransport.sendMail(message, (err, info)=>{
				console.log();
				console.log();
				console.log();
				console.log('err: ', err);
				console.log('info: ', info);
				smtpTransport.close();
			});
		}
	},
	
	sendToDrive: function (formFields) {
		fs.readFile(CREDENTIAL_PATH_DRIVE, function (err, content) {
			if (err) return console.log('Error loading client secret file:', err);
			authorize(JSON.parse(content), uploadPdf, formFields, 'drive', TOKEN_PATH_DRIVE);
		});
		
		function uploadPdf(auth, formFields) {
			const drive = google.drive({version: 'v3', auth});
			
			const fileMetadata = {
				'name': `${formFields.fieldAgent} - ${formFields.name}`,
				parents: [DRIVE_UPLOAD_FOLDER]
			};
			const media = {
				mimeType: 'application/pdf',
				body: fs.createReadStream(process.cwd() + '/server/pdfs/mypdf.pdf')
			};
			
			drive.files.create({
				resource: fileMetadata,
				media: media,
				fields: 'id'
			}, function (err, file) {
				if (err) {
					console.error('error uploding', err);
				} else {
					console.log('File Id: ', file.id);
				}
			});
		}
	},
	
	getUserSheets: new Promise(function (resolve, reject) {
		fs.readFile(CREDENTIAL_PATH_SHEETS, (err, content) => {
			if (err) return console.log('Error loading client secret file:', err);
			authorize(JSON.parse(content), listMajors, '', 'spreadsheets', TOKEN_PATH_SHEETS);
		});
		
		function listMajors(auth) {
			const sheets = google.sheets({version: 'v4', auth});
			sheets.spreadsheets.values.get({
				spreadsheetId: SPEADSHEET_ID,
				range: 'A:B',
			}, (err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					resolve(rows);
				} else {
					console.log('No data found.');
				}
			});
		}
	})
};
