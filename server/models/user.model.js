let mongoose = require('mongoose');
let Joi = require('joi');
let createError = require(__baseURL + 'utils/error.constructor');
let bcrypt= require('bcrypt');

let taskSchema = new mongoose.Schema({
	_id: {
		type: String,
		// unique: true,
		default: new mongoose.Types.ObjectId(),
	},
	title: {
		type: String,
		required: true,
		default: 'My Task on ' + new Date(Date.now()),
	},
	date: {
		type: Date,
		required: true,
		default: new Date(Date.now()),
		validate: function(value, respond) {
			let schema = Joi.date().max('now');

			Joi.validate(value, schema, function(err, value) {
				if(err) {
					respond(false, err.details[0].message);
				} else {
					respond(true);
				}
			});
		}
	},
	time: {
		type: Number,
		required: true,
		min: 0,
	},
	description: {
		type: String,
		required: false,
	}
});

let UserSchema = new mongoose.Schema({
	
	_id: {
		// TO DO -- Remove when sessions are set up
		type: String,
		default: new mongoose.Types.ObjectId(),
	},
	username: {
		type: String,
		required: true,
		unique: true,
		validate: function(value, respond) {
			let schema = Joi.string().alphanum();

			Joi.validate(value, schema, function(err, value) {
				if (err) {
					respond(false, err.details[0].message);
				} else {
					respond(true);
				}
			});
		},
	},
	password: {
		type: String,
		required: true,
	},
	tasks: [taskSchema],
});

UserSchema.methods.validatePassword = function(password) {
	let correctPassword = this.password;
	
	let promise = new Promise(function(resolve, reject) {
		bcrypt.compare(password, correctPassword, function(err, isValid) {
			if (err) {
				let error = createError('ValidationError', err.message, 400);
				reject(error);
			}

			if (isValid) {
				resolve(true);
			} else {
				let error = createError('Unauthorized', 'The password was incorrect', 401);
				reject(error);
			}
		});
	});

	return promise;
};

let User = mongoose.model('User', UserSchema);

module.exports = User;

