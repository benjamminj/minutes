/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var apiURL = '//localhost:5000/';
	
	// let ajax = require('./ajax')(apiURL);
	
	$(document).ready(function () {
	  __webpack_require__(6)(apiURL);
	  __webpack_require__(9)(apiURL);
	  // require('./event.handlers.js')(ajax);
	
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (rootURL) {
	  return {
	    getValue: function getValue(selector) {
	      return $(selector).val();
	    },
	    emptyForm: function emptyForm(formElements) {
	      formElements.forEach(function (element) {
	        $(element).val('');
	      });
	    },
	    redirectToLogin: function redirectToLogin() {
	      window.location = rootURL;
	    },
	    addLeadingZeroes: function addLeadingZeroes(number) {
	      return ('0' + number).slice(-2);
	    }
	  };
	};

/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(7);
	var generate = __webpack_require__(8);
	
	module.exports = function (apiURL) {
	  var getTasks = __webpack_require__(11)(apiURL).getTasks;
	  // header
	  $('#nav-buttons .my-tasks').click(function () {
	    // TO DO -- add the close prompt if the timer is running. Otherwise just load the page.
	    timer.reset();
	    getTasks();
	    $('#timer-container').hide().siblings('#tasks-container').show();
	  });
	
	  // header
	  $('#nav-buttons .new-task').click(function () {
	    $('#tasks-container').hide();
	    $('#timer-container').show().html(generate.timerHTML());
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  timeInSeconds: 0,
	  isRunning: false,
	  reset: function reset() {
	    this.timeInSeconds = 0;
	    this.isRunning = false;
	    this.stop();
	  },
	  start: function start(callback) {
	    if (!this.isRunning) {
	      this.isRunning = true;
	      this.intervalID = setInterval(function () {
	        this.timeInSeconds += 1;
	        callback(this.timeInSeconds);
	      }.bind(this), 1000);
	    }
	  },
	  pause: function pause() {
	    this.isRunning = false;
	    clearInterval(this.intervalID);
	  },
	  stop: function stop() {
	    this.pause();
	    return this.timeInSeconds;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3)();
	
	module.exports = {
	  timerHTML: function timerHTML() {
	    return '\n      <button class="cancel">\n        <i class="fa fa-times" aria-hidden="true"></i>\n      </button>\n      <div class="timer">\n        <h2>\n          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>\n        </h2>\n        <button class="start">Start</button>\n        <button class="stop">Stop</button>\n      </div>\n    ';
	  },
	  divideTimeHTML: function divideTimeHTML(time) {
	    var pad = utils.addLeadingZeroes;
	
	    var hours = pad(divideTime(time, 360));
	    var minutes = pad(divideTime(time - hours * 360, 60));
	    var seconds = pad(divideTime(time - hours * 360 - minutes * 60));
	
	    function divideTime(initialTime) {
	      var division = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	      return Math.floor(initialTime / division);
	    }
	
	    return '<span class="hours">' + hours + '</span>:<span class="minutes">' + minutes + '</span>:<span class="seconds">' + seconds + '</span>';
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(10);
	
	module.exports = function (apiURL) {
	  var ajax = __webpack_require__(11)(apiURL);
	  ajax.getTasks();
	
	  $('#tasks-container').on('click', '.task .edit', function () {
	    var task = $(this).parent();
	    var html = generate.editTaskHTML(task);
	    $(task).html(html);
	  });
	
	  $('#tasks-container').on('click', '.task .save-changes', function () {
	    var task = $(this).parent();
	
	    ajax.editTask(task, function (err, editedTask) {
	      if (editedTask) {
	        task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
	      }
	    });
	  });
	
	  $('#tasks-container').on('click', '.cancel-changes', function () {
	    var task = $(this).parent();
	
	    // TODO -- update ajax.getOneTask to utilize full callback
	    ajax.getTasks();
	  });
	
	  $('#tasks-container').on('click', '.task .delete', function () {
	    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
	    ajax.deleteTask($(this).parent().attr('id'));
	  });
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timeHTML = __webpack_require__(8);
	
	module.exports = {
	  editTaskHTML: function editTaskHTML(task) {
	    var currentTitle = task.children('.title').html();
	    var currentDescription = task.children('.description').html() || 'Add a description';
	    var time = task.children('.time').html();
	    var date = task.children('.date').html();
	
	    return '\n      <input type="text" class="title" placeholder="' + currentTitle + '">\n      <h4 class="date">' + date + '</h4>\n      <h4 class="time">' + time + '</h4>\n      <input type="text" class="description" placeholder="' + currentDescription + '">\n      <button class="cancel-changes">Cancel Changes</button>\n      <button class="save-changes">Save Changes</button>\n    ';
	  },
	  taskHTML: function taskHTML(task) {
	    return '\n      <div class="task" id="' + task._id + '">\n        ' + this.innerTaskHTML(task.title, task.date, task.time, task.description) + '\n      </div>\n    ';
	  },
	  innerTaskHTML: function innerTaskHTML(title, date, time, description) {
	    if (!description) {
	      description = '';
	    }
	
	    return '\n      <h3 class="title">' + title + '</h3>\n      <h4 class="date">' + date + '</h4>\n      <h4 class="time">' + timeHTML.divideTimeHTML(time) + '</h4>\n      <p class="description">' + description + '</p>\n      <button class="edit">Edit</button>\n      <button class="delete">Delete</button>\n    ';
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(10);
	
	module.exports = function (apiURL) {
	  var utils = __webpack_require__(3)(apiURL);
	
	  return {
	    getTasks: function getTasks() {
	      var url = apiURL + 'tasks/';
	      $.getJSON(url).done(function (tasks) {
	        if (!tasks.length) {
	          $('#tasks-container').append('<p>It looks like you haven\'t created any tasks yet. Start tracking time today</p>');
	        }
	
	        $('#tasks-container').html('');
	        tasks.forEach(function (task) {
	          // Change html to be a ul
	          $('#tasks-container').append(generate.taskHTML(task));
	        });
	      }).fail(function (err) {
	        // Eventually need to do something to handle this on the frontend?
	        console.log('Oh no!', err);
	        utils.redirectToLogin();
	      });
	    },
	    editTask: function editTask(task, callback) {
	      var id = task.attr('id');
	      var title = task.children('.title').val() || undefined;
	      var description = task.children('.description').val() || undefined;
	
	      $.ajax({
	        url: apiURL + 'tasks/edit/' + id,
	        type: 'PUT',
	        data: { title: title, description: description }
	      }).done(function (editedTask) {
	        callback(null, editedTask);
	      }).fail(function (err) {
	        callback(err);
	      });
	    },
	    deleteTask: function deleteTask(id) {
	      var url = apiURL + 'tasks/delete/' + id;
	
	      $.ajax({
	        url: url,
	        type: 'DELETE'
	      }).done(function () {
	        $('#' + id).remove();
	      });
	    }
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map