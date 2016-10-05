let generateHTML = require('./html.generator');
let timer = require('./timer');
let utils = require('./utils')();

module.exports = function(ajax) {

  // Timer
  $('#timer-container').on('click', '.timer .start', function() {

    $('#timer-container .start').addClass('pause').removeClass('start').html('Pause');

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

  // Timer
  $('#timer-container').on('click', '.timer .pause', function() {
    timer.pause();
    $('#timer-container .pause').addClass('start').removeClass('pause').html('Start');
  });

  // Timer
  $('#timer-container').on('click', '.timer .stop', function() {
    var seconds = timer.stop();

    $('#timer-container').html(generateHTML.timerSaveHTML(seconds));
  });

  // Timer
  $('#timer-container').on('submit', '#save-task', (event) => {
    let timeInSeconds = timer.stop();
    timer.reset();
    event.preventDefault();

    ajax.createNewTask(timeInSeconds, (err, task) => {
      $('#timer-container').hide().siblings('#tasks-container').show();

      ajax.getOneTask(task._id, (err, task) => {
        // TO DO -- add error handler
        $('#tasks-container').prepend(generateHTML.taskHTML(task));
      });

    });
  });

  // Timer
  $('#timer-container').on('click', '.cancel-save', (event) => {
    event.preventDefault();
    timer.reset();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  // Timer 
  $('#timer-container').on('click', '.cancel', () => {
    $('#timer-container').append(generateHTML.timerClosePromptHTML());
  });

  // Timer 
  $('#timer-container').on('click', '.timer-close-prompt .yes', () => {
    timer.reset();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  // Timer 
  $('#timer-container').on('click', '.timer-close-prompt .no', () => {
    $('#timer-container .timer-close-prompt').hide();
  });
};
