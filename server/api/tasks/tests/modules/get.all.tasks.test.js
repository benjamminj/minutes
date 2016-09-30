let Task = require('../../task.model');

module.exports = function(chai, app, testData) {
	let should = chai.should();

	function loginAndGet(fn) {
		let agent = chai.request.agent(app);
		
		agent.post('/user/login')
			.send({ username: 'benjamin', password: 'password'})
			.end(function(err, res) {				
				return agent.get('/tasks')
					.end(fn);
			});
	}

	return function() {
		it('Valid: 200 -- tasks returns as an array', function(done) {
			loginAndGet(function(err, res) {
				console.log(testData);
				should.equal(err, null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('Array');
				res.body.length.should.equal(2);
				res.body[0].title.should.equal('My Super Awesome Task');
				res.body[0]._id.should.equal(testData.taskIDs[0]);
				done();
			});
		});

		it('Valid: 200 -- no tasks in db returns []', function(done) {
			Task.remove({}, function() {
				loginAndGet(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('Array');
					res.body.length.should.equal(0);
					done();	
				});
			});
		});

		it('Invalid: 401 -- no req.user.id', function(done) {
			chai.request(app)
				.get('/tasks')
				.end(function(err, res) {
					err.should.have.status(401);
					res.should.be.json;
					res.body.name.should.equal('Unauthorized');
					res.body.message.should.equal('You are not logged in');
					done();
				});
		});
	};
};