let hashPassword = require('../../utils/encrypt');
let User = require('../users/user.model');

let Controller = {};

// Do I need to include this step or do I jsut redirect straight to the dashboard???
Controller.me = function(req, res, next) {
	// console.log('At controller.me', req.user);
	res.status(200).end();
};

// Same -- can I redirect to login with a failure flash or something like that?
Controller.unauthorized = function(req, res, next) {
	// Or can I create an error and send that??
	// Is there a way that I can isolate the message from the passport strategy?
	// console.log(req.flash());
	res.status(401).json(req.flash(	));
};

Controller.signup = function(req, res, next) {
	console.log('Here');

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

module.exports = Controller;