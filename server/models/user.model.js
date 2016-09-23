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
		// validation of password contents will happen before password reaches
		// schema. Password will be hashed before being persisted to db.

	},
	tasks: [taskSchema],
});

let User = mongoose.model('User', UserSchema);

module.exports = User;

