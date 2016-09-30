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
	
	var rootURL = '//localhost:5000/';
	
	var timer = __webpack_require__(1);
	var generateHTML = __webpack_require__(2);
	var ajax = __webpack_require__(3)(rootURL);
	
	$(document).ready(function () {
	  ajax.loadTasks();
	
	  __webpack_require__(5)();
	
	  $('#tasks-list').on('click', 'button.delete', function () {
	    ajax.deleteTask($(this).parent().attr('id'));
	  });
	
	  $('#timer .start').click(function () {
	    timer.start(function (currentTime) {
	      console.log(currentTime);
	    });
	  });
	
	  $('#timer .pause').click(function () {
	    timer.pause();
	  });
	
	  $('#timer .stop').click(function () {
	    var seconds = timer.stop();
	    console.log(seconds);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
		timeInSeconds: 0,
		isRunning: false,
		reset: function reset() {
			this.timeInSeconds = 0;
			this.isRunning = false;
		},
		start: function start(fn) {
			if (!this.isRunning) {
				this.isRunning = true;
				this.intervalID = setInterval(function () {
					this.timeInSeconds += 1;
					fn(this.timeInSeconds);
				}.bind(this), 1000);
			}
		},
		pause: function pause() {
			this.isRunning = false;
			clearInterval(this.intervalID);
		},
		stop: function stop() {
			this.pause();
			var finalTime = this.timeInSeconds;
	
			this.reset();
			return finalTime;
		}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  taskHTML: function taskHTML(task) {
	    return '\n      <div class="task" id="' + task._id + '">\n        ' + this.innerTaskHTML(task) + '\n      </div>\n    ';
	  },
	  innerTaskHTML: function innerTaskHTML(task) {
	    return '\n      <h3 class="title">' + task.title + '</h3>\n      <h4 class="date">' + task.date + '</h4>\n      <h4 class="time">' + task.time + '</h4>\n      <p class="description">' + task.description + '</p>\n      <button class="edit">Edit</button>\n      <button class="delete">Delete</button>\n    ';
	  },
	  editTaskHTML: function editTaskHTML(task) {
	    var currentTitle = task.children('.title').html();
	    var currentDescription = task.children('.description').html();
	    var time = task.children('.time').html();
	    var date = task.children('.date').html();
	
	    return '\n      <input type="text" class="title" value="' + currentTitle + '">\n      <h4 class="date">' + date + '</h4>\n      <h4 class="time">' + time + '</h4>\n      <input type="text" class="description" value="' + currentDescription + '">\n      <button class="cancel-changes">Cancel Changes</button>\n      <button class="save-changes">Save Changes</button>\n    ';
	  },
	  timerHTML: function timerHTML() {
	    return '\n      <div class="timer">\n        <h2>\n          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>\n        </h2>\n        <button>Start</button>\n        <button>Stop</button>\n      </div>\n    ';
	  },
	  timerClosePromptHTML: function timerClosePromptHTML() {
	    return '\n      <div class="timer-close-prompt">\n        <h2>Are you sure you want to end the timer? You will lose any time currently on the clock</h2>\n        <button class="yes">Yes, I would like to cancel this timer</button>\n        <button class="no">No, I want to keep running the timer</button>\n      </div>\n    ';
	  },
	  timerSaveHTML: function timerSaveHTML() {
	    return '\n      <div class="timer-save">\n        <form action="">\n          <input type="text" value="Title">\n          <h4 class="time">\n            <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>\n          </h4>\n          <input type="text" value="Description">\n        </form>\n      </div>\n    ';
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateHTML = __webpack_require__(2);
	
	module.exports = function (apiURL) {
	  var utils = __webpack_require__(4)(apiURL);
	
	  return {
	    loadTasks: function loadTasks() {
	      var url = apiURL + 'tasks/';
	      $.getJSON(url).done(function (tasks) {
	        if (!tasks.length) {
	          // Put some sort of prompt to create something if the user doesn't have anything
	          // Put in its own html section
	          $('#tasks-container').append('<p>It looks like you haven\'t created any tasks yet. Start tracking time today</p>');
	        }
	        tasks.forEach(function (task) {
	          console.log(task);
	          // Change html to be a ul
	          $('#tasks-container').append(generateHTML.taskHTML(task));
	        });
	      }).fail(function (err) {
	        // Eventually need to do something to handle this on the frontend?
	        console.log('Oh no!', err);
	        utils.redirectToLogin();
	      });
	    },
	    createNewTask: function createNewTask() {
	      var url = apiURL + 'tasks/create';
	      var title = utils.getValue('#new-task #title') || undefined;
	      var description = utils.getValue('#new-task #description');
	      var time = utils.getValue('#new-task #time');
	      var data = { title: title, date: new Date(Date.now()), time: time, description: description };
	
	      utils.emptyForm(['#new-task #title', '#new-task #time', '#new-task #description']);
	      $.post(url, data).done(function (task) {
	        $('#tasks-container').append(generateHTML.taskHTML(task));
	      }).fail(function (err) {
	        console.log(err);
	      });
	    },
	    deleteTask: function deleteTask(id) {
	      var url = apiURL + 'tasks/delete/' + id;
	
	      $.ajax({
	        url: url,
	        type: 'DELETE'
	      }).done(function (result) {
	        $('#' + id).remove();
	      }).fail(function (err) {
	        console.log('Oh no! Delete request went bad!');
	      });
	    }
	  };
	};

/***/ },
/* 4 */
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
			}
		};
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ajax = __webpack_require__(3);
	var generateHTML = __webpack_require__(2);
	
	module.exports = function () {
		$('#nav-buttons .my-tasks').click(function () {
			$('#timer-container').hide().siblings('#tasks-container').show();
		});
	
		$('#nav-buttons .new-task').click(function () {
			$('#tasks-container').hide();
			$('#timer-container').show().html(generateHTML.timerHTML());
		});
	
		$('#tasks-container').on('click', '.task .edit', function (event) {
			var task = $(this).parent();
			var html = generateHTML.editTaskHTML(task);
			$(task).html(html);
		});
	
		$('#tasks-container').on('click', '.task .save-changes', function () {
			console.log('changes!');
		});
	
		$('#tasks-container').on('click', '.cancel-changes', function () {
			console.log('cancelled');
			$(task).html();
		});
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map