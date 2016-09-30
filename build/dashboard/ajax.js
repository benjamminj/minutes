let generateTaskHTML = require('./html.generator');

module.exports = function(rootURL) {
  let utils = require('./utils')(rootURL);

  return {
    loadTasks() {
      let url = rootURL + 'tasks/';
      $.getJSON(url)
        .done(function(tasks) {
          if (!tasks.length) {
            // Put some sort of prompt to create something if the user doesn't have anything
            // Put in its own html section
            $('#tasks-list').append('<p>It looks like you haven\'t created any tasks yet. Start tracking time today</p>');
          }
          tasks.forEach(function(task) {
            // Change html to be a ul
            $('#tasks-list').append(generateTaskHTML(task));
          });
        })
        .fail(function(err) {
          // Eventually need to do something to handle this on the frontend?
          console.log('Oh no!', err);
          utils.redirectToLogin();
        });
    },

    createNewTask() {
      let url = rootURL + 'tasks/create';
      let title = utils.getValue('#new-task #title') || undefined;
      let description = utils.getValue('#new-task #description');
      let time = utils.getValue('#new-task #time');
      let data = { title: title, date: new Date(Date.now()), time: time, description: description };

      utils.emptyForm(['#new-task #title', '#new-task #time', '#new-task #description']);
      $.post(url, data)
        .done(function(task) {
          $('#tasks-list').append(generateTaskHTML(task));
        })
        .fail(function(err) {
          console.log(err);
        });
    },

    deleteTask(id) {
      var url = rootURL + 'tasks/delete/' + id;

      $.ajax({
        url: url,
        type: 'DELETE',
      }).done(function(result) {
        $('#' + id).remove();
      }).fail(function(err) {
        console.log('Oh no! Delete request went bad!');
      });
    }
  };
};
