let mongoose = require('mongoose');
let Joi = require('joi');
let createError = require(__baseURL + 'utils/error.constructor');

let taskSchema = new mongoose.Schema({
	_owner: {
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

