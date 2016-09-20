require('../config/env.js')(process.env);
console.log(process.env.DATABASE_URL);

let chai = require('chai');

let should = chai.should();
let User = require('./user.model');

let mongoose = require('mongoose');

before(function(done) {
	let db = mongoose.createConnection(process.env.DATABASE_URL);
	db.once('open', function() {
		User.remove({}).exec();
		User.create({ username: 'jonathan', password: 'password'}, function() {
			console.log('Created George');
			done();
		});
	});
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
				let usernameError = err.errors.username;

				usernameError.name.should.equal('ValidatorError');
				usernameError.message.should.equal('Path `username` is required.');
				done();
			});
		});

		it('Invalid input -- non-alphanumeric username', function(done) {
			User.create({ username: 'ben^&*()%$#', password: 'password'}, function(err, user) {
				let usernameError = err.errors.username;

				usernameError.name.should.equal('ValidatorError');
				usernameError.message.should.equal('"value" must only contain alpha-numeric characters');
				done();
			});
		});

		it('Invalid input -- non-string username', function(done) {
			User.create({ username: {}, password: 'password' }, function(err, user) {
				let usernameError = err.errors.username;
				usernameError.name.should.equal('CastError');
				usernameError.message.should.equal('Cast to String failed for value "{}" at path "username"');
				done();
			});
		});

		it('Invalid username -- not unique', function(done) {
			User.create({ username: 'jonathan', password: 'password' }, function(err, user) {
				err.name.should.equal('MongoError');
				err.code.should.equal(11000);
				err.message.should.equal('E11000 duplicate key error collection: time-tracker-testing.users index: username_1 dup key: { : "jonathan" }');
				done();
			});
		});
	});

});









