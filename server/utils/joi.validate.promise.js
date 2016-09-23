let Joi = require('joi');

module.exports = function(value, schema) {
	return new Promise(function(resolve, reject) {
		Joi.validate(value, schema, function(err, value) {
			if (err) {
				reject(err);
			} else {
				resolve(value);
			}
		});
	});
};