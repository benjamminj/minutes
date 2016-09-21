let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');
let User = require('../../../models/user.model');

describe('Tasks Endpoint', function() {
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
					title: 'My Second Super Awesome Task',
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

	describe('GET requests on /home/username/tasks', function() {
		it('Valid -- returns 200 and user JSON', function(done) {
			chai.request(app)
				.get('/home/benjamin/tasks')
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('Array');
					res.body[0].title.should.equal('My Super Awesome Task');
					res.body[1].time.should.equal(1000 * 100);
					done();
				});
		});

		it('Invalid -- username not in db returns 404', function(done) {
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