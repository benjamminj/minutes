require('../config/env.js')(process.env);
console.log(process.env.DATABASE_URL);

let chai = require('chai');

let should = chai.should();
let User = require('./user.model');

let mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

beforeEach(function(done) {
	User.remove({}).exec();
	done();
});

describe('User Schema', function() {

	describe('User.create()', function() {
		it('Valid user created', function(done) {
			let goodUser = {
				username: 'benjamin',
				password: 'password'
			};

			User.create(goodUser, function(err, User) {
				should.equal(err, null);
				User.should.be.a('Object');
				User.username.should.equal('benjamin');
				User.password.should.equal('password');
				done();
			});
		});

		it('Invalid input -- no username', function(done) {
			User.create({ username: undefined, password: 'password'}, function(err, user) {
				err.name.should.equal('ValidationError');
				err.message.should.equal('User validation failed');
				done();
			});
		});

		it('Invalid input -- ')


	});
});










