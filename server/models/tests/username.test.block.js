// TO DO -- remove _id when session data implemented

let User = require('../user.model');

module.exports = function(should) {

	return function() {
		before(function(done) {
			User.remove({}).exec();
			User.create({ username: 'jonathan', password: 'password'}, function() {
				done();
			});
		});
		
		it('Valid user created', function(done) {
			User.create({ username: 'benjamin', password: 'password', _id: '12345' }, function(err, user) {
				should.equal(err, null);
				user.should.be.a('Object');
				user.username.should.equal('benjamin');
				user.password.should.equal('password');
				done();
			});
		});

		it('Invalid input -- no username', function(done) {
			User.create({ username: undefined, password: 'password', _id: '12345'}, function(err, user) {
				err.errors.username.name.should.equal('ValidatorError');
				err.errors.username.message.should.equal('Path `username` is required.');
				done();
			});
		});

		it('Invalid input -- non-alphanumeric username', function(done) {
			User.create({ username: 'ben^&*()%$#', password: 'password', _id: '12345'}, function(err, user) {
				err.errors.username.name.should.equal('ValidatorError');
				err.errors.username.message.should.equal('"value" must only contain alpha-numeric characters');
				done();
			});
		});

		it('Invalid input -- non-string username', function(done) {
			User.create({ username: {}, password: 'password', _id: '12345'}, function(err, user) {
				err.errors.username.name.should.equal('CastError');
				err.errors.username.message.should.equal('Cast to String failed for value "{}" at path "username"');
				done();
			});
		});

		it('Invalid username -- not unique', function(done) {
			User.create({ username: 'jonathan', password: 'password', _id: '12345'}, function(err, user) {
				err.name.should.equal('MongoError');
				err.code.should.equal(11000);
				done();
			});
		});

		after(function(done) {
			User.remove({}, done);	
		});
	};
};


