module.exports = function(chai, app) {
  let should = chai.should();

  function signup(username, password, fn) {
    chai.request.agent(app)
      .post('/user/signup')
      .send({ username: username, password: password })
      .end(fn);
  }
  function testError(err, res, code, name) {
    err.should.have.status(code);
    res.should.be.json;
    res.should.have.status(code);
    res.body.name.should.equal(name);
  }

  function testValidationError(err, res) {
    testError(err, res, 400, 'ValidationError');
  }

  function testEncryptionError(err, res) {
    testError(err, res, 500, 'EncryptionError');
  }

  return function() {
    it('Valid: 201 -- user signs up', function(done) {
      signup('george', 'password', function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        done();
      });
    });

    it('Invalid: 400 -- username already taken', function(done) {
      signup('benjamin', 'password', function(err, res) {
        err.should.have.status(400);
        res.should.be.json;
        res.body.name.should.equal('MongoError');
        should.equal(res.body.message.includes('E11000 duplicate key error'), true);
        should.equal(res.body.message.includes('dup key: { : "benjamin" }'), true);
        done();
      });
    });

    it('Invalid: 400 -- non-alphanumeric username', function(done) {
      signup('BEN-JAMIN#@!', 'password', function(err, res) {
        testValidationError(err, res);
        res.body.errors.username.message.should.equal('Value "BEN-JAMIN#@!" must be alphanumeric at path "username"')
        done();
      });
    });

    it('Invalid: 400 -- non-String username', function(done) {
      signup({}, 'password', function(err, res) {
        testValidationError(err, res);
        res.body.errors.username.message.should.equal('Cast to String failed for value "{}" at path "username"');
        done();
      });
    });

    it('Invalid: 400 -- no username', function(done) {
      signup(undefined, 'password', function(err, res) {
        testValidationError(err, res);
        res.body.errors.username.message.should.equal('Path `username` is required.');
        done();
      });
    });

    it('Invalid: 400 -- non-String password', function(done) {
      signup('george', {}, function(err, res) {
        testEncryptionError(err, res);
        res.body.message.should.equal('data must be a string and salt must either be a salt string or a number of rounds');
        done();
      });
    });

    it('Invalid: 400 -- no password', function(done) {
      signup('george', undefined, function(err, res) {
        testEncryptionError(err, res);
        res.body.message.should.equal('data and salt arguments required');
        done();
      });
    });
  };
};