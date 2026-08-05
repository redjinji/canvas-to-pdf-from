// Mints the GMAIL_TOKEN / SHEET_TOKEN / DRIVE_TOKEN values for a given Google
// OAuth client, using the same scopes the app requests in server/google_api.js.
//
// Usage:
//   MAIN_CREDENTIALS="$(cat client.json)" node server/tools/get-google-token.js gmail
//   MAIN_CREDENTIALS="$(cat client.json)" node server/tools/get-google-token.js sheets
//   MAIN_CREDENTIALS="$(cat client.json)" node server/tools/get-google-token.js drive
//
// For each run: open the printed URL in a browser, approve, and the browser will
// be redirected to http://localhost/?code=XXXX (the page itself fails to load —
// that's fine). Copy the value of the `code` query parameter from the address
// bar and paste it here. The script prints the token JSON to set as the
// corresponding <SERVICE>_TOKEN config var.
const readline = require('node:readline');
const { google } = require('googleapis');

const SCOPES = {
	gmail: 'https://mail.google.com/',
	sheets: 'https://www.googleapis.com/auth/spreadsheets',
	drive: 'https://www.googleapis.com/auth/drive',
};
const TOKEN_VAR = { gmail: 'GMAIL_TOKEN', sheets: 'SHEET_TOKEN', drive: 'DRIVE_TOKEN' };

const service = process.argv[2];
if (!SCOPES[service]) {
	console.error('Usage: node server/tools/get-google-token.js <gmail|sheets|drive>');
	process.exit(1);
}
if (!process.env.MAIN_CREDENTIALS) {
	console.error('Set MAIN_CREDENTIALS to the OAuth client JSON first, e.g.\n' +
		'  MAIN_CREDENTIALS="$(cat client.json)" node server/tools/get-google-token.js ' + service);
	process.exit(1);
}

const { client_id, client_secret, redirect_uris } = JSON.parse(process.env.MAIN_CREDENTIALS).installed;
// Newer "Desktop app" client JSONs omit redirect_uris entirely; http://localhost
// is what Google expects for desktop clients since the OOB flow was retired.
const redirectUri = (redirect_uris && redirect_uris.find(u => u.startsWith('http'))) || 'http://localhost';
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirectUri);

const authUrl = oAuth2Client.generateAuthUrl({
	access_type: 'offline',
	prompt: 'consent', // force a refresh_token even if previously granted
	scope: SCOPES[service],
});

console.log('\n1. Open this URL and approve access:\n\n' + authUrl + '\n');
console.log('2. The browser will land on an unreachable http://localhost/?code=... page.');
console.log('   Copy the `code` value from the address bar (everything between code= and &).\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Paste the code here: ', (code) => {
	rl.close();
	oAuth2Client.getToken(decodeURIComponent(code.trim()), (err, token) => {
		if (err) {
			console.error('\nToken exchange failed:', err.message);
			process.exit(1);
		}
		if (!token.refresh_token) {
			console.warn('\nWARNING: no refresh_token in the response — the token will stop working when the access token expires.');
		}
		console.log(`\nSet this as ${TOKEN_VAR[service]}:\n`);
		console.log(JSON.stringify(token));
	});
});
