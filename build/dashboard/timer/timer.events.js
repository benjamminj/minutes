let timer = require('./timer');
let utils = require('../utils')();
let generate = require('./timer.html');


module.exports = (apiURL) => {
  let createTask = require('./timer.ajax')(apiURL);

  $('#timer-container').on('click', '.timer .start', function() {

    $('#timer-container .start').addClass('pause').removeClass('start').html('Pause');

    timer.start(function(currentTime) {
      if (currentTime > 0) {
        $('#timer-container .stop').addClass('active');
      }

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

  $('#timer-container').on('click', '.timer .pause', function() {
    timer.pause();
    $('#timer-container .pause').addClass('start').removeClass('pause').html('Start');
  });

  $('#timer-container').on('click', '.timer .stop.active', function() {
    var seconds = timer.stop();

    $('#timer-container').html(generate.timerSaveHTML(seconds));
  });

  $('#timer-container').on('submit', '#save-task', (event) => {
    let timeInSeconds = timer.stop();
    let getTasks = require('../tasks/tasks.ajax')(apiURL).getTasks;
    
    timer.reset();
    event.preventDefault();

    createTask(timeInSeconds, () => {
      $('#timer-container').hide().siblings('#tasks-container').show();
      getTasks();
    });
  });

  $('#timer-container').on('click', '.cancel-save', (event) => {
    event.preventDefault();
    timer.reset();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  $('#timer-container').on('click', '.cancel', () => {
    $('#timer-container').append(generate.timerClosePromptHTML());
  });

  $('#timer-container').on('click', '.timer-close-prompt .yes', () => {
    timer.reset();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  $('#timer-container').on('click', '.timer-close-prompt .no', () => {
    $('#timer-container .timer-close-prompt').hide();
  });
};