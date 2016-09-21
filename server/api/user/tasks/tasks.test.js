let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');

describe('Requests on /:user/tasks', function() {
	describe('/', function() {
		it('GET -- username not in db returns 404', function(done) {
			chai.request(app)
				.get('/benjamin/tasks/')
				.end(function(err, res) {
					res.should.have.status(404);
					done();
				});
		});
	});
});