let User = require('../../user.model');
let hashPassword = require('../../../../utils/encrypt');

module.exports = function() {
	before(function(done) {
		hashPassword('password')
			.then(function(hashedPassword) {
				return User.create({ username: 'benjamin', password: hashedPassword });
			}).then(function(user) {
				done();
			});
	});

	after(function(done) {
		User.remove({}, done);
	});
}