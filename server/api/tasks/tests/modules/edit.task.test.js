module.exports = function(chai, app, testData) {
	let should = chai.should();

	function loginAndPutRequest(id, edits, fn) {
		let agent = chai.request.agent(app);

		agent.post('/user/login')
			.send({ username: 'benjamin', password: 'password'})
			.end(function() {
				return agent.put('/tasks/edit/' + id)
					.send(edits)
					.end(fn);
			});
	}

	function loginAndEdit(edits, fn) {
		return loginAndPutRequest(testData.taskIDs[1], edits, fn);
	}

	function testSuccessfulEdit(err, res) {
		should.equal(err, null);
		res.should.have.status(200);
		res.should.be.json;
		res.body._id.should.equal(testData.taskIDs[1]);
		res.body._owner.should.equal(testData.userID);
	}

	function testFailedEdit(err, res, status, errName) {
		err.should.have.status(status);
		res.should.be.json;
		res.body.name.should.equal(errName);
	}

	function testCastError(err, res) {
		return testFailedEdit(err, res, 400, 'CastError');
	}

	return function() {
		it('Valid: 200 -- edit title and description', function(done) {
			loginAndEdit({
				title: 'New Title',
				description: 'New Description'
			}, function(err, res) {
				testSuccessfulEdit(err, res);
				res.body.title.should.equal('New Title');
				res.body.description.should.equal('New Description');
				done();
			});
		});

		it('Valid: 200 -- edit title only', function(done) {
			loginAndEdit({
				title: 'New Title'
			}, function(err, res) {
				testSuccessfulEdit(err, res);
				res.body.title.should.equal('New Title');
				res.body.description.should.equal('short description');
				done();
			});
		});

		it('Valid: 200 -- edit description only', function(done) {
			loginAndEdit({
				description: 'New Description'
			}, function(err, res) {
				testSuccessfulEdit(err, res);
				res.body.title.should.equal('My Second Super Awesome Task');
				res.body.description.should.equal('New Description');
				done();
			});
		});

		it('Invalid: 400 -- edit title with non-String', function(done) {
			loginAndEdit({
				title: {}
			}, function(err, res) {
				testCastError(err, res);
				res.body.message.should.equal('Cast to string failed for value "{}" at path "title"');
				done();
			});
		});

		it('Invalid: 400 -- edit description with non-String', function(done) {
			loginAndEdit({
				description: {}
			}, function(err, res) {
				testCastError(err, res);
				res.body.message.should.equal('Cast to string failed for value "{}" at path "description"');
				done();
			});
		});

		it('Valid: 200 -- try to edit = no changes', function(done) {
			loginAndEdit({
				time: 50000
			}, function(err, res) {
				testSuccessfulEdit(err, res);
				res.body.title.should.equal('My Second Super Awesome Task');
				res.body.description.should.equal('short description');
				res.body.time.should.equal(200);
				done();
			});
		});

		it('Valid: 200 --- empty request', function(done) {
			loginAndEdit({}, function(err, res) {
				testSuccessfulEdit(err, res);
				res.body.title.should.equal('My Second Super Awesome Task');
				res.body.description.should.equal('short description');
				res.body.time.should.equal(200);
				done();			
			});
		});

		it('Invalid: 401 -- try to edit without login', function(done) {
			chai.request(app)
				.put('/tasks/edit/' + testData.taskIDs[1])
				.send({
					title: 'My New Title'
				})
				.end(function(err, res) {
					testFailedEdit(err, res, 401, 'Unauthorized');
					res.body.message.should.equal('You are not logged in');
					done();
				});
		});

		it('Invalid: 404 -- taskID doesn\'t exist in db', function(done) {
			loginAndPutRequest('000000000000000000000000', {
				title: 'My new title'
			}, function(err, res) {
				testFailedEdit(err, res, 404, 'NotFound');
				res.body.message.should.equal('This task does not exist in the database!');
				done();
			});
		});
	};
};