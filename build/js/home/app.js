const { signup } = require('./home.controller');

module.exports = () => {
  $(document).ready(() => {
    $('#sign-up-form').submit((ev) => {
      ev.preventDefault();
      const username = $('#signup-username').val() || undefined;
      const password = $('#signup-password').val() || undefined;

      signup({ username, password });
    });
  });
};
