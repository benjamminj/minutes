let mongoose = require('mongoose');
let createError = require('../../utils/create.error');
let bcrypt= require('bcrypt');

let UserSchema = new mongoose.Schema({
	
	username: {
		type: String,
		required: true,
		unique: true,
		// TO DO -- write validation function to make sure that username doesn't contain certain characters

		// validate: function(value, respond) {
		// 	let schema = Joi.string().alphanum();

		// 	// TO DO -- refactor so that I don't have to rely on Joi
		// 	// using Regex
		// 	Joi.validate(value, schema, function(err, value) {
		// 		if (err) {
		// 			respond(false, err.details[0].message);
		// 		} else {
		// 			respond(true);
		// 		}
		// 	});
		// },
	},
	password: {
		type: String,
		required: true,
	}
});

UserSchema.methods.validatePassword = function(password) {
	let correctPassword = this.password;
	let user = this;
	
	return new Promise(function(resolve, reject) {
		bcrypt.compare(password, correctPassword, function(err, isValid) {
			if (err) {
				reject(createError('ValidationError', err.message, 400));
			} else if (isValid) {
				resolve(user);
			} else {
				resolve(null);
			}
		});
	});

	// TO DO -- see if I can return the promise directly
	// return promise;
};

module.exports = mongoose.model('User', UserSchema);



