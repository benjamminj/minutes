let mongoose = require('mongoose');
let createError = require('../../utils/create.error');

let taskSchema = new mongoose.Schema({
	_owner: {
		required: true,
		type: mongoose.Schema.ObjectId,
	},
	title: {
		type: String,
		required: true,
		default: 'My Task on ' + new Date(Date.now()),
	},
	date: {
		type: Date,
		default: Date.now(),
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

module.exports = mongoose.model('Task', taskSchema);

