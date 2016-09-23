let Controller = {};
let User = require('../../../models/user.model');

let Joi = require('joi');
let joiValidate = require('../../../utils/joi.validate.promise');
let createError = require('../../../utils/error.constructor');


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
	const validInputSchema = {
		_id: Joi.string(),
		title: Joi.string().default('My Task on ' + new Date(Date.now())),
		date: Joi.date().max('now').required(),
		time: Joi.number().required().positive(),
		description: Joi.string()
	};

	joiValidate(req.body, validInputSchema)
		.then(function(task) {
			return User.findByIdAndUpdate(req.params.id, { $push: { tasks: task } }, { new: true, runValidators: true });
		})
		.then(function(user) {
			// TODO -- refactor into a function
			if (!user) {
				throw createError('NotFound', 'This user id was not found in the database', 404);
			} else {
				res.status(201).json(user.tasks);
			}
		})
		.catch(function(err) {
			next(err);
		});
};

Controller.editTask = function(req, res, next) {
	// write some sort of validation for editable properties
	const editableItemsSchema = {
		key: Joi.string().required().valid('title', 'description'),
		value: Joi.string().required(),
	};

	joiValidate(req.body, editableItemsSchema)
		.then(function(edits) {
			return User.findById(req.params.id);
		})
		.then(function(user) {
			let taskID = req.params.taskID;
			if (!user) {
				throw createError('NotFound', 'This user id was not found in the database', 404);
			} else if (!user.tasks.id(taskID)) {
				throw createError('NotFound', 'This task id was not found in the database', 404);
			} else {
				user.tasks.id(taskID)[req.body.key] = req.body.value;

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
