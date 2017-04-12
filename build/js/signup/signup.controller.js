let loginRequest = require('../login/login.controller').login;

let Controller = {};

Controller.signup = (request) => {
  $.post(`${API_URL}user/signup`, request)
    .done(() => {
      loginRequest(request);
    })
};

module.exports = Controller;