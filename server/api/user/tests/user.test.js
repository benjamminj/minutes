let chai = require('chai');

chai.use(require('chai-http'));

let app = require('../../../server');

describe('User', function() {
  require('./modules/hooks')();

  describe('Create a new user', require('./modules/signup.test')(chai, app));
  describe('Login a user', require('./modules/login.test')(chai, app));
  describe('Logout a user', require('./modules/logout.test')(chai, app));

});