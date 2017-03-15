let express = require('express');

let router = express.Router();
let controller = require('./user.controller');
let passport = require('passport');

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/user/login/me',
    failureRedirect: '/user/login/unauthorized',
    failureFlash: true
  })
);

router.get('/login/unauthorized', controller.unauthorized);
router.get('/login/me', controller.me);
router.post('/signup', controller.signup);
router.get('/logout', controller.logout);

module.exports = router;
