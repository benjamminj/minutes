let Task = require('./task.model');
let createError = require('../../utils/create.error');
let bcrypt = require('bcrypt');
let validateLogin = require('../../utils/validate.login');

let Controller = {};

Controller.getAllTasks = function(req, res, next) {
	Task.find({ _owner: req.user.id })
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
				throw createError('NotFound', 'This task does not exist in the database!', 404);
			} else {
				res.status(200).end();
			}
		}).catch(function(err) {
			next(err);
		});
};

Controller.createTask = function(req, res, next) {		
		Task.create({
			_owner: req.user.id,
			title: req.body.title,
			time: req.body.time,
			description: req.body.description
		}).then(function(task) {
			res.status(201).json(task);
		}).catch(function(err) {
			next(err);
		});
};

Controller.editTask = function(req, res, next) {
	validateLogin(req)
		.then(function() {
			let edits = {};

			if (req.body.title) {
				edits.title = req.body.title;
			}

			if (req.body.description) {
				edits.description = req.body.description;
			}

			return Task.findByIdAndUpdate(req.params.taskID, edits, { runValidators: true, new: true });
		}).then(function(task) {
			if (!task) {
				throw createError('NotFound', 'This task does not exist in the database!', 404);
			} else {
				res.status(200).json(task);
			}
		}).catch(function(err) {
			next(err);
		});
};

module.exports = Controller;
