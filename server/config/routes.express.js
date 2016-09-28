let express = require('express');

module.exports = function(app) {

	app.use('/dashboard', express.static('public/dashboard'));
	// app.use('/api', require('../api/user/tasks/tasks.router'));
	// app.use('/login', require('../api/login/login.router'));

	// ——————————————————————————————————————————————————————
	app.use('/tasks', require('../api/tasks/tasks.router'));
	app.use('/users', require('../api/users/users.router'));
};
