module.exports = function(should, User) {

	return function() {
		before(function(done) {
			User.remove({}).exec();
			User.create({ 
				_id: '1',
				username: 'benjamin', 
				password: 'password'
			}, function(err, user) {
				done();
			});
		});

		it('correct password should return true', function(done) {
			User.findById('1', function(err, user) {
				user.validatePassword('password')
					.then(function(bool) {
						bool.should.equal(true);
						done();
					});
			});
		});

		it('incorrect password should return false', function(done) {
			User.findById('1', function(err, user) {
				user.validatePassword('asdfasdf')
					.catch(function(bool) {
						bool.should.equal(false);
						done();
					});
			});
		});
	};
};