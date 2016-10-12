let timer = require('../timer/timer');
let generate = require('../timer/timer.html');
let utils = require('../dashboard.utils')();
let toggleScroll = require('../../utils/no.scroll');
let router = require('./header.router');

module.exports = function(apiURL) {

  $('#nav-buttons .my-tasks').click(function() {
    timer.reset();
    router.getTasks();
    utils.toggleNav($(this));
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  $('#nav-buttons .new-task').click(function() {
    $('#tasks-container').hide();
    utils.toggleNav($(this));
    $('#timer-container').show().html(generate.timerHTML());
  });

  $(document).scroll(function() {
    let scrollPosition = $(this).scrollTop();
    let $header = $('header');

    if (scrollPosition >= 30) {
      $header.addClass('dark');
    } else {
      $header.removeClass('dark');
    }
  });

  let $profileDisplay = $('.profile-display');
  $('.profile').click(function() {
    $profileDisplay.toggleClass('open');
    toggleScroll();
  });

  $('.page-overlay').click(function() {
    $profileDisplay.toggleClass('open');
    toggleScroll();
  });

  $('button.logout').click(function() {
    router.logout()
      .then(() => {
        window.location = API_URL;
      });
  });
};