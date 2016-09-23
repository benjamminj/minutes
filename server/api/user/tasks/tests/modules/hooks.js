module.exports = function() {
	let User = require(__baseURL + 'models/user.model');

	beforeEach(function(done) {
		User.remove({}).exec();
		User.create({
			_id: 1,
			username: 'benjamin',
			password: 'password',
			tasks: [
				{
					_id: '1',
					title: 'My Super Awesome Task',
					date: Date.now(),
					time: (1000 * 40),
					description: 'Lorem ipsum dolor sit.'
				},
				{
					_id: '2',
					title: 'My Second Super Awesome Task',
					date: new Date(2016, 08, 03),
					time: (1000 * 100),
					description: 'Lorem ipsum dolor sit.'
				}
			]
		}, function(err, users) {
			done();
		});
	});

	afterEach(function(done) {
		User.remove({}, done);
	});
};