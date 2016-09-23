module.exports = function(app) {

	app.use('/api', require('../api/user/tasks/tasks.router'));
	app.use('/login', require('../api/login/login.router'));
};
