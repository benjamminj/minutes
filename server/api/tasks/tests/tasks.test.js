let chai = require('chai');

chai.use(require('chai-http'));

let app = require('../../../server');


describe('Tasks', function() {
  let testData = {};
  require('./modules/hooks')(testData);

  describe('Get All Tasks', require('./modules/get.all.tasks.test')(chai, app, testData));
  describe('Create a Task', require('./modules/create.task.test')(chai, app, testData));
  describe('Edit a Task', require('./modules/edit.task.test.js')(chai, app, testData));
  describe('Delete a Task', require('./modules/delete.task.test')(chai, app, testData));

});

