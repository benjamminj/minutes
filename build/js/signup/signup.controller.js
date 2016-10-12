let loginRequest = require('../login/login.router').login;

let Controller = {};

Controller.signup = (request) => {
  $.post(`${API_URL}user/signup`, request)
    .done(() => {
      loginRequest(request);
    });
};

module.exports = Controller;