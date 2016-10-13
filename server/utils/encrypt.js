let bcrypt = require('bcrypt');
let createError = require('./create.error');

module.exports = function(string) {

  return new Promise(function(resolve, reject) {
    let saltRounds = 10;

    bcrypt.hash(string, saltRounds, function(err, hash) {
      if (err) {
        reject(createError('EncryptionError', err.message, 500));
      } else {
        resolve(hash);
      }
    });
  });
};
