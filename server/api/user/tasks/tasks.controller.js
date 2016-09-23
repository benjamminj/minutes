let Controller = {};
let User = require(__baseURL + 'models/user.model');

let Joi = require('joi');
let joiValidate = require(__baseURL + 'utils/joi.validate.promise');
let createError = require(__baseURL + 'utils/error.constructor');

Controller.getAllTasks = function(req, res, next) {
	// ID will be eventually be passed as session data and be queried instead of in endpoint
	User.findById(req.params.id)
		.exec()
		.then(function(user) {
			// TODO -- refactor into a function
			if (!user) { 
				throw createError('NotFound', 'This user id was not found in the database', 404);
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
				throw createError('NotFound', 'This user id was not found in the database', 404);
			} else {
				return user;
			}
		})
		.then(function(user) {
			let taskToRemove = user.tasks.id(req.params.taskID);

			if (!taskToRemove) {
				throw createError('NotFound', 'This task was not found in the database', 404);
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
	User.findById(req.params.id)
		.then(function(user) {
			if (!user) {
				throw createError('NotFound', 'This user id was not found in the database', 404);
			} else {
				user.tasks.push(req.body);
				return user.save();				
			}
		})
		.then(function(editedUser) {
				res.status(201).json(editedUser.tasks);
		})
		.catch(function(err) {
			next(err);
		});
};

Controller.editTask = function(req, res, next) {
	let keyToChange = Object.keys(req.body)[0];

	return User.findById(req.params.id)
		.then(function(user) {
			let taskID = req.params.taskID;
			if (!user) {
				throw createError('NotFound', 'This user id was not found in the database', 404);
			} else if (!user.tasks.id(taskID)) {
				throw createError('NotFound', 'This task id was not found in the database', 404);
			} else if (!user.tasks.id(taskID)[keyToChange]) {
				throw createError('InvalidInput', `"${keyToChange}" must be either "title" or "description"`, 400);
			} else {
				user.tasks.id(taskID)[keyToChange] = req.body[keyToChange];
				return user.save();
			}
		})
		.then(function(editedUser) {
			res.status(200).json(editedUser.tasks.id(req.params.taskID));
		})
		.catch(function(err) {
			next(err);
		});
};

module.exports = Controller;
