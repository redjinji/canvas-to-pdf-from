const fs = require('fs-extra'),
	readline = require('readline'),
	{google} = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

module.exports = {
	driveAUTH: undefined,
	drive: undefined,
	credentials: undefined,
	a: undefined,
	sendToDrive: function () {
		fs.readFile('server/driveCredentials.json', function (err, content) {
			if (err) return console.log('Error loading client secret file:', err);
			// Authorize a client with credentials, then call the Google Drive API.
			// authorize(JSON.parse(content),()=>{});
			this.credentials = content;
			authorize(JSON.parse(content), uploadPdf);
		});
		
		function authorize(credentials, callback) {
			const {client_secret, client_id, redirect_uris} = credentials.installed;
			const oAuth2Client = new google.auth.OAuth2(
				client_id, client_secret, redirect_uris[0]);
			
			// Check if we have previously stored a token.
			fs.readFile(TOKEN_PATH, function (err, token) {
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
			rl.question('Enter the code from that page here: ', function (code) {
				rl.close();
				oAuth2Client.getToken(code, function (err, token) {
					if (err) return console.error('Error retrieving access token', err);
					oAuth2Client.setCredentials(token);
					// Store the token to disk for later program executions
					fs.writeFile(TOKEN_PATH, JSON.stringify(token), function (err) {
						if (err) return console.error(err);
						console.log('Token stored to', TOKEN_PATH);
					});
					callback(oAuth2Client);
				});
			});
		}
		
		function listFiles(auth) {
			
			google.drive({version: 'v3', auth});
			return this.drive;
			/*this.drive.files.list({
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
			});*/
		}
		
		function uploadPdf(auth) {
			const drive = google.drive({version: 'v3', auth});
			
			const fileMetadata = {
				'name': 'mypdf.pdf',
				parents: ['1jlag_Kq8VCH-MkD10whsaxacOxUPOECp']
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
					// Handle error
					console.error('error uploding', err);
				} else {
					console.log('File Id: ', file.id);
				}
			});
		}
	}
};
