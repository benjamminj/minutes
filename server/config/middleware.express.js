let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let User = require('../api/user/user.model');

module.exports = function(app) {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  let sessionOptions = {
    secret: 'tasksandstufflikethat',
    resave: false,
    saveUninitialized: false,
  };

  app.use(session(sessionOptions));

  require('./passport.strategy')(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
