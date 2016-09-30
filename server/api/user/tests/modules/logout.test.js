module.exports = function(chai, app) {
	let should = chai.should();

	return function() {
		it('Valid: 200 -- should log the user out', function(done) {
			let agent = chai.request.agent(app);

			agent.post('/user/login')
				.send({ username: 'benjamin', password: 'password' })
				.end(function() {

					return agent.get('/user/logout')
						.end(function(err, res) {
							should.equal(err, null);
							res.should.have.status(200);
							res.req.path.should.equal('/user/login');
							done();
						});
				});
		});

		it('Valid: 200 -- no user logged in still redirect to login page', function(done) {
			chai.request(app)
				.get('/user/logout')
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.req.path.should.equal('/user/login');
					done();
				});
		});
	};
};