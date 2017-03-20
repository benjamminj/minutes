let Controller = {};

Controller.login = (request) => {
  $.post(`/user/login`, request)
    .done(() => {
      window.location = `/dashboard/#tasks-container`;
    });
};

module.exports = Controller;
