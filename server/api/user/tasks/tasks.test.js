let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');

describe('Requests on /:user/tasks', function() {
	describe('/', function() {
		it('GET request should return status 200', function(done) {
			chai.request(app)
				.get('/benjamin/tasks/')
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.message.should.equal('The controller was routed successfully');
					done();
				});
		});
	});
});