let localStrategy = require('passport-local').Strategy;
let User = require('../api/user/user.model');

let createError = require('../utils/create.error');

module.exports = (passport) => {
  passport.use(new localStrategy((username, password, done) => {

    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          throw createError('Invalid', 'Incorrect username');
        } else {
          return user.validatePassword(password);
        }
      })
      .then((authUser) => {
        if (!authUser) {
          throw createError('Invalid', 'Incorrect password');
        } else {
          done(null, authUser);
        }
      })
      .catch((err) => {
        if (err.name === 'Invalid') {
          done(null, false, { message: err.message });
        } else {
          done(err);
        }
      });
  }));
};
