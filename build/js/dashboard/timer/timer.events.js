let timer = require('./timer');
let utils = require('../utils')();
let generate = require('./timer.html');

function goToTasksView () {
  window.location.hash = '#tasks-container';
}

function removeTimerSaveHTML ($container) {
  $container.find('.timer-save').remove();
}

function resetClock ($container) {
  timer.reset();

  const $time = $container.find('.time');
  $time.find('.hours, .minutes, .seconds').html('00');
}

module.exports = (apiURL) => {
  let $container = $('#timer-container');
  let createTask = require('./timer.ajax')(apiURL);

  $container.on('click', '.timer .start', function() {

    $('#timer-container .start').addClass('stop').removeClass('start').html('Stop');

    timer.start(function(currentTime) {

      if (currentTime % 360 === 0) {
        increaseTimerHTML('.timer .hours');
      } else if (currentTime % 60 === 0) {
        increaseTimerHTML('.timer .minutes');
      } else {
        increaseTimerHTML('.timer .seconds');
      }

      function increaseTimerHTML(selector) {
        let selectorValuePlusOne = parseInt($(selector).html()) + 1;
        $(selector).html(utils.addLeadingZeroes(selectorValuePlusOne));
      }
    });
  });

  $container.on('click', '.timer .stop', function() {
    timer.stop();

    // New
    if (timer.timeInSeconds > 0) {
      $('#timer-container .save').addClass('active');
    }

    $(this).addClass('start').removeClass('stop').html('Start');
  });

  $container.on('click', '.timer .save.active', function() {
    var seconds = timer.end();

    $container.append(generate.timerSaveHTML(seconds));
  });

  $container.on('submit', '#save-task', (event) => {
    let timeInSeconds = timer.end();
    let getTasks = require('../tasks/tasks.ajax')(apiURL).getTasks;

    resetClock($container);
    event.preventDefault();

    createTask(timeInSeconds, () => {
      removeTimerSaveHTML($container);
      goToTasksView();
      getTasks();
    });
  });

  $container.on('click', '.cancel-save', (event) => {
    event.preventDefault();
    resetClock($container);
    removeTimerSaveHTML($container);
    goToTasksView();
  });
};
