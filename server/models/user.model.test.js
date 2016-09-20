require('../config/env.js')(process.env);
console.log(process.env.DATABASE_URL);

let chai = require('chai');

let should = chai.should();
let User = require('./user.model');

let mongoose = require('mongoose');

beforeEach(function(done) {
	mongoose.connect(process.env.DATABASE_URL, function(err, connect) {
		if (err) {
			console.log(err);
		} else {
			console.log('Connected to MongoDB on ' + process.env.DATABASE_URL);
		}
	});
});

describe('User Schema', function() {


	describe('User.create()', function() {
		it('Valid object created', function(done) {
			let goodObject = {
				username: 'benjamin',
				password: 'password'
			};

			User.create(goodObject, function(err, obj) {
				should.equal(err, null);
				done();
			});

		});
	});
});