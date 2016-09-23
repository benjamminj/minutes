module.exports = function(should, User) {
	return function() {
		beforeEach(function(done) {
			User.remove({}).exec();
			User.create({ 
				username: 'benjamin', 
				password: 'password', 
				_id: '12345'
			}, function() {
				done();
			});
		});

		let query = { username: 'benjamin' };
		let options = { new: true, runValidators: true};

		it('Valid task -- task added to tasks array', function(done) {
			let task = {
				// Remove when Session data is implemented
				_id: '12345',
				title: 'My Super Awesome Task',
				date: new Date(2016-09-21),
				time: 40000,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'
			};

			User.findOneAndUpdate(query, update(task), options, function(err, user) {
				user.tasks.length.should.equal(1);
				user.tasks[0].title.should.equal('My Super Awesome Task');
				user.tasks[0].time.should.equal(40000);
				done();
			});
		});	

		function update(task) {
			return { $push: {tasks: task}};
		}

		function createTask(title, date, time, description) {
			return {
				title: title,
				date: date,
				time: time,
				description: description,
			};
		}

		it('Invalid task -- non-string for title', function(done) {
			let task = createTask({}, Date.now(), 500000, 'Brief description');

			User.findOneAndUpdate(query, update(task), function(err, user) {
				err.name.should.equal('CastError');
				err.reason.message.should.equal('Cast to String failed for value "{}" at path "title"');
				done();
			});
		});		
	
		it('Invalid task -- non-date for date', function(done) {
			let task = createTask('Task', 'this is a string', 500000, 'Description');

			User.findOneAndUpdate(query, update(task), options, function(err, user) {
				err.name.should.equal('CastError');
				err.reason.message.should.equal('Cast to Date failed for value "this is a string" at path "date"');
				done();
			});
		});

		it('Invalid task -- non-number for time', function(done) {
			let task = createTask('Task', Date.now(), 'String', 'Description');

			User.findOneAndUpdate(query, update(task), options, function(err, user) {
				err.name.should.equal('CastError');
				err.reason.message.should.equal('Cast to Number failed for value "String" at path "time"');
				done();
			});
		});

		it('Invalid task -- non-string from description', function(done) {
			let task = createTask('Title', Date.now(), 30000, {});

			User.findOneAndUpdate(query, update(task), options, function(err, user) {
				err.name.should.equal('CastError');
				err.reason.message.should.equal('Cast to String failed for value "{}" at path "description"');
				done();
			});
		});
	};
};