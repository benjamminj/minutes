let User = require('../user.model');

module.exports = function(should) {

	return function() {
		it('Valid password given for user creation', function(done) {
			User.create({ username: 'benjamin', password: 'password' }, function(err, user) {
				
			});
		});
		it('Invalid password -- non-string');
		it('Invalid password -- no password');
	}; 
};



