require('../../config/env.js')(process.env);
console.log(process.env.DATABASE_URL);

let chai = require('chai');

let should = chai.should();
let User = require('../user.model');

let mongoose = require('mongoose');

before(function(done) {
	let db = mongoose.createConnection(process.env.DATABASE_URL);
	db.once('open', function() {
		User.remove({}, done);
	});
});

describe('User Schema', function() {

	describe('Username validation', require('./username.test.block')(should));
	describe('Password validation', require('./password.test.block')(should));
	describe('Task validation', require('./tasks/_task.test.block')(should));
});









