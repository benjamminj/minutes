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

		it('correct password should return true', function(done) {
			checkValidation('1', 'password')	
				.then(function(isValid) {
					isValid.should.equal(true);
					done();
				})
		});

		it('incorrect password should return false', function(done) {
			checkValidation('1', 'somethingWrong')
				.catch(function(err) {
					err.name.should.equal('Unauthorized');
					err.message.should.equal('The password was incorrect');
					done();
				})
		});
	};
};