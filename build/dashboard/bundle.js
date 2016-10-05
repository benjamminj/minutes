var apiURL = '//localhost:5000/';

// let ajax = require('./ajax')(apiURL);

$(document).ready(function() {
  require('./header/header.events')(apiURL);
  require('./tasks/tasks.events')(apiURL);
  require('./timer/timer.events')(apiURL);
  // require('./event.handlers.js')(ajax);



  
});
