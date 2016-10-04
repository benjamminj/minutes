let Task = require('../../task.model');
let User = require('../../../user/user.model');
let hashPassword = require('../../../../utils/encrypt');

module.exports = function(testData) {
	before(function(done) {
		User.remove({})
			.then(function() {
				Task.remove({}, done);
			});
	});

	beforeEach(function(done) {
		hashPassword('password')
			.then(function(hashedPassword) {
				return User.create({ username: 'benjamin', password: hashedPassword });
			})
			.then(function(user) {
				testData.userID = user._id.toString();
				let task1 = { title: 'My Super Awesome Task', time: 100, _owner: user._id };
				let task2 = { title: 'My Second Super Awesome Task', time: 200, _owner: user._id, description: 'short description'};
				return Task.create([task1, task2]);
			})
			.then(function(tasks) {
				testData.taskIDs = [tasks[0]._id.toString(), tasks[1]._id.toString()];
				done();
			});
	});

	afterEach(function(done) {
		User.remove({}).exec();
		Task.remove({}).exec();
		done();
	});

};