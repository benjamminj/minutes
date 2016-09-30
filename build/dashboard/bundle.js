var rootURL = '//localhost:5000/';

let timer = require('./timer');
let generateTaskHTML = require('./html.generator');
let ajax = require('./ajax')(rootURL);





$(document).ready(function() {
  ajax.loadTasks();

  $('#new-task').submit(function(event) {
    event.preventDefault();
    ajax.createNewTask();
  });

  $('#tasks-list').on('click', 'button.delete', function() {
    ajax.deleteTask($(this).parent().attr('id'));
  });

  $('#timer .start').click(function() {
    timer.start(function(currentTime) {
      console.log(currentTime);
    });
  });

  $('#timer .pause').click(function() {
    timer.pause();
  });

  $('#timer .stop').click(function() {
    var seconds = timer.stop();
    console.log(seconds);
  });
});
