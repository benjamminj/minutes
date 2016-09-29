let createError = require('./create.error');

module.exports = function(req, res, next) {
	if (req.user) {
		next();
	} else {
		next(createError('Unauthorized', 'You are not logged in', 401));
	}
};