let encrypt = require('../encrypt');
let bcrypt = require('bcrypt');

describe('Encrypt function', function() {
  it('Valid -- should return true', function(done) {
    encrypt('myString')
      .then(function(hash) {
        hash.should.not.equal('myString');

        bcrypt.compare('myString', hash, function(err, isValid) {
          isValid.should.equal(true);
          done();
        });
      });
  });

  it('Invalid -- should return false when compared to different string', function(done) {
    encrypt('myOtherString')
      .then(function(hash) {
        hash.should.not.equal('myOtherString');

        bcrypt.compare('someRandomString', hash, function(err, isValid) {
          isValid.should.equal(false);
          done();
        });
      });
  });

  it('Invalid -- non-String input', function(done) {
    encrypt({})
      .catch(function(err) {
        err.status.should.equal(500);
        err.name.should.equal('EncryptionError');
        err.message.should.equal('data must be a string and salt must either be a salt string or a number of rounds');
        done();
      });
  });
});