const path = require('path'),
	sheetsHandle = require('./sheetsHandle'),
	pdfGenerate = require('./pdfGenerate');

const fs = require('fs-extra');

module.exports = {
	rout: (app) => {
		app.get('/', (req, res) => {
			console.log('home');
			res.sendFile(path.join(process.cwd() + '/client/index.html'));
		});
		
		app.post('/get-user-sheets', (req, res) => {
			sheetsHandle.getSheets(req, res);
		});
		
		app.get('/force-restart', (req, res) => {
			res.redirect('http://localhost:4200/login');
			
			fs.writeFile('server/assets/forceUpdate.json', JSON.stringify({updateMe:Math.random()}), (err) => {
				if (err) return console.error(err);
				console.log('update file');
			});
			
			// res.sendFile(path.join(process.cwd() + '/client/js/' + req.params.filename));
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
		
		app.get('/:fileName', (req, res) => {
			res.sendFile(path.join(process.cwd() + '/client/dist/' +req.params.fileName));
		});
	}
};
