module.exports = function(chai, app, testData) {
	let should = chai.should();

	function loginAndCreate(task, fn) {
		let agent = chai.request.agent(app);

		agent.post('/users/login')
			.send({ username: 'benjamin', password: 'password' })
			.end(function(err, res) {
				return agent.post('/tasks/create')
					.send(task)
					.end(fn);
			});
	}

	return function() {
		it('Valid: 201 -- task created with all fields', function(done) {
			loginAndCreate({
				title: 'My Third Super Awesome Task',
				time: 400,
				description: 'Very short'
			}, function(err, res) {
				should.equal(err, null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.title.should.equal('My Third Super Awesome Task');
				res.body.time.should.equal(400);
				res.body._owner.should.equal(testData.userID);
				res.body._id.length.should.equal(24);
				res.body.should.have.property('date');
				done();
			});
		});

		it('Valid: 201 -- task created without description', function(done) {
			loginAndCreate({
				title: 'Task #3',
				time: 300
			}, function(err, res) {
				should.equal(err, null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.title.should.equal('Task #3');
				res.body.time.should.equal(300);
				res.body._owner.should.equal(testData.userID);
				res.body._id.length.should.equal(24);
				res.body.should.not.have.property('description');
				done();
			});
		});

		it('Valid: 201 -- task created without title', function(done) {
			loginAndCreate({
				time: 300,
				description: 'Short'
			}, function(err, res) {
				should.equal(err, null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.have.property('title');
				should.equal(res.body.title.includes('My Task on'), true);
				res.body.time.should.equal(300);
				res.body.description.should.equal('Short');
				res.body._owner.should.equal(testData.userID);
				res.body._id.length.should.equal(24);
				done();
			});
		});

		it('Invalid: 401 -- owner not signed in', function(done) {
			chai.request(app)
				.post('/tasks/create')
				.send({
					title: 'Unauthorized task',
					time: 300000
				}).end(function(err, res) {
					err.should.have.status(401);
					res.should.be.json;
					res.body.name.should.equal('Unauthorized');
					res.body.message.should.equal('You are not logged in');
					done();
				});
		});

		it('Invalid: ??? -- no time', function(done) {
			loginAndCreate({
				title: 'No Time!'
			}, function(err, res) {
				err.should.have.status(400);
				res.should.be.json;
				res.body.name.should.equal('ValidationError');
				res.body.errors.time.message.should.equal('Path `time` is required.');
				done();
			});
		});

		it('Invalid: 400 -- negative time', function(done) {
			loginAndCreate({
				title: 'Task #3',
				time: -300
			}, function(err, res) {
				err.should.have.status(400);
				res.should.be.json;
				res.body.name.should.equal('ValidationError');
				res.body.errors.time.message.should.equal('Path `time` (-300) is less than minimum allowed value (0).');
				done();
			});
		});

		it('Invalid: 400 -- non-String for title', function(done) {
			loginAndCreate({
				title: {},
				time: 400
			}, function(err, res) {
				err.should.have.status(400);
				res.should.be.json;
				res.body.name.should.equal('ValidationError');
				res.body.errors.title.message.should.equal('Cast to String failed for value "{}" at path "title"');
				done();
			});
		});

		it('Invalid: 400 -- non-String for description', function(done) {
			loginAndCreate({
				title: 'My Title',
				time: 400,
				description: {}
			}, function(err, res) {
				err.should.have.status(400);
				res.should.be.json;
				res.body.name.should.equal('ValidationError');
				res.body.errors.description.message.should.equal('Cast to String failed for value "{}" at path "description"');
				done();
			});
		});

		it('Invalid: 400 -- non-Number for time', function(done) {
			loginAndCreate({
				title: 'My title',
				time: 'Another string'
			}, function(err, res) {
				err.should.have.status(400);
				res.should.be.json;
				res.body.name.should.equal('ValidationError');
				res.body.errors.time.message.should.equal('Cast to Number failed for value "Another string" at path "time"');
				done();
			});
		});
	};
};