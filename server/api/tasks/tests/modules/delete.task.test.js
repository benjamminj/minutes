let Task = require('../../task.model');

module.exports = function(chai, app, testData) {
  let should = chai.should();

  function loginAndDelete(id, fn) {
    let agent = chai.request.agent(app);

    agent.post('/user/login')
      .send({ username: 'benjamin', password: 'password' })
      .end(function(err, res) {
        return agent.delete('/tasks/delete/' + id)
          .end(fn);
      });
  }

  return function() {
    it('Valid: 200 -- task deleted', function(done) {
      loginAndDelete(testData.taskIDs[1], function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);

        Task.find({ _owner: testData.userID }, function(err, tasks) {
          should.equal(err, null);
          tasks.length.should.equal(1);
          tasks[0].title.should.equal('My Super Awesome Task');
          done();
        });
      });
    });

    it('Invalid: 404 -- wrong taskID', function(done) {
      loginAndDelete('000000000000000000000000', function(err, res) {
        err.should.have.status(404);
        res.should.json;
        res.body.name.should.equal('NotFound');
        res.body.message.should.equal('This task does not exist in the database!');
        done();
      });
    });

    it('Invalid: 401 -- user not logged in', function(done) {
      chai.request(app)
        .delete('/tasks/delete/' + testData.taskIDs[0])
        .end(function(err, res) {
          res.should.have.status(200);
          res.text.should.include('<title>Time Tracker');
          done();
        });
    });

  };
};
