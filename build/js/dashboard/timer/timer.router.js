let utils = require('../dashboard.utils')();

module.exports = (apiURL) => {

  return (time) => {
    let url = apiURL + 'tasks/create';
    let title = utils.getValue('.timer-save .title') || undefined;
    let description = utils.getValue('.timer-save .description');

    let data = { title: title, date: new Date(Date.now()), time: time, description: description };

    return $.post(url, data);
  };
};
