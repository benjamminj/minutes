var apiURL = '//localhost:5000/';

let timer = require('./timer');
let generateHTML = require('./html.generator');
let ajax = require('./ajax')(apiURL);





$(document).ready(function() {
	ajax.getTasks();


  require('./event.handlers.js')(ajax);



  
});
