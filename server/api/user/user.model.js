let mongoose = require('mongoose');
let createError = require('../../utils/create.error');
let bcrypt= require('bcrypt');

let UserSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return !/[^A-Za-z0-9_@.]/g.test(value);
      },
      message: 'Value "{VALUE}" must be alphanumeric at path "{PATH}"'
    }
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.methods.validatePassword = function(password) {
  let correctPassword = this.password;
  let user = this;
  
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, correctPassword, function(err, isValid) {
      if (err) {
        reject(createError('ValidationError', err.message, 400));
      } else if (isValid) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = mongoose.model('User', UserSchema);



