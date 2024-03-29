const path = require('path'),
	sheetsHandle = require('./sheetsHandle'),
	pdfGenerate = require('./pdfGenerate');

const fs = require('fs-extra');

module.exports = {
	rout: (app) => {
		app.get('/', (req, res) => {
			console.log('home');
			// res.sendFile(path.join(process.cwd() + '/charts6/src/index.html'));
			res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/index.html'));
			// res.sendFile(path.join(process.cwd() + '/client/index.html'));
		});
		
		app.get('/login', (req, res) => {
			// console.log('login');
			// res.sendFile(path.join(process.cwd() + '/charts6/src/index.html'));
			res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/index.html'));
			// res.sendFile(path.join(process.cwd() + '/client/index.html'));
		});
		
		app.get('/form', (req, res) => {
			// console.log('form');
			// res.sendFile(path.join(process.cwd() + '/charts6/src/index.html'));
			res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/index.html'));
			// res.sendFile(path.join(process.cwd() + '/client/index.html'));
		});
		
		app.post('/get-user-sheets', (req, res) => {
			sheetsHandle.getSheets(req, res);
		});
		
		app.get('/force-restart', (req, res) => {
			// res.redirect('http://localhost:4200/login');
			res.redirect('https://www.active8.co.il/APP');
			
			fs.writeFile('server/assets/forceUpdate.json', JSON.stringify({updateMe: Math.random()}), (err) => {
				if (err) return console.error(err);
				console.log('update request for google sheets users');
			});
			
			// res.sendFile(path.join(process.cwd() + '/client/js/' + req.params.filename));
		});
		
		app.post('/sendForm', (req, res) => {
			pdfGenerate.init(req, res);
		});
		
		app.get('/regenerateLastPdf', (req, res) => {
			pdfGenerate.regeneratePdf(req, res);
		});
		
		app.get('/js/:filename', (req, res) => {
			res.sendFile(path.join(process.cwd() + '/client/js/' + req.params.filename));
		});
		
		app.get('/css/:filename', (req, res) => {
			res.sendFile(path.join(process.cwd() + '/client/css/' + req.params.filename));
		});
		
		app.get('/manifest.json', (req, res) => {
			// console.log('manifest');
			res.sendFile(path.join(process.cwd() + '/server/assets/manifest.json'));
		});
		
		app.get('/latestpdf', (req, res) => {
			// console.log('manifest');
			res.sendFile(path.join(process.cwd() + '/server/assets/testMeText.html'));
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
		
		app.get('/assets/:fileName', (req, res) => {
			// console.log(req.params.fileName);
			if (req.params.fileName !== 'undefined') {
				res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/assets/' + req.params.fileName));
			} else {
				res.sendStatus(404);
			}
		});
		
		app.get('/assets/footPrint/:fileName', (req, res) => {
			// console.log('assets favicon: ',req.params.fileName);
			if (req.params.fileName !== 'undefined') {
				res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/assets/footPrint/' + req.params.fileName));
			} else {
				res.sendStatus(404);
			}
		});
		
		app.get('/assets/external-helpers/:fileName', (req, res) => {
			// console.log('assets favicon: ',req.params.fileName);
			if (req.params.fileName !== 'undefined') {
				res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/assets/external-helpers/' + req.params.fileName));
			} else {
				res.sendStatus(404);
			}
		});
		
		app.get('/assets/favicons/:fileName', (req, res) => {
			// console.log('assets favicon: ',req.params.fileName);
			if (req.params.fileName !== 'undefined') {
				res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/assets/favicons/' + req.params.fileName));
			} else {
				res.sendStatus(404);
			}
		});
		
		app.get('/:fileName', (req, res) => {
			// console.log('file name: ',req.params);
			if (req.params.fileName !== 'undefined') {
				res.sendFile(path.join(process.cwd() + '/charts6/dist/charts6/' + req.params.fileName));
			} else {
				res.sendStatus(404);
			}
		});
	}
};
