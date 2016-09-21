let User = require('../../../models/user.model');

let Controller = {};

Controller.getAllTasks = function(req, res, next) {
	// Id will be eventually be passed as session data

	User.findById(req.params.id)
		.then(function(user) {
			if(!user) {
				throw new Error('No users with this id in database');
			}
		})
		.then(function(user) {
			console.log(user);
			res.sendStatus(200);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(404);
		});
}; 

module.exports = Controller;
