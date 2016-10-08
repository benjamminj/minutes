let generate = require('./tasks.html');


module.exports = (apiURL) => {
  let ajax = require('./tasks.ajax')(apiURL);
  let $container = $('#tasks-container');

  ajax.getTasks();

  $container.on('click', '.more', function() {
    console.log('We got a click!');
    $(this).parent().siblings('.more-actions, .page-overlay').toggleClass('open');
  });

  $container.on('click', '.task .edit', function() {
    let task = $(this).parent();
    let html = generate.editTaskHTML(task);
    $(task).html(html);
  });

  $container.on('click', '.task .save-changes', function() {
    let task = $(this).parent();

    ajax.editTask(task, function(err, editedTask) {
      if (editedTask) {
        task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
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