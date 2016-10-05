let generateHTML = require('./html.generator');

module.exports = function(apiURL) {
  let utils = require('./utils')(apiURL);

  return {
    

    getOneTask(id, callback) {
      let url = `${apiURL}tasks/id${id}`;

      $.getJSON(url)
        .done(function(task) {
          console.log('done!');
          callback(task);
        }).fail(function(err) {
          console.log(err);
        });
    },

    createNewTask(time, callback) {
      let url = apiURL + 'tasks/create';
      let title = utils.getValue('.timer-save .title') || undefined;
      let description = utils.getValue('.timer-save .description');
      let data = { title: title, date: new Date(Date.now()), time: time, description: description };

      $.post(url, data)
        .done(function(task) {
          // Create some sort of clalback system a la Node?
          callback(null, task);
          // $('#tasks-container').append(generateHTML.taskHTML(task));
        })
        .fail(function(err) {
          callback(err);
        });
    },

    
  };
};
