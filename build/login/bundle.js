let apiURL = '//localhost:5000/';

$(document).ready(() => {

  $('#login-form').submit((event) => {
    event.preventDefault();
    var request = { username: $('#username').val(), password: $('#password').val()};
    
    loginRequest(request);
  });

  $('#signup-form').submit((event) => {
    event.preventDefault();
    let request = {username: $('#create-username').val(), password: $('#create-password').val()};

    $.post(`${apiURL}user/signup`, request, () => {
      console.log('Yay');
    }).done((res) => {
      loginRequest(request)
    }).fail((err) => {
      console.log(err);
    });
  });

  function loginRequest(request) {

    $.post(`${apiURL}user/login`, request, function() {
      console.log('Yay!!!');
    }).done(function(user) {
      window.location =  '//localhost:5000/dashboard';
    });
  }
});
