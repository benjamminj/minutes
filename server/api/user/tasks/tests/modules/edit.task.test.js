module.exports = function(chai, app) {
	let should = chai.should();
	
	function chaiEdit(request) {
		return chai.request(app)
			.put('/api/1/tasks/edit/1')
			.send(request);
	}

	return function() {
		it('Valid: 200 -- change title', function(done) {
			let newTitle = { title: 'My New Title'};

			chaiEdit(newTitle)
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('Object');
					res.body.title.should.equal('My New Title');
					done();
				});
		});

		it('Valid: 200 -- change description', function(done) {
			let newDescription = {description: 'My New Description'};

			chaiEdit(newDescription)
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('Object');
					res.body.description.should.equal('My New Description');
					done();
				});
		});

		it('Invalid: 400 -- input "time" as key', function(done) {
			let invalidKey = {time: 'My New Time'};
			
			chaiEdit(invalidKey)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('ValidationError');
					res.body.errors['tasks.0.time'].message.should.equal('Cast to Number failed for value "My New Time" at path "time"');
					done();
				});
		});

// FIX ME
		it('Invalid: 400 -- invalid JSON', function(done) {
			let invalidJSON = function(){};

			chaiEdit(invalidJSON)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('InvalidInput');
					res.body.message.should.equal('"undefined" must be either "title" or "description"');
					done(); 
				});
		});

		it('Invalid: 400 -- non-String as value', function(done) {
			let nonStringValue = {title: {}};

			chaiEdit(nonStringValue)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('ValidationError');
					res.body.errors['tasks.0.title'].message.should.equal('Cast to String failed for value "{}" at path "title"');
					done();
				});
		});

		it('Invalid: 400 -- no "value" input', function(done) {
			let noValue = {key: undefined};

			chaiEdit(noValue)
				.end(function(err, res) {
					err.should.have.status(400);
					res.should.be.json;
					res.body.name.should.equal('InvalidInput');
					res.body.message.should.equal('"undefined" must be either "title" or "description"');
					done();
				});
		});

		it('Invalid: 404 -- user id not in db', function(done) {
			chai.request(app)
				.put('/api/20/tasks/edit/1')
				.send({ key: 'title', value: 'My New Title'})
				.end(function(err, res) {
					err.should.have.status(404);
					res.should.be.json;
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This user id was not found in the database');
					done();
				});
		});

		it('Invalid: 404 -- wrong taskId', function(done) {
			chai.request(app)
				.put('/api/1/tasks/edit/34')
				.send({ key: 'title', value: 'My New title'})
				.end(function(err, res) {
					err.should.have.status(404);
					res.should.be.json;
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This task id was not found in the database');
					done();
				});
		});
	};
};