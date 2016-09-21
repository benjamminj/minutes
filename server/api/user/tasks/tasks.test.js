let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');
let User = require('../../../models/user.model');

describe('Requests on /home/:username/tasks', function() {
	beforeEach(function(done) {
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
			// console.log(users);
			done();
		});
	});

	afterEach(function(done) {
		User.remove({}, done);
	});

	describe('/tasks', function() {
		it('GET -- username not in db returns 404', function(done) {
			chai.request(app)
				.get('/home/jordan/tasks/')
				.end(function(err, res) {
					err.should.have.status(404);
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This user was not found in the database');
					done();
				});
		});
	});

});