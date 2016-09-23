
module.exports = function(chai, app) {
	let should = chai.should();
	let createTask = require(__baseURL + 'utils/task.constructor');
	function chaiPost(endpoint, request) {
		return chai.request(app)
			.post(endpoint)
			.send(request);
	}

	return function() {
		it('Valid: 201 -- returns update task list', function(done) {
			let newTask = createTask('3', 'My Third Super Awesome Task', Date.now(), 300000, 'A brief description');
			
			chaiPost('/api/1/tasks/create', newTask)
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('Array');
					res.body.length.should.equal(3);
					res.body[2].title.should.equal('My Third Super Awesome Task');
					res.body[2].time.should.equal(300000);
					done();
				});
		});

		it('Invalid: 404 -- wrong user id in URL', function(done) {
			let newTask = createTask('1234', 'My Third Super Awesome Task', Date.now(), 300000, 'Description');

			chaiPost('/api/40/tasks/create', newTask)
				.end(function(err, res) {
					err.should.have.status(404);
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This user id was not found in the database');
					done();
				});
		});

		it('Valid: 201 -- no _id should auto-generate id', function(done) {
			let noId = createTask(undefined, 'My Third Super Awesome Task', Date.now(), 3000000, 'Description');

			chaiPost('/api/1/tasks/create', noId)
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('Array');
					res.body.length.should.equal(3);
					res.body[2]._id.length.should.equal(24); // Check to see if generate id was Mongo ObjectID
					res.body[2].title.should.equal('My Third Super Awesome Task');
					done();
				});
		});

		it('Invalid: 400 -- wrong _id type', function(done) {
			let invalidId = createTask(23, 'My Third Super Awesome Task', Date.now(), 4000000, 'A brief description');

			chaiPost('/api/1/tasks/create', invalidId)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('ValidationError');
					res.body.message.should.equal('"_id" must be a string');
					done();
				});
		});

		it('Valid: 201 -- no title should autogenerate title', function(done) {
			let noTitle = createTask('12345', undefined, Date.now(), 456, 'Description');

			chaiPost('/api/1/tasks/create', noTitle)
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('Array');
					res.body.length.should.equal(3);
					should.equal(res.body[2].title.includes('My Task on'), true);
					done();
				});
		});

		it('Invalid: 400 -- non-String for title', function(done) {
			let nonStringTitle = createTask('1234', {}, Date.now(), 3456, 'Description');

			chaiPost('/api/1/tasks/create', nonStringTitle)
				.end(function(err, res) {
					err.status.should.equal(400);
					res.should.be.json;
					res.body.name.should.equal('ValidationError');
					res.body.message.should.equal('"title" must be a string');
					done();
				});
		});

		it('Invalid: 400 -- no date', function(done) {
			let noDate = createTask('1234', 'My Thirs Super Awesome Task', undefined, 40000, 'Description');

			chaiPost('/api/1/tasks/create', noDate)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('ValidationError');
					res.body.message.should.equal('"date" must be a number of milliseconds or valid date string');
					done();
				});
		});

		it('Invalid: 400 -- date set in future', function(done) {
			let futureDate = createTask('12345', 'My Third Super Awesome Task', new Date(2017, 08, 18), 50000, 'Description');

			chaiPost('/api/1/tasks/create', futureDate)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('ValidationError');
					should.equal(res.body.message.includes('"date" must be less than or equal to'), true);
					done();
				});
		});

		it('Valid: 201 -- No Description should store without description', function(done) {
			let noDesc = createTask('12345', 'My Third Super Awesome Task', Date.now(), 400000, undefined);

			chaiPost('/api/1/tasks/create', noDesc)
				.end(function(err, res) {
					should.equal(err, null);
					res.should.be.json;
					res.body.should.be.a('Array');
					res.body.length.should.equal(3);
					res.body[2].should.not.have.property('description');
					done();
				});
		});

		it('Invalid: 400 -- non-String for description', function(done) {
			let nonStringDesc = createTask('12345', 'Awesome Task', Date.now(), 40000, {});

			chaiPost('/api/1/tasks/create', nonStringDesc)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('ValidationError');
					res.body.message.should.equal('"description" must be a string');
					done();
				});
		});
	};
};