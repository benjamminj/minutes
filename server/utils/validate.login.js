let createError = require('./create.error');

module.exports = function(req) {
	
	return new Promise(function(resolve, reject) {	
		
		if (req.user === undefined) {
			let error = createError('Unauthorized', 'You are not logged in', 401);
			reject(error);
		} else {
			resolve();
		}
	});
};