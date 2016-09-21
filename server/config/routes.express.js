module.exports = function(app) {

	app.use('/:username/tasks', require('../api/user/tasks/tasks.router'));
	
};
