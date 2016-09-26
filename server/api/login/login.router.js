let express = require('express');

let router = express.Router();
let controller = require('./login.controller');
let passport = require('passport');

router.post('/', 
	passport.authenticate('local', {
		successRedirect: '/login/me',
		failureRedirect: '/login/unauthorized',
	})
);

router.get('/unauthorized', controller.unauthorized);
router.get('/me', controller.me);

module.exports = router;