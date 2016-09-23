let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');

describe('Login', function() {
	it('Endpoint exists', function(done) {
		chai.request(app)
			.post('/login')
			.send({ some: 'json' })
			.end(function(err, res) {
				done();
			});
	});
});