let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('./server');

describe('Server/server.js', function() {

  it('Log in page html served on root endpoint', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
});
