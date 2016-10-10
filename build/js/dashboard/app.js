module.exports = () => {

  $(document).ready(function() {
    require('./header/header.events')(API_URL);
    require('./tasks/tasks.events')(API_URL);
    require('./timer/timer.events')(API_URL);
  });
};