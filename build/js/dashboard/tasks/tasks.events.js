let generate = require('./tasks.html');
let onClick = require('../../utils/on.click');
let toggleScroll = require('../../utils/no.scroll');

module.exports = (apiURL) => {
  let ajax = require('./tasks.ajax')(apiURL);
  let $container = $('#tasks-container');

  ajax.getTasks();

  containerClick('.more', function() {
    $(this).siblings('.actions, .page-overlay').toggleClass('open');
    toggleScroll();
  });

  function containerClick(child, callback) {
    return onClick($container, child, callback);
  }

  containerClick('.page-overlay.open', function() {
    $(this).toggleClass('open').siblings('.actions').toggleClass('open');
    toggleScroll();
  });

  containerClick('.edit', function() {
    let $task = $(this).parents('.task');
    let html = generate.editTaskHTML($task);

    $task.find('.task-content').html(html);
    // $('.more-actions').html(html).toggleClass('editing');
  });

  containerClick('.task .task-edit-save', function() {
    let $task = $(this).parents('.task');
    let $editContainer = $(this).parents('.task-edit');
    let id = $task.attr('id');

    // TO DO -- refactor so that takes an object as second arg. { title: ___, desc: ____ }
    ajax.editTask(id, $editContainer, function(err, editedTask) {
      if (editedTask) {
        $task.html(generate.innerTaskHTML(editedTask));
        toggleScroll();
      }
    });
  });

  containerClick('.delete-btn', function() {
    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
    ajax.deleteTask($(this).parents('.task').attr('id'));
    toggleScroll();
  });
};
