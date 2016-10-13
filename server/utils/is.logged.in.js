let createError = require('./create.error');

module.exports = function(req, res, next) {
  // Check to see if there is session data for a logged in user.
  if (req.user) {
    next();
  } else {
    next(createError('Unauthorized', 'You are not logged in', 401));
  }
};
