let express = require('express');

module.exports = function(app) {

	app.use('/dashboard', express.static('public/dashboard'));
	app.use('/api', require('../api/user/tasks/tasks.router'));
	app.use('/login', require('../api/login/login.router'));
};
