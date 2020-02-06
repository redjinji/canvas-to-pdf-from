const express = require('express'),
	bodyParser = require('body-parser'),
	process = require('process'),
	rout = require('./rout');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();

console.log('process', process.cwd());
console.log('dir', __dirname);
console.log('env variable SHEET_CREDENTIALS: ', process.env.SHEET_CREDENTIALS);
try{
	console.log('env variable SHEET_CREDENTIALS: ', JSON.parse(process.env.SHEET_CREDENTIALS));
} catch (e) {

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

rout.rout(app);
let port = process.env.PORT;
if (port === null || port === '' || port === undefined) {
    port = 3000;
}
app.listen(port, () => console.log(`canvas listening on port ${port}!`));
