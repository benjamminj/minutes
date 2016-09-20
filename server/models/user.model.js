let mongoose = require('mongoose');
let Joi = require('joi');

let taskSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	date: {
		type: Date,
		required: true,
		validate: function(value, respond) {
			let schema = Joi.date().default(Date.now, 'Date that the task was saved');

			return Joi.validate(value, schema, function(err, value) {
				if (err) {
					respond(false, err);
				} else {
					respond(true);
				}
			});
		},
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
		// validation of password contents will happen before password reaches
		// schema. Password will be hashed before being persisted to db.

	},
	tasks: [taskSchema],
});

let User = mongoose.model('User', UserSchema);

module.exports = User;

