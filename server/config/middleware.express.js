let express = require('express');
let bodyParser = require('body-parser');
let passport = require('passport');
let session = require('express-session');

module.exports = function(app) {

	app.use(express.static('public/login'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	
	let sessionOptions = {
		secret: 'Task junkie',
		resave: false,
		saveUninitialized: false,
		cookie: {},
	};

	if (process.env.NODE_ENV === 'production') {
		app.set('trust proxy', 1);
		sessionOptions.cookie.secure = true;
	}

	app.use(session(sessionOptions));
	app.use(passport.initialize());
	app.use(passport.session());

	require('./passport')(passport);
};