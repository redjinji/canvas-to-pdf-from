const express = require('express'),
	bodyParser = require('body-parser'),
	process = require('process'),
	rout = require('./rout');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();

console.log('process', process.cwd());
console.log('dir', __dirname);

rout.rout(app);

const port = 3000;

app.get('/some/:params', (req, res) => {
	app.use(bodyParser);
	console.log(req.params);
	res.send('Hello country!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
