let controller = require('./signup.controller');

module.exports = () => {

  $(document).ready(() => {
    $('#signup-form').submit((event) => {
      // console.log('here');
      event.preventDefault();
      let request = {username: $('#create-username').val(), password: $('#create-password').val()};

      controller.signup(request);
    });
  });
  
};