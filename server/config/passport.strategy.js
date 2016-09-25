let localStrategy = require('passport-local').Strategy;
let User = require(__baseURL + '/models/user.model');
let createError = require(__baseURL + 'utils/error.constructor');

module.exports = function(passport) {
	passport.use(new localStrategy(function(username, password, done) {

		User.findOne({ username: username })
			.then(function(user) {
				if (!user) {
					throw createError('Invalid', 'Incorrect username');
				} else {
					return user.validatePassword(password);
				}
			})
			.then(function(authUser) {
				if (!authUser) {
					throw createError('Invalid', 'Incorrect password');
				} else {
					done(null, authUser);
				}
			})
			.catch(function(err) {
				if (err.name === 'Invalid') {
					done(null, false, { message: err.message });
				} else {
					console.log('err', err);
					done(err);
				}
			});
	}));
};