module.exports = function(chai, app) {
	let should = chai.should();

	return function() {
		it('Valid: 200 -- gets all user info', function(done) {
			chai.request(app)
				.get('/api/1/tasks')
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('Array');
					res.body[0].title.should.equal('My Super Awesome Task');
					res.body[1].time.should.equal(1000 * 100);
					done();
				});
		});

		it('Invalid: 404 -- username not in db', function(done) {
			chai.request(app)
				.get('/api/20/tasks/')
				.end(function(err, res) {
					err.should.have.status(404);
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This user id was not found in the database');
					done();
				});
		});
	};	
};