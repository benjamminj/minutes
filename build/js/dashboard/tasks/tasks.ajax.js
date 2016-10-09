let generate = require('./tasks.html');

module.exports = (apiURL) => {
  let utils = require('../utils')(apiURL);

  return {
    getTasks() {
      let url = apiURL + 'tasks/';
      $.getJSON(url)
        .done(function(tasks) {
          $('#tasks-container').html('');

          if (!tasks.length) {
            $('#tasks-container').append('<p>It looks like you haven\'t created any tasks yet. Start tracking time today</p>');
          }

          tasks.forEach(function(task) {
            $('#tasks-container').append(generate.taskHTML(task));
          });
        }).fail(function() {
          utils.redirectToLogin();
        });
    },

    editTask(id, edits, callback) {
      
      let title = edits.children('.title').val() || undefined;
      let description = edits.children('#edit-description').val() || undefined;

      $.ajax({
        url: `${apiURL}tasks/edit/${id}`,
        type: 'PUT',
        data: { title: title, description: description }
      }).done(function(editedTask) {
        callback(null, editedTask);
      }).fail(function(err) {
        callback(err);
      });
    },

    deleteTask(id) {
      var url = `${apiURL}tasks/delete/${id}`;

      $.ajax({
        url: url,
        type: 'DELETE',
      }).done(() => {
        $(`#${id}`).remove();
      });
    },
  };
};