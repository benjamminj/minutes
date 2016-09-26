let hashPassword = require(__baseURL + 'utils/encrypt');
let bcrypt = require('bcrypt');


module.exports = function(should, User) {

	function checkValidation(id, password) {
		return User.findById(id)
			.exec()
			.then(function(user) {
				return user.validatePassword(password);
			});
	}

	return function() {
		before(function(done) {
			User.remove({})
				.exec();

			hashPassword('password')
				.then(function(hash) {
					return User.create({ _id: '1', username: 'benjamin', password: hash}, function() {
						done();
					});
				});
		});

		it('Valid password -- returns true', function(done) {
			checkValidation('1', 'password')	
				.then(function(validUser) {
					validUser.username.should.equal('benjamin');
					done();
				});
		});

		it('Invalid password throw error -- wrong password', function(done) {
			checkValidation('1', 'somethingWrong')
				.then(function(validUser) {
					should.equal(validUser, null);
					done();
				});
		});

		it('Invalid password throw error -- non-String password', function(done) {
			checkValidation('1', {})
				.catch(function(err) {
					err.name.should.equal('ValidationError');
					err.message.should.equal('data and hash must be strings');
					err.status.should.equal(400);
					done();
				});
		});

		it('Invalid password: throw error -- no password', function(done) {
			checkValidation('1', undefined)
				.catch(function(err) {
					err.name.should.equal('ValidationError');
					err.message.should.equal('data and hash arguments required');
					err.status.should.equal(400);
					done();
				});
		});
	};
};