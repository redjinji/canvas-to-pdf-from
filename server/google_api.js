const fs = require('fs-extra'),
	readline = require('readline'),
	nodemailer = require('nodemailer'),
	{google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/'];

const GMAIL = 'GMAIL',
	SHEET = 'SHEET',
	DRIVE = 'DRIVE',
	_TOKEN = '_TOKEN',
	_CREDENTIALS = '_CREDENTIALS';

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

function authorize(credentials, callback, dataForCallback, service, tokenName) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	
	// Check if we have previously stored a token.
	if(process.env[`${tokenName}${_TOKEN}`]) {
		let parsedToken = JSON.parse(process.env[`${tokenName}${_TOKEN}`]);
		oAuth2Client.setCredentials(parsedToken);
		callback(oAuth2Client, dataForCallback, credentials);
	} else {
		return getAccessToken(oAuth2Client, callback, service, tokenName);
	}
}

module.exports = {
	sendMail: function () {
		if(process.env.GMAIL_CREDENTIALS) {
			authorize(JSON.parse(process.env.GMAIL_CREDENTIALS), sendMail, '', 'gmail', GMAIL);
		} else {
			let error = 'Gmail credentials didn\'t found';
			console.log(error);
		}
		
		function sendMail(oAuth2Client, dataForCallback, credentials) {
			var smtpTransport = nodemailer.createTransport({
				// debug: true,
				// logger: true,
				service: 'gmail',
				port: 465,
				secure: true,
				auth: {
					type: 'OAuth2',
					user: 'redjinji@gmail.com',
					clientId: credentials.installed.client_id,
					clientSecret: credentials.installed.client_secret,
					refreshToken: oAuth2Client.credentials.refresh_token,
					accessToken: oAuth2Client.credentials.access_token,
					expires: oAuth2Client.credentials.expiry_date
				}
			});
			
			let message = {
				from: 'redjinji@gmail.com',
				to: 'redjinji@gmail.com',
				subject: 'test mail subject',
				text: 'test mail text',
				html: '<p>test mail html</p>',
				attachments: [
					{
						filename: 'file  - name.pdf',
						path: process.cwd() + '/server/pdfs/mypdf.pdf'
					}
				]
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
	
	sendToDrive: async function (formFields, res) {
		function uploadPdf(auth, formFields) {
			const drive = google.drive({version: 'v3', auth});
			
			const fileMetadata = {
				'name': `${formFields.fieldAgent} - ${formFields.name}`,
				parents: [process.env.DRIVE_UPLOAD_FOLDER]
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
					res.json({status:'fail to drive'})
				} else {
					console.log('File Id: ', file.id);
					res.json({status:'success'})
				}
			});
		};
		if(process.env.DRIVE_CREDENTIALS) {
			authorize(JSON.parse(process.env.DRIVE_CREDENTIALS), uploadPdf, formFields, 'drive', DRIVE);
		} else {
			let error = 'drive credentials didn\'t found';
			console.log(error);
			res.json({status:error});
		}
	},
	
	getUserSheets: new Promise(function (resolve, reject) {
		
		if(process.env.SHEET_CREDENTIALS) {
			authorize(JSON.parse(process.env.SHEET_CREDENTIALS), listMajors, '', 'spreadsheets', SHEET);
		} else {
			let error = 'sheets credentials didn\'t found';
			console.log(error);
			reject(error);
		}
		
		function listMajors(auth) {
			const sheets = google.sheets({version: 'v4', auth});
			sheets.spreadsheets.values.get({
				spreadsheetId: process.env.SPEADSHEET_ID,
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
