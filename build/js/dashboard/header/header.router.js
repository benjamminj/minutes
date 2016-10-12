let Router = {

};

Router.getTasks = require('../tasks/tasks.router')(API_URL).getTasks;
Router.logout = function() {
  return $.get(`${API_URL}user/logout`) 
};

module.exports = Router;