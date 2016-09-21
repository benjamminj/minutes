let Controller = {};
let User = require('../../../models/user.model');

let Joi = require('joi');
let validate = require('../../../utils/joi.validate.promise');
let createError = require('../../../utils/error.constructor');


Controller.getAllTasks = function(req, res, next) {
	// ID will be eventually be passed as session data and be queried instead of in endpoint
	User.findById(req.params.id)
		.exec()
		.then(function(user) {
			if (!user) {
				let error = createError('NotFound', 'This user id was not found in the database', 404);
				throw error;
			} else {
				res.status(200).json(user.tasks);
			}
		})
		.catch(function(err) {
			next(err);
		});
};

Controller.deleteTask = function(req, res, next) {
	// ID will eventually be passed as session data instead of endpoint
	User.findById(req.params.id)
		.exec()
		.then(function(user) {
			if (!user) {
				let error = createError('NotFound', 'This user id was not found in the database', 404);
				throw error;
			} else {
				return user;
			}
		})
		.then(function(user) {
			let taskToRemove = user.tasks.id(req.params.taskID);

			if (!taskToRemove) {
				let error = createError('NotFound', 'This task was not found in the database', 404);
				throw error;
			} else {
				taskToRemove.remove();			
				return user.save();	
			}
		})
		.then(function(editedUser) {
			res.status(200).json(editedUser);
		})
		.catch(function(err) {
			next(err);
		});
};

Controller.createTask = function(req, res, next) {	
	let validInputSchema = {
		_id: Joi.string(),
		title: Joi.string().required().default('My Task'),
		date: Joi.date().format('MM/DD/YYYY').default('now')
	};

	// Then need to findByIdAndUpdate the User document
};

module.exports = Controller;
