let mongoose = require('mongoose');
let winston = require('winston');

module.exports  = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      winston.info(`Connected to MongoDB database ${process.env.DATABASE_URL}`);
    }).catch((err) => {
      console.log('There was an error connecting to MongoDB', err);
    });
  
};
