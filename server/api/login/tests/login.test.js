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
			res.should.be.json;
			res.body.message.should.equal('Wrong username or password');
			done();
		});
}

describe('Login', function() {
	beforeEach(function(done) {
		hashPassword('password')
			.then(function(hash) {
				console.log(hash);
				return User.create({ username: 'benjamin', password: hash});
			})
			.then(function(user) {
				console.log(user);
				done();
			})
			.catch(function(err) {
				console.log(err);
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

	it('Invalid: 401 -- wrong username', function(done) {
			chaiFailureRedirect('george', 'password', done);
	});

	it('Invalid: 401 -- wrong password', function(done) {
		chaiFailureRedirect('benjamin', 'wrongPassword', done);
	});

	it('Invalid: 401 -- no username', function(done) {
		chaiFailureRedirect(undefined, 'password', done);
	});

	it('Invalid: 401 -- no password', function(done) {
		chaiFailureRedirect('benjamin', undefined, done);
	});

	it('Invalid: ??? --- not connected to db should return ???');
});


