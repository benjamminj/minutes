module.exports = function(should, User) {

	return function() {
		beforeEach(function(done) {
			User.remove({}, done);
		});

		it('Valid password -- user created', function(done) {
			User.create({ username: 'benjamin', password: 'password', _id: '12345' }, function(err, user) {
				should.equal(err, null);
				user.password.should.equal('password');
				done();
			});
		});

		it('Invalid password -- non-string', function(done) {
			User.create({ username: 'benjamin', password: {}, _id: '12345' }, function(err, user) {
				err.errors.password.name.should.equal('CastError');
				err.errors.password.message.should.equal('Cast to String failed for value "{}" at path "password"');
				done();
			});
		});
		
		it('Invalid password -- no password', function(done) {
			User.create({ username: 'benjamin', password: undefined, _id: '12345' }, function(err, user) {
				err.errors.password.name.should.equal('ValidatorError');
				err.errors.password.message.should.equal('Path `password` is required.');
				done();
			});
		});
	}; 
};



