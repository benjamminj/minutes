let timer = require('../timer/timer');
let generate = require('../timer/timer.html');
let utils = require('../dashboard.utils')();
let toggleScroll = require('../../utils/no.scroll');

module.exports = function(apiURL) {
  let getTasks = require('../tasks/tasks.router')(apiURL).getTasks;

  $('#nav-buttons .my-tasks').click(function() {
    timer.reset();
    getTasks();
    utils.toggleNav($(this));
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  $('#nav-buttons .new-task').click(function() {
    $('#tasks-container').hide();
    utils.toggleNav($(this));
    $('#timer-container').show().html(generate.timerHTML());
  });

  $('.profile').click(function() {
    $('.profile-display').toggleClass('open');
  });

  $('button.logout').click(function() {
    let url = `${apiURL}user/logout`; 
    
    $.get(url)
      .done(() => {
        window.location = API_URL;
      });
  });
};