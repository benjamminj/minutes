let express = require('express');

let router = express.Router();
let controller = require('./login.controller');
let passport = require('passport');

router.post('/', 
	passport.authenticate('local', {
		successRedirect: '/public/home',
		failureRedirect: '/login/unauthorized'
	})
);

module.exports = router;