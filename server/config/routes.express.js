let express = require('express');
let path = require('path');

module.exports = function(app) {

	app.use('/dashboard', express.static('public/dashboard'));

	app.use('/tasks', require('../api/tasks/tasks.router'));
	app.use('/user', require('../api/user/user.router'));

	app.get('/*', function(req, res, next) {
		res.sendFile(path.join(__dirname, '../../public/login/index.html'));
	});
};
