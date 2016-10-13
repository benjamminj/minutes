let generate = require('./tasks.html');
let onClick = require('../../utils/on.click');
let toggleScroll = require('../../utils/no.scroll');


module.exports = (apiURL) => {
  let router = require('./tasks.router')(apiURL);
  let $container = $('#tasks-container');

  router.getTasks();

  containerClick('.more', function() {
    $(this).siblings('.more-actions, .page-overlay').toggleClass('open');
    toggleScroll();
  });

  function containerClick(child, callback) {
    return onClick($container, child, callback);
  }

  containerClick('.page-overlay.open', function() {
    $(this).toggleClass('open').siblings('.more-actions').toggleClass('open');
    toggleScroll();
  });

  containerClick('.edit', function() {
    let task = $(this).parents('.task');
    let html = generate.editTaskHTML(task);
    
    $('.more-actions').html(html).toggleClass('editing');
  });

  containerClick('.task .save-changes', function() {
    let $task = $(this).parents('.task');
    let $editContainer = $(this).parents('.more-actions');
    let id = $task.attr('id');

    // TO DO -- refactor so that takes an object as second arg. { title: ___, desc: ____ }
    router.editTask(id, $editContainer, function(err, editedTask) {
      if (editedTask) {
        $task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));     
        toggleScroll();
      }
    });
  });

  containerClick('.cancel-changes', function() {
    // let task = $(this).parent();

    // TODO -- update router.getOneTask to utilize full callback
    router.getTasks();
    toggleScroll();
  });

  containerClick('.delete', function() {
    // TODO -- refactor router.delete to separate the router call from the DOM manipulation
    router.deleteTask($(this).parents('.task').attr('id'));
    toggleScroll();
  });
};