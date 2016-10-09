let generate = require('./tasks.html');
let onClick = require('../../utils/on.click');

module.exports = (apiURL) => {
  let ajax = require('./tasks.ajax')(apiURL);
  let $container = $('#tasks-container');

  ajax.getTasks();

  $container.on('click', '.more', function() {
    console.log('We got a click!');

    $(this).siblings('.more-actions, .page-overlay').toggleClass('open');
    $('body').toggleClass('no-scroll');
  });

  onClick($container, '.page-overlay.open', function() {
    $(this).toggleClass('open').siblings('.more-actions').toggleClass('open');
    $('body').toggleClass('no-scroll');
  });

  $container.on('click', '.edit', function() {
    let task = $(this).parents('.task');

    console.log('task', task);
    let html = generate.editTaskHTML(task);
    
    $('.more-actions').html(html);
  });

  $container.on('click', '.task .save-changes', function() {
    let $task = $(this).parents('.task');
    let $editContainer = $(this).parent();

    console.log($task.attr('id'))
    ajax.editTask($task.attr('id'), $editContainer, function(err, editedTask) {
      if (editedTask) {
        $task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
      }
    });
  });

  $container.on('click', '.cancel-changes', function() {
    let task = $(this).parent();

    // TODO -- update ajax.getOneTask to utilize full callback
    ajax.getTasks();
  });

  $container.on('click', '.delete', function() {
    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
    ajax.deleteTask($(this).parents('.task').attr('id'));
  });
};