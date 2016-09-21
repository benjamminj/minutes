let express = require('express');
let bodyParser = require('body-parser');

module.exports = function(app) {

	app.use(express.static('public/login'));
	app.use(bodyParser.json());
};