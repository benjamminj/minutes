var express = require('express');

module.exports = function(app) {

	app.use(express.static('public/login'));
};