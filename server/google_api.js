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
	if (service === 'gmail') {
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
			console.log();
			console.log();
			console.log(token);
			console.log();
			console.log();
			
			callback(oAuth2Client);
		});
	});
}

function authorize(credentials, callback, dataForCallback, service, tokenName) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	
	// Check if we have previously stored a token.
	if (process.env[`${tokenName}${_TOKEN}`]) {
		let parsedToken = JSON.parse(process.env[`${tokenName}${_TOKEN}`]);
		oAuth2Client.setCredentials(parsedToken);
		callback(oAuth2Client, dataForCallback, credentials);
	} else {
		return getAccessToken(oAuth2Client, callback, service, tokenName);
	}
}

module.exports = {
	sendMail: function (fields) {
		return new Promise(function (resolve, reject) {
			
			if (process.env.MAIN_CREDENTIALS) {
				authorize(JSON.parse(process.env.MAIN_CREDENTIALS), sendMail, '', 'gmail', GMAIL);
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
						user: process.env.senderMail,
						clientId: credentials.installed.client_id,
						clientSecret: credentials.installed.client_secret,
						refreshToken: oAuth2Client.credentials.refresh_token,
						accessToken: oAuth2Client.credentials.access_token,
						expires: oAuth2Client.credentials.expiry_date
					}
				});
				
				let message = {
					from: process.env.senderMail,
					to: fields.email,
					cc: fields.fieldAgentMail,
					subject: 'הבדיקה שלך באקטיב8',
					html: '<p>תודה שבחרת בנו<br/>אקטיב8</p>',
					attachments: [
						{
							filename: `${fields.fieldAgentName} - ${fields.name}.pdf`,
							path: process.cwd() + '/server/pdfs/mypdf.pdf'
						}
					]
				};
				
				smtpTransport.sendMail(message, (err, info) => {
					if(err){
						console.log('err: ', err);
						reject(err);
					} else {
						console.log('info: ', info);
						resolve(info);
					}
					smtpTransport.close();
				});
			}
		});
	},
	
	sendToDrive: async function (formFields) {
		return new Promise(function (resolve, reject) {
			function uploadPdf(auth, formFields) {
				const drive = google.drive({version: 'v3', auth});
				
				const fileMetadata = {
					'name': `${formFields.fieldAgentName} - ${formFields.name}`,
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
						reject({status: 'fail', error: err})
					} else {
						// console.log('File Id: ', file.id);
						resolve({status: 'success'});
					}
				});
			}
			
			if (process.env.MAIN_CREDENTIALS) {
				authorize(JSON.parse(process.env.MAIN_CREDENTIALS), uploadPdf, formFields, 'drive', DRIVE);
				resolve({status: 'success'});
			} else {
				let error = 'drive credentials didn\'t found';
				console.log('error drive: ', error);
				reject({status: 'fail',error: error});
			}
		})
	},
	
	getUserSheets: new Promise(function (resolve, reject) {
		
		if (process.env.MAIN_CREDENTIALS) {
			authorize(JSON.parse(process.env.MAIN_CREDENTIALS), listMajors, '', 'spreadsheets', SHEET);
		} else {
			let error = 'sheets credentials didn\'t found';
			console.log('error sheets: ', error);
			reject(error);
		}
		
		function listMajors(auth) {
			const sheets = google.sheets({version: 'v4', auth});
			sheets.spreadsheets.values.get({
				spreadsheetId: process.env.SPEADSHEET_ID,
				range: 'A:C',
			}, (err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				console.log(rows)
				if (rows.length) {
					resolve(rows);
				} else {
					console.log('No data found.');
				}
			});
		}
	})
};