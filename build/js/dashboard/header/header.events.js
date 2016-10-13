let timer = require('../timer/timer');
let generate = require('../timer/timer.html');
let toggleNav = require('../dashboard.utils')().toggleNav;
let toggleScroll = require('../../utils/no.scroll');
let router = require('./header.router');

module.exports = function() {

  let $tasksContainer = $('#tasks-container');
  let $timerContainer = $('#timer-container');

  $('.my-tasks').click(function() {
    timer.reset();
    router.getTasks();
    toggleNav($(this));
    $timerContainer.hide();
    $tasksContainer.show();
  });

  $('.new-task').click(function() {
    $tasksContainer.hide();
    toggleNav($(this));
    $timerContainer.show().html(generate.timerHTML());
  });

  // Make the header dark when the user scrolls past a certain point
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