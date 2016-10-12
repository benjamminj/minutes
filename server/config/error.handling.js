const winston = require('winston');

module.exports = (app) => {

  app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      winston.warn(err);
      res.status(400).json({ name: err.name, errors: err.errors });
    } else if (err.name === 'CastError') {
      winston.warn(err);
      res.status(400).json({ name: err.name, message: err.message });
    } else {
      next(err);
    }
  });

  app.use((err, req, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
      winston.warn(err);
      res.status(400).json({ name: err.name, message: err.message });
    } else {
      next(err);
    }
  });

  app.use((err, req, res, next) => {
    if (err.status === 401) {
      winston.info(err);
      res.status(401).redirect('/users/login');
    } else {
      next(err);
    }
  });

  app.use((err, req, res, next) => {
    if (err) {
      winston.warn(err);
      res.status(err.status).json({ name: err.name, message: err.message });
    }
  });
};
