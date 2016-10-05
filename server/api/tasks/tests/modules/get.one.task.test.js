module.exports = function(chai, app, testData) {
  let should = chai.should();

  function loginAndGetOne(taskID, callback) {
    let agent = chai.request.agent(app);

    agent.post('/user/login')
      .send({ username: 'benjamin', password: 'password' })
      .end(function() {
        return agent.get(`/tasks/id${taskID}`)
          .end(callback);
      });
  }

  return function()  {

    it('Valid: 200 -- task returns as JSON', function(done)  {
      loginAndGetOne(testData.taskIDs[0], function(err, res) {
        should.equal(err, null);
        res.should.be.json;
        res.should.have.status(200);
        res.body._id.should.equal(testData.taskIDs[0]);
        res.body.title.should.equal('My Super Awesome Task');
        done();
      });
    });

    it('Invalid: 404 -- no taskID', function(done)  {
      loginAndGetOne(undefined, function(err, res) {
        err.should.have.status(400);
        res.should.be.json;
        res.body.name.should.equal('CastError');
        res.body.message.should.equal('Cast to ObjectId failed for value "undefined" at path "_id"');
        done();
      });
    });

    it('Invalid: 404 -- wrong endpoint', function(done) {
      loginAndGetOne('', function(err, res) {
        res.should.have.status(200);
        res.text.should.include('<title>Time Tracker | Log In or Sign Up');
        done();
      });
    });

    it('Invalid: 404 -- non-existent taskID in endpoint', function(done)  {
      loginAndGetOne('000000000000000000000000', function(err, res) {
        err.should.have.status(404);
        res.should.be.json;
        res.body.name.should.equal('NotFound');
        res.body.message.should.equal('This task does not exist in the database!');
        done();
      });
    });
  };
};