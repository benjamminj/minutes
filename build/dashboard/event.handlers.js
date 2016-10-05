let generateHTML = require('./html.generator');
let timer = require('./timer');
let utils = require('./utils')();

module.exports = function(ajax) {

  $('#nav-buttons .my-tasks').click(function() {
    // TO DO -- add the close prompt if the timer is running. Otherwise just load the page.
    timer.reset();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  $('#nav-buttons .new-task').click(function() {
    $('#tasks-container').hide();
    $('#timer-container').show().html(generateHTML.timerHTML());
  });

  $('#tasks-container').on('click', '.task .edit', function() {
    let task = $(this).parent();
    let html = generateHTML.editTaskHTML(task);
    $(task).html(html);
  });

  $('#tasks-container').on('click', '.task .save-changes', function() {
    let task = $(this).parent();

    ajax.editTask(task, function(err, editedTask) {
      if (editedTask) {
        task.html(generateHTML.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
      }
    });
  });

  $('#tasks-container').on('click', '.cancel-changes', function() {
    let task = $(this).parent();

    // TODO -- update ajax.getOneTask to utilize full callback
    ajax.getOneTask(task.attr('id'), function(data) {
      let html = generateHTML.innerTaskHTML(data.title, data.date, data.time, data.description);
      task.html(html);
    });
  });

  $('#tasks-container').on('click', '.task .delete', function() {
    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
    ajax.deleteTask($(this).parent().attr('id'));
  });

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

  $('#timer-container').on('click', '.timer .pause', function() {
    timer.pause();
    $('#timer-container .pause').addClass('start').removeClass('pause').html('Start');
  });

  $('#timer-container').on('click', '.timer .stop', function() {
    var seconds = timer.stop();

    $('#timer-container').html(generateHTML.timerSaveHTML(seconds));
  });

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

  $('#timer-container').on('click', '.cancel-save', (event) => {
    event.preventDefault();
    timer.reset();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  // Timer close prompt
  $('#timer-container').on('click', '.cancel', () => {
    $('#timer-container').append(generateHTML.timerClosePromptHTML());
  });

  $('#timer-container').on('click', '.timer-close-prompt .yes', () => {
    timer.reset();
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  $('#timer-container').on('click', '.timer-close-prompt .no', () => {
    $('#timer-container .timer-close-prompt').hide();
  });
};
