let timer = require('../timer/timer');
let generate = require('../timer/timer.html');

module.exports = function(apiURL) {
  let getTasks = require('../tasks/tasks.ajax')(apiURL).getTasks;

  $('button.logout').click(function() {
    let url = `${apiURL}user/logout`; 
    console.log(url);

    console.log('button click');
    $.get(url)
      .done(() => {
        window.location = API_URL;
      });
  });

  $('#nav-buttons .my-tasks').click(function() {
    // TO DO -- add the close prompt if the timer is running. Otherwise just load the page.
    timer.reset();
    getTasks();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  // header
  $('#nav-buttons .new-task').click(function() {
    $('#tasks-container').hide();
    $('#timer-container').show().html(generate.timerHTML());
  });
};