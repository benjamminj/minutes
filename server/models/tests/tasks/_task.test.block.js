let User = require('../../user.model');

function findUser(username, callback) {
	User.findOne({username: username}, callback);
}

module.exports = function(should) {
	return function() {
		beforeEach(function(done) {
			User.remove({}).exec();
			User.create({ username: 'benjamin', password: 'password'}, function() {
				done();
			});
		});

		it('Valid task', function(done) {
			findUser('benjamin', function(err, user) {
				should.equal(err, null);
				done();
			});

		});	

		describe('Title validation', function() {
			it('title blah blah blah');
		});		
	}

};