let controller = require('./login.controller');

module.exports = () => {
  $(document).ready(() => {
    $('#login-form').submit((event) => {
      event.preventDefault();
      var request = { username: $('#username').val(), password: $('#password').val()};
      
      controller.login(request);
      // loginRequest(request);
    });
  });
}