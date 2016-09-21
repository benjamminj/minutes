module.exports = function(app) {

	app.use('/home', require('../api/user/tasks/tasks.router'));
	
};
