let hashPassword = require('../../utils/encrypt');
let User = require('../user/user.model');

let Controller = {};

Controller.me = function(req, res, next) {
	res.status(200).json(req.user.username);
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
			res.sendStatus(201);
		})
		.catch(function(err) {
			next(err);
		});	
};

Controller.logout = function(req, res, next) {
	req.logout();
	res.redirect('/user/login');
};

module.exports = Controller;