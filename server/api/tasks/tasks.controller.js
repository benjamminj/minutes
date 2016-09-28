let Task = require('./task.model');
let createError = require('../../utils/create.error');
let bcrypt = require('bcrypt');
let validateLogin = require('../../utils/validate.login');

let Controller = {};

Controller.getAllTasks = function(req, res, next) {
	validateLogin(req)
		.then(function() {
			return Task.find({ _owner: req.user.id }).exec();
		})
		.then(function(tasks) {
			res.status(200).json(tasks);
		})
		.catch(function(err) {
			next(err);
		});
};

Controller.deleteTask = function(req, res, next) {	
	Task.findByIdAndRemove(req.params.taskID)
		.then(function(task) {
			if (!task) {
				throw createError('Bad Request', 'This task does not exist in the database!', 400);
			} else {
				res.status(200).end();
			}
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});
};

Controller.createTask = function(req, res, next) {		
	validateLogin(req)
		.then(function() {			
			return Task.create({
				_owner: req.user.id,
				title: req.body.title,
				time: req.body.time,
				description: req.body.description
			});
		}).then(function(task) {
			if (!task) {
				throw createError('ValidationError', 'The task was not created', 500);
			} else {
				res.status(201).json(task);
			}
		}).catch(function(err) {
			next(err);
		});
};

Controller.editTask = function(req, res, next) {
	let edits = {};

	if (req.body.title) {
		edits.title = req.body.title;
	}

	if (req.body.description) {
		edits.description = req.body.description;
	}

	let options = { runValidators: true, new: true };

	Task.findByIdAndUpdate(req.params.taskID, edits, options)
		.then(function(task) {
			if (!task) {
				throw createError('ValidationError', 'The task does not exist in the database!', 400);
			} else {
				res.status(200).json(task);
			}
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});
};

module.exports = Controller;
