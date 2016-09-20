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
					respond(true, value);
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
	},
	password: {
		type: String,
		required: true,
	},
	tasks: [taskSchema],
});

// UserSchema.methods.joiValidate = function(object) {
// 	let JoiSchema = {
// 		title: Joi.string().default('Task created at ' + Date.now, 'Default title').required(),
// 		date: Joi.date().default(Date.now, 'Date the task was saved'),
// 		time: Joi.number().required(),
// 		description: Joi.string()
// 	};

// 	return Joi.validate(object, JoiSchema);
// };

let User = mongoose.model('User', UserSchema);

module.exports = User;

