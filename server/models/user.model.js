let mongoose = require('mongoose');
let Joi = require('joi');

let taskSchema = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: new mongoose.Types.ObjectId(),
	},
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: Number,
		required: true,
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
		if (correctPassword === password) {
			resolve(true);
		} else {
			reject(false);
		}
	});

	return promise;
};

UserSchema.methods.hashPassword = function(password) {
	let promise = new Promise(function(resolve, reject) {
		let saltRounds = 10;

		bcrypt.hash(password, saltRounds, function(err, hash) {
			if (hash) {
				resolve(hash);
			} else {
				reject(err);
			}
		});
	});

	return promise;
};

let User = mongoose.model('User', UserSchema);

module.exports = User;

