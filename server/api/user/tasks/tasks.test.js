let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');
let User = require('../../../models/user.model');

describe('Tasks Endpoint', function() {
	beforeEach(function(done) {
		User.remove({}).exec();
		User.create({
			_id: 1,
			username: 'benjamin',
			password: 'password',
			tasks: [
				{
					_id: '1',
					title: 'My Super Awesome Task',
					date: Date.now(),
					time: (1000 * 40),
					description: 'Lorem ipsum dolor sit.'
				},
				{
					_id: '2',
					title: 'My Second Super Awesome Task',
					date: 2016-09-20,
					time: (1000 * 100),
					description: 'Lorem ipsum dolor sit.'
				}
			]
		}, function(err, users) {
			done();
		});
	});

	afterEach(function(done) {
		User.remove({}, done);
	});

	describe('GET requests on /home/username/tasks', function() {
		it('Valid -- returns 200 and user JSON', function(done) {
			chai.request(app)
				.get('/home/1/tasks')
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

		it('Invalid -- username not in db returns 400', function(done) {
			chai.request(app)
				.get('/home/20/tasks/')
				.end(function(err, res) {
					err.should.have.status(404);
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This user id was not found in the database');
					done();
				});
		});
	});

	describe('DELETE requests on /home/username/tasks/delete-:taskID', function() {
		it('Valid -- returns 200 and updated user', function(done) {
			chai.request(app)
				.delete('/home/1/tasks/delete-1')
				.end(function(err, res) {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body._id.should.equal('1');
					res.body.tasks.length.should.equal(1);
					res.body.tasks[0].title.should.equal('My Second Super Awesome Task');
					done();
				});
		});

		function chaiDelete(endpoint) {
			return chai.request(app)
				.delete(endpoint)
		}

		it('Invalid: 404 -- wrong user id', function(done) {
			chaiDelete('/home/20/tasks/delete-1')
				.end(function(err, res) {
					err.should.have.status(404);
					res.should.be.json;
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This user id was not found in the database');
					done();
				});
		});

		it('Invalid: 404 -- wrong task id', function(done) {
			chaiDelete('/home/1/tasks/delete-20')
				.end(function(err, res) {
					err.should.have.status(404);
					res.should.be.json;
					res.body.name.should.equal('NotFound');
					res.body.message.should.equal('This task was not found in the database');
					done();
				});
		});
	});
});