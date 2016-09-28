let hashPassword = require('../../utils/encrypt');
let User = require('../users/user.model');

let Controller = {};

// Do I need to include this step or do I jsut redirect straight to the dashboard???
Controller.me = function(req, res, next) {
	res.status(200).end();
};

Controller.unauthorized = function(req, res, next) {
	res.status(401).json({ name: 'Unauthorized', message: req.flash().error[0]});
};

Controller.signup = function(req, res, next) {
	hashPassword(req.body.password)
		.then(function(hashedPassword) {
			return User.create({ username: req.body.username, password: hashedPassword});
		})
		.then(function(user) {
			res.status(201).end();
		})
		.catch(function(err) {
			next(err);
		});	
};

Controller.logout = function(req, res, next) {
	req.logout();
	res.redirect('/users/login');
};
module.exports = Controller;