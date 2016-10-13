let router = require('./login.router');

module.exports = () => {
  $(document).ready(() => {
    $('#login-form').submit((event) => {
      event.preventDefault();
      var request = { username: $('#username').val(), password: $('#password').val()};
      
      router.login(request)
        .then(() => {
          window.location = `${API_URL}dashboard`;
        }).catch((err) => {
          if (err.status === 401) {
            let message = err.responseJSON.message;
            $('header h3').html(message + '. Please try again').addClass('unauthorized');
          }
        });
    });
  });
};