const path = require('path'),
	pdfGenerate = require('./pdfGenerate');

module.exports = {
	rout: (app) => {
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
		
		app.post('/create_pdf', (req, res) => {
			pdfGenerate.init(req, res);
		});
	}
};
