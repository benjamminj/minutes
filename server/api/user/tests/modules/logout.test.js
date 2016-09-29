module.exports = function(chai, app) {

	return function() {
		it('Valid: ??? -- should log the user out', function(done) {
			let agent = chai.request.agent(app);

			agent.post('/user/login')
				.send({ username: 'benjamin', password: 'password' })
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					
					return agent.get('/user/logout')
						.end(function(err, res) {
							console.log(res);
							done();
						});
				});
		});
	};
};