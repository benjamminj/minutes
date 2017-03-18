let Controller = {};

Controller.login = (request) => {
  $.post(`${API_URL}user/login`, request)
    .done(() => {
      window.location = `${API_URL}dashboard/#tasks-container`;
    });
};

module.exports = Controller;
