let User = require('../../../models/user.model');
let createError = require('../../../utils/error.constructor');

let Controller = {};

Controller.getAllTasks = function(req, res, next) {
	// ID will be eventually be passed as session data and be queried instead of username
	User.findOne({username: req.params.username})
		.exec()
		.then(function(user) {
			if (!user) {
				let error = createError('NotFound', 'This user was not found in the database', 404);
				throw error;
			} else {
				res.status(200).json(user.tasks);
			}
		})
		.catch(function(err) {
			next(err);
		});
}; 

module.exports = Controller;
