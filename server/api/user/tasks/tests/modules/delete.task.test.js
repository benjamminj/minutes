module.exports = function(chai, app) {
	let should = chai.should();
	function chaiDelete(endpoint) {
		return chai.request(app)
			.delete(endpoint);
	}

	return function() {
		it('Valid: 200 -- returns updated user', function(done) {
			chai.request(app)
				.delete('/api/1/tasks/delete/1')
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body._id.should.equal('1');
					res.body.tasks.length.should.equal(1);
					res.body.tasks[0].title.should.equal('My Second Super Awesome Task');
					done();
				});
		});

		it('Invalid: 404 -- wrong user id', function(done) {
			chaiDelete('/api/20/tasks/delete/1')
				.end(function(err, res) {
					err.should.have.status(404);
					res.should.be.json;
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This user id was not found in the database');
					done();
				});
		});

		it('Invalid: 404 -- wrong task id', function(done) {
			chaiDelete('/api/1/tasks/delete/20')
				.end(function(err, res) {
					err.should.have.status(404);
					res.should.be.json;
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This task was not found in the database');
					done();
				});
		});
	};
};