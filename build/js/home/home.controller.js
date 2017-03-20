const { login } = require('../login/login.controller');

const $usernameLabel = $('label[for="signup-username"]');
const $passwordLabel = $('label[for="signup-password"]');

function handleInvalidUsername(err) {
  if (err.status === 400 && /Path \`username\` is required/.test(err.responseText)) {
    $usernameLabel.addClass('error');
    $usernameLabel.html('Invalid username');
  }
}

function handleDuplicateUsername(err) {
  if (err.status === 400 && /E11000/.test(err.responseJSON.message)) {
    $usernameLabel.addClass('error');
    $usernameLabel.html('This username already exists.');
  }
}

function handleInvalidPassword(err) {
  if (err.status === 500 && /EncryptionError/.test(err.responseJSON.name)) {
    $passwordLabel.addClass('error');
    $passwordLabel.html('Invalid password');
  }
}

module.exports = {
  signup({ username, password }) {
    $.ajax('/user/signup', {
      method: 'POST',
      data: {
        username,
        password
      }
    })
    .done(() => {
      login({ username, password });
    })
    .fail(err => {
      handleDuplicateUsername(err);
      handleInvalidUsername(err);
      handleInvalidPassword(err);
    });
  }
};
