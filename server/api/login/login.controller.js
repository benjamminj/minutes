let Controller = {};

Controller.me = function(req, res, next) {
	console.log('At controller.me', req.user);
	res.status(200).json(req.user);
};

Controller.unauthorized = function(req, res, next) {
	res.status(401).json({ message: 'Wrong username or password' });
};

module.exports = Controller;