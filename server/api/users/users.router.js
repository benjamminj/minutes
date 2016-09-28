let express = require('express');

let router = express.Router();
let controller = require('./users.controller');
let passport = require('passport');

router.post('/login', 
	passport.authenticate('local', {
		// TO DO -- figure out WHERE  to redirect
		successRedirect: '/users/login/me',
		failureRedirect: '/users/login/unauthorized',
	})
);

router.get('/login/unauthorized', controller.unauthorized);
router.get('/login/me', controller.me);
router.post('/signup', controller.signup);

module.exports = router;