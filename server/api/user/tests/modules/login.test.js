module.exports = function(chai, app) {
  let should = chai.should();

  function login(username, password, fn) {
    chai.request.agent(app)
      .post('/user/login')
      .send({ username: username, password: password })
      .end(fn);
  }

  function testUnauthorized(err, res) {
    err.should.have.status(401);
    res.should.be.json;
    res.should.have.status(401);
    res.body.name.should.equal('Unauthorized');
  }

  return function() {
    it('Valid: 200 -- user logs in', function(done) {
      login('benjamin', 'password', function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        done();
      });
    });

    it('Invalid: 401 -- wrong username', function(done) {
      login('jonathan', 'password', function(err, res) {
        testUnauthorized(err, res);
        res.body.message.should.equal('Incorrect username');
        done();
      });
    });

    it('Invalid: 401 -- wrong password', function(done) {
      login('benjamin', 'wrongpassword', function(err, res) {
        testUnauthorized(err, res);
        res.body.message.should.equal('Incorrect password');
        done();
      });
    });

    it('Invalid: 401 -- no username', function(done) {
      login(undefined, 'password', function(err, res) {
        err.should.have.status(401);
        res.should.be.json;
        res.body.name.should.equal('Unauthorized');
        res.body.message.should.equal('Missing credentials');
        done();
      });
    });

    it('Invalid: 401 -- non-String username', function(done) {
      login({}, 'password', function(err, res) {
        err.should.have.status(401);
        res.body.name.should.equal('Unauthorized');
        res.body.message.should.equal('Missing credentials');
        done();
      });
    });

    it('Invalid: 401 -- no password', function(done) {
      login('benjamin', undefined, function(err, res) {
        err.should.have.status(401);
        res.body.name.should.equal('Unauthorized');
        res.body.message.should.equal('Missing credentials');
        done();
      });
    });

    it('Invalid: 401 -- non-String password', function(done) {
      login('benjamin', {}, function(err, res) {
        err.should.have.status(401);
        res.body.name.should.equal('Unauthorized');
        res.body.message.should.equal('Missing credentials');
        done();
      });
    });
  };
};