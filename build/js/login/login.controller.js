let Controller = {};

Controller.login = (request) => {
  $.post(`/user/login`, request)
    .done(() => {
      window.location = `/dashboard/#tasks-container`;
    })
    .fail(() => {
      const $usernameLabel = $('label[for="username"]')
      $usernameLabel.addClass('error')
      $usernameLabel.html('Invalid username or password. Please try logging in again')
    })
};

module.exports = Controller;
