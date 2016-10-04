let generateHTML = require('./html.generator');
let timer = require('./timer');

module.exports = function(ajax) {

  $('#nav-buttons .my-tasks').click(function() {
    $('#timer-container').hide().siblings('#tasks-container').show();
  });

  $('#nav-buttons .new-task').click(function() {
    $('#tasks-container').hide();
    $('#timer-container').show().html(generateHTML.timerHTML());
  });

  $('#tasks-container').on('click', '.task .edit', function(event) {
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

  $('#timer-container').on('click', '.timer .start', function() {

    timer.start(function(currentTime) {
      if (currentTime % 360 === 0) {
        increaseTimerHTML('.hours');
      } else if (currentTime % 60 === 0) {
        increaseTimerHTML('.minutes');
      } else {
        increaseTimerHTML('.seconds');
      }

      function increaseTimerHTML(selector) {
        let selectorValuePlusOne = parseInt($(selector).html()) + 1;
        $(selector).html(addLeadingZeroes(selectorValuePlusOne));
      }

      function addLeadingZeroes(number) {
        return ('0' + number).slice(-2);
      }
    });

    $('#timer-container .start').addClass('pause').removeClass('start').html('Pause');

  });

  $('#timer-container').on('click', '.timer .pause', function() {
    timer.pause();
    $('#timer-container .pause').addClass('start').removeClass('pause').html('Start');
  });

  $('#timer-container').on('click', '.timer .stop', function() {
    var seconds = timer.stop();

    $('#timer-container h2').html('<span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>');
    console.log('End', seconds);
  });
};
