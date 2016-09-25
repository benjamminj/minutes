let chai = require('chai');

chai.use(require('chai-http'));
let should = chai.should();

let app = require('../../../server');
let User = require(__baseURL + 'models/user.model');
let hashPassword = require(__baseURL + 'utils/encrypt');

function chaiLogin(username, password) {
	return chai.request.agent(app)
		.post('/login')
		.send({ username: username, password: password});
}

function chaiFailureRedirect(username, password, done) {
	return chaiLogin(username, password)
		.end(function(err, res) {
			err.should.have.status(401);
			done();
		});
}

describe('Login', function() {
	beforeEach(function(done) {
		hashPassword('password')
			.then(function(hash) {
				return User.create({ username: 'benjamin', password: hash});
			})
			.then(function(user) {
				done();
			});
	});

	afterEach(function(done) {
		User.remove({}).exec();
		done();
	});

	it('Valid -- correct credentials should return user data', function(done) {
		chaiLogin('benjamin', 'password')
			.end(function(err, res) {
				should.equal(err, null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.username.should.equal('benjamin');
				res.body.password.should.not.equal('password');
				done();
			});
	});

	it('Invalid: 401 -- wrong username should return unauthorized message', function(done) {
		chaiLogin('george', 'password')
			.end(function(err, res) {
				err.should.have.status(401);
				res.should.be.json;
				res.body.message.should.equal('Wrong username or password');
				done();
			});
	});

	it('Invalid: 401 -- wrong password should return unauthorized message', function(done) {
		chaiFailureRedirect('benjamin', 'wrongPassword', done);
	});

	it('Invalid: 401 -- no username in request', function(done) {
		chaiFailureRedirect(undefined, 'password', done);
	});
});


