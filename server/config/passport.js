let localStrategy = require('passport-local').Strategy;
let User = require(__baseURL + '/models/user.model');

module.exports = function(passport) {
	passport.use(new localStrategy(
		function(username, password, done) {
			// TO DO -- refactor using Promises
			User.findOne({ username: username }, function(err, user) {
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, {
						message: 'Incorrect username' // Update message
					});
				}

				user.validatePassword(password, function(err, isValid) {
					if (err) {
						return done(err);
					}

					if (!isValid) {
						return done(null, false, {
							message: 'Incorrect password'
						});
					} else {
						console.log(user);
						return done(null, user);
					}
				});
			});
		})
	);

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

};