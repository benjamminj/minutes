let express = require('express');
let path = require('path');

module.exports = function(app) {

  // Client-side HTML pages
  app.use(express.static('public/home'));
  app.use('/login', express.static('public/login'));
  app.use('/signup', express.static('public/signup'));
  app.use('/dashboard', express.static('public/dashboard'));

  // API Endpoints
  app.use('/tasks', require('../api/tasks/tasks.router'));
  app.use('/user', require('../api/user/user.router'));

  // Catch-all to redirect unknown requests to home page
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/home/index.html'));
  });
};
