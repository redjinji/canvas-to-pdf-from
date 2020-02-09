const fs = require('fs-extra');
const formidable = require('formidable');
const googleApi = require('./google_api');

module.exports = {
	
	init: function () {
		// fs.readFile('server/assets/users.json', function (err, content) {
		// 	if (err) console.log('Error loading client secret file:', err);
		// 	// Authorize a client with credentials, then call the Google Drive API.
		// 	// authorize(JSON.parse(content),()=>{});
		// 	this.credentials = content;
		// 	this.getSheets();
		// }.bind(this));
	},
	
	getSheets: function (req, res) {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var userToAuth = fields;
			const users = googleApi.getUserSheets;
			users.then(function (usersData) {
				console.log(usersData);
				const user = usersData.filter(function (user) {
					return user[0] === userToAuth.userName && user[1] === userToAuth.password;
				}.bind(this));
				if (user.length > 0) {
					res.json({isAuthentic: true, mail: user[0][2] })
					// res.redirect('/form');
				} else {
					res.json({isAuthentic: false})
				}
				
			}).catch(err=>{
				res.json({user: 'error', error: err})
			});
		});
	}
};

