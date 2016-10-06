$(document).ready(() => {
  $('#login-form').submit((event) => {
    event.preventDefault();
    var request = { username: $('#username').val(), password: $('#password').val()};
    
    loginRequest(request);
  });

  $('#signup-form').submit((event) => {
    event.preventDefault();
    let request = {username: $('#create-username').val(), password: $('#create-password').val()};

    $.post(`${API_URL}user/signup`, request)
      .done(() => {
        loginRequest(request);
      });
  });

  function loginRequest(request) {

    $.post(`${API_URL}user/login`, request)
      .done(() => {
        window.location = `${API_URL}dashboard`;
      });
  }
});
