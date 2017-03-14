
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let User = require('../api/user/user.model');

module.exports = function(app) {
  // app.use(express.static('public/dashboard'));
  app.use(express.static('public/home'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  let sessionOptions = {
    secret: 'tasks',
    resave: false,
    saveUninitialized: false,
  };

  // if (process.env.NODE_ENV === 'production') {
  // 	app.set('trust proxy', 1);
  // 	sessionOptions.cookie.secure = true;
  // }

  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  require('./passport.strategy')(passport);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // QUESTION -- why is passport not deserializing data into req.user.id?
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
