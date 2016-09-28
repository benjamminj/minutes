let Controller = {};
let User = require(__baseURL + 'models/user.model');
let Task = require(__baseURL + 'models/task.model');

let Joi = require('joi');
let createError = require(__baseURL + 'utils/error.constructor');
let bcrypt = require('bcrypt');

Controller.getAllTasks = function(req, res, next) {
	// Add redirect for if there is no session started?
	// if (!req.user) --> redirect to login page?


	Task.find({ _owner: req.user.id })
		.exec()
		.then(function(tasks) {
			// TODO -- refactor into a function
			if (!tasks) {
				throw createError('NotFound', 'This tasks id was not found in the database', 404);
			} else {
				res.status(200).json(tasks);
			}
		})
		.catch(function(err) {
			// console.log(err);
			next(err);
		});
};

Controller.deleteTask = function(req, res, next) {
	// ID will eventually be passed as session data instead of endpoint
	User.findById(req.user.id)
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
			console.log(err);
			next(err);
		});
};

Controller.createTask = function(req, res, next) {	
	console.log(req.body, req.user);

	Task.create({ title: req.body.title, time: 4000, _owner: req.user.id }, function(err, task) {
		if (err) {
			next(err);
		} else {
			res.status(201).json(task);
		}
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

Controller.register = function(req, res, next) {
	bcrypt.hash(req.body.password, 5, function(err, hash) {
		if (err) {
			next(err);
		} else {
			User.create({ username: req.body.username, password: hash}, function(err) {
				if (err) {
					next(err);
				} else {
					res.status(201).end();
				}
			});
		}		
	});	
};

module.exports = Controller;
