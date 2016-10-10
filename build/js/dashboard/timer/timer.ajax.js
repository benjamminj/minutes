let utils = require('../utils')();

module.exports = (apiURL) => {

  return (time, callback) => {
    let url = apiURL + 'tasks/create';
    let title = utils.getValue('.timer-save .title') || undefined;
    let description = utils.getValue('.timer-save .description');
    // console.log(description.replace('/\n/g, <br>'));
    let data = { title: title, date: new Date(Date.now()), time: time, description: description };

    $.post(url, data)
      .done((task) => {
        callback(null, task);
      })
      .fail((err) => {
        callback(err);
      });
  };
};