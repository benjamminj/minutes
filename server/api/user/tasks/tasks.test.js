let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');
let User = require('../../../models/user.model');

describe('Requests on /:user/tasks', function() {
	before(function(done) {
		User.remove({}).exec();
		User.create({
			username: 'benjamin',
			password: 'password',
			tasks: [
				{
					title: 'My Super Awesome Task',
					date: Date.now(),
					time: (1000 * 40),
					description: 'Lorem ipsum dolor sit.'
				},
				{
					title: 'My Second Super Aweseom Task',
					date: 2016-09-20,
					time: (1000 * 100),
					description: 'Lorem ipsum dolor sit.'
				}
			]
		}, function(err, users) {
			console.log(users);
			done();
		});
	});

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

	after(function(done) {
		User.remove({}, done);
	});
});