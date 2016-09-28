module.exports = function(chai, app, testData) {
	let should = chai.should();

	function loginAndEdit(edits, fn) {
		let agent = chai.request.agent(app);

		agent.post('/users/login')
			.send({ username: 'benjamin', password: 'password'})
			.end(function() {
				return agent.put('/tasks/edit/' + testData.taskIDs[1])
					.send(edits)
					.end(fn);
			});
	}

	function testSuccessfulEdit(err, res) {
		should.equal(err, null);
		res.should.have.status(200);
		res.should.be.json;
		res.body._id.should.equal(testData.taskIDs[1]);
		res.body._owner.should.equal(testData.userID);
	}

	function testFailedEdit(err, res) {
		err.should.have.status(400);
		res.should.be.json;
		res.body.name.should.equal('CastError');
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

		it('Invalid: ??? -- edit title with non-String', function(done) {
			loginAndEdit({
				title: {}
			}, function(err, res) {
				testFailedEdit(err, res);
				res.body.message.should.equal('Cast to string failed for value "{}" at path "title"');
				// console.log(res.body.errors);
				done();
			});
		});
		it('Invalid: ??? -- edit description with non-String');
		it('Invalid: ??? -- try to edit time');
		it('Invalid: 401 -- try to edit without login');

	};
};