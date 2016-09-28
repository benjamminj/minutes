let bcrypt = require('bcrypt');
let createError = require('./create.error');

module.exports = function(string) {
	
	return new Promise(function(resolve, reject) {
		let saltRounds = 10;

		bcrypt.hash(string, saltRounds, function(err, hash) {
			if (err) {
				let error = createError('EncryptionError', err.message, 500);
				reject(error);
			} else {
				resolve(hash);
			}
		});
	});
};