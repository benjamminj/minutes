let utils = require('../utils')();

module.exports = () => {
  return (time, callback) => {
    let url = '/tasks/create';
    let title = utils.getValue('.timer-save .title') || undefined;
    let description = utils.getValue('.timer-save .description');

    let data = {
      title,
      date: new Date(Date.now()),
      time,
      description
    };

    $.post(url, data)
      .done((task) => {
        callback(null, task);
      })
      .fail((err) => {
        callback(err);
      });
  };
};
