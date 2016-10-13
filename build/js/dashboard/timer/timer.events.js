let timer = require('./timer');
let utils = require('../dashboard.utils')();
let generate = require('./timer.html');

module.exports = (apiURL) => {
  let $container = $('#timer-container');


  $container.on('click', '.timer .start', function() {

    $('#timer-container .start').addClass('stop').removeClass('start').html('Stop');

    timer.start(function(currentTime) {
      let $hours = $('.timer .hours');
      let $minutes = $('.timer .minutes');
      let $seconds = $('.timer .seconds');

      if (currentTime % 360 === 0) {
        increaseTimerHTML($hours);
        $minutes.html('00');
        $seconds.html('00');
      } else if (currentTime % 60 === 0) {
        increaseTimerHTML($minutes);
        $seconds.html('00');
      } else {
        increaseTimerHTML($seconds);
      }

      function increaseTimerHTML($element) {
        let elementValuePlusOne = parseInt($element.html()) + 1;
        $element.html(utils.addLeadingZeroes(elementValuePlusOne));
      }
    });
  });

  $container.on('click', '.timer .stop', function() {
    timer.stop();

    // Makes sure that the time >= 1 before activating the 'Save' button
    if (timer.timeInSeconds > 0) {
      $('#timer-container .save').addClass('active');
    }

    $(this).addClass('start').removeClass('stop').html('Start');
  });

  $container.on('click', '.timer .save.active', function() {
    var seconds = timer.end();

    $container.html(generate.timerSaveHTML(seconds));
  });

  $container.on('submit', '#save-task', (event) => {
    let timeInSeconds = timer.end();
    let getTasks = require('../tasks/tasks.router')(apiURL).getTasks;

    timer.reset();
    event.preventDefault();

    let createTask = require('./timer.router')(apiURL);
    createTask(timeInSeconds)
      .then(() => {
        $container.hide().siblings('#tasks-container').show();
        toggleNav();
        getTasks();
      });
  });

  function toggleNav() {
    utils.toggleNav($('.my-tasks'));
  }

  $container.on('click', '.cancel-save', (event) => {
    event.preventDefault();
    timer.reset();
    toggleNav();
    $container.hide().siblings('#tasks-container').show();
  });
};
