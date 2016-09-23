let bcrypt = require('bcrypt');
let createError = require('./error.constructor');

module.exports = function(string) {
	let promise = new Promise(function(resolve, reject) {
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

	return promise;
};