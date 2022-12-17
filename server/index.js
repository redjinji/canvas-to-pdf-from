const express = require('express'),
	bodyParser = require('body-parser'),
	process = require('process'),
	rout = require('./rout'),
	port = process.env.PORT || 3000;

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();

// console.log('process', process.cwd());
// console.log('dir', __dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

rout.rout(app);
try {
	app.listen(port, () => console.log(`canvas listening on port ${port}!`));
} catch (e) {
	console.log('cant listen',e)
}