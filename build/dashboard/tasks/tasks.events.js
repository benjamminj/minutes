let generate = require('./tasks.html');


module.exports = (apiURL) => {
  let ajax = require('./tasks.ajax')(apiURL);
  ajax.getTasks();

  $('#tasks-container').on('click', '.task .edit', function() {
    let task = $(this).parent();
    let html = generate.editTaskHTML(task);
    $(task).html(html);
  });

  $('#tasks-container').on('click', '.task .save-changes', function() {
    let task = $(this).parent();

    ajax.editTask(task, function(err, editedTask) {
      if (editedTask) {
        task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
      }
    });
  });

  $('#tasks-container').on('click', '.cancel-changes', function() {
    let task = $(this).parent();

    // TODO -- update ajax.getOneTask to utilize full callback
    ajax.getTasks();
  });

  $('#tasks-container').on('click', '.task .delete', function() {
    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
    ajax.deleteTask($(this).parent().attr('id'));
  });
};