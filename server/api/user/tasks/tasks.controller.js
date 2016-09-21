let User = require('../../../models/user.model');
let createError = require('../../../utils/error.constructor');

let Controller = {};

Controller.getAllTasks = function(req, res, next) {
	// Id will be eventually be passed as session data
	console.log(req.params.username);
	User.findOne({username: req.params.username})
		.exec()
		.then(function(user) {
			if (!user) {
				let error = createError('NotFound', 'This user was not found in the database', 404);
				throw error;
			}
		})
		.then(function(user) {
			res.status(200).json(user);
		})
		.catch(function(err) {
			res.status(err.status).json({name: err.name, message: err.message});
		});
}; 

module.exports = Controller;
