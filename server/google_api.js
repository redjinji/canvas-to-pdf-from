const fs = require('fs-extra'),
    readline = require('readline'),
    {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_PATH_DRIVE = '';
var CREDENTIAL_PATH_DRIVE = '';
var TOKEN_PATH_SHEETS = '';
var CREDENTIAL_PATH_SHEETS = '';
if (process.env.PORT) {
    TOKEN_PATH_DRIVE = process.cwd() + '/server/assets/google/prodDriveToken.json';
    TOKEN_PATH_SHEETS = process.cwd() + '/server/assets/google/prodSheetsToken.json';
    CREDENTIAL_PATH_DRIVE = process.cwd() + '/server/assets/google/prodDriveCredentials.json';
	CREDENTIAL_PATH_SHEETS = process.cwd() + '/server/assets/google/ProdSheetsCredentials.json';
} else {
    TOKEN_PATH_DRIVE = process.cwd() + '/server/assets/google/stgDriveToken.json';
    TOKEN_PATH_SHEETS = process.cwd() + '/server/assets/google/stgSheetsToken.json';
	CREDENTIAL_PATH_DRIVE = process.cwd() + '/server/assets/google/stgDriveCredentials.json';
	CREDENTIAL_PATH_SHEETS = process.cwd() + '/server/assets/google/stgSheetsCredentials.json';
}

module.exports = {
    sendToDrive: function (formFields) {
        // let date = new Date();
        // fs.rename(process.cwd() + '/server/pdfs/mypdf.pdf', process.cwd() + `/server/pdfs/${formFields.filedAgent}.pdf`, function(err) {
        // 	if ( err ) console.log('ERROR: ' + err);
        // });

        fs.readFile(CREDENTIAL_PATH_DRIVE, function (err, content) {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            // authorize(JSON.parse(content),()=>{});
            this.credentials = content;
            authorize(JSON.parse(content), uploadPdf, formFields);
        });

        function authorize(credentials, callback, formFields) {
            const {client_secret, client_id, redirect_uris} = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH_DRIVE, function (err, token) {
                if (err) return getAccessToken(oAuth2Client, callback);
                oAuth2Client.setCredentials(JSON.parse(token));
                callback(oAuth2Client, formFields);
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
                    fs.writeFile(TOKEN_PATH_DRIVE, JSON.stringify(token), function (err) {
                        if (err) return console.error(err);
                        console.log('Token stored to', TOKEN_PATH_DRIVE);
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

        function uploadPdf(auth, formFields) {
            const drive = google.drive({version: 'v3', auth});

            const fileMetadata = {
                'name': `${formFields.fieldAgent} - ${formFields.name}`,
                parents: ['1W3sXBWrWIwRKwjH-hcVZCyJDZVGBKwCU']
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
    },
    getUserSheets: new Promise(function (resolve, reject) {

// If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

// Load client secrets from a local file.
		console.log(CREDENTIAL_PATH_DRIVE);
        fs.readFile(CREDENTIAL_PATH_SHEETS, (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
			// Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), listMajors);
        });

        /**
         * Create an OAuth2 client with the given credentials, and then execute the
         * given callback function.
         * @param {Object} credentials The authorization client credentials.
         * @param {function} callback The callback to call with the authorized client.
         */
        function authorize(credentials, callback) {
            const {client_secret, client_id, redirect_uris} = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH_SHEETS, (err, token) => {
                if (err) return getNewToken(oAuth2Client, callback);
                oAuth2Client.setCredentials(JSON.parse(token));
                callback(oAuth2Client);
            });
        }

        /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
         * @param {getEventsCallback} callback The callback for the authorized client.
         */
        function getNewToken(oAuth2Client, callback) {
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
                    if (err) return console.error('Error while trying to retrieve access token', err);
                    oAuth2Client.setCredentials(token);
                    // Store the token to disk for later program executions
                    fs.writeFile(TOKEN_PATH_SHEETS, JSON.stringify(token), (err) => {
                        if (err) return console.error(err);
                        console.log('Token stored to', TOKEN_PATH_SHEETS);
                    });
                    callback(oAuth2Client);
                });
            });
        }

        /**
         * Prints the names and majors of students in a sample spreadsheet:
         * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
         * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
         */
        function listMajors(auth) {
            const sheets = google.sheets({version: 'v4', auth});
            sheets.spreadsheets.values.get({
                spreadsheetId: '1FSERWuYpuGe3c8i0EGaVyOd_lXhfluGCEQUkrX7H_pI',
                range: 'A:B',
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    resolve(rows);
                } else {
                    // console.log('No data found.');
                }
            });
        }
    })
};
