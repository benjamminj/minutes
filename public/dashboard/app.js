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
	var generateTaskHTML = __webpack_require__(2);
	var ajax = __webpack_require__(3)(rootURL);
	
	$(document).ready(function () {
	  ajax.loadTasks();
	
	  $('#new-task').submit(function (event) {
	    event.preventDefault();
	    ajax.createNewTask();
	  });
	
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
	
	module.exports = function (task) {
	
	  return '<div class="task" id="' + task._id + '"><h3>' + task.title + '</h3><button class="edit-title">Edit Title</button><h4>' + task.date + '</h4><h4>' + task.time + '</h4><p>' + task.description + '</p><button class="edit-desc">Edit Description</button><button class="delete">Delete</button></div>';
	
	  return '\n  <div class="task" id="' + task.id + '">\n  \t<h3>' + task.title + '</h3>\n  \t<button class="edit-title">Edit Title</button>\n  \t<h4>' + task.date + '</h4>\n  \t<h4>' + task.time + '</h4>\n  \t<p>task.description</p>\n  \t<button class="edit-description">Edit Description</button>\n  \t<button class="delete">Delete</button>\n\t</div>\n\t';
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateTaskHTML = __webpack_require__(2);
	
	module.exports = function (rootURL) {
	  var utils = __webpack_require__(4)(rootURL);
	
	  return {
	    loadTasks: function loadTasks() {
	      var url = rootURL + 'tasks/';
	      $.getJSON(url).done(function (tasks) {
	        if (!tasks.length) {
	          // Put some sort of prompt to create something if the user doesn't have anything
	          // Put in its own html section
	          $('#tasks-list').append('<p>It looks like you haven\'t created any tasks yet. Start tracking time today</p>');
	        }
	        tasks.forEach(function (task) {
	          // Change html to be a ul
	          $('#tasks-list').append(generateTaskHTML(task));
	        });
	      }).fail(function (err) {
	        // Eventually need to do something to handle this on the frontend?
	        console.log('Oh no!', err);
	        utils.redirectToLogin();
	      });
	    },
	    createNewTask: function createNewTask() {
	      var url = rootURL + 'tasks/create';
	      var title = utils.getValue('#new-task #title') || undefined;
	      var description = utils.getValue('#new-task #description');
	      var time = utils.getValue('#new-task #time');
	      var data = { title: title, date: new Date(Date.now()), time: time, description: description };
	
	      utils.emptyForm(['#new-task #title', '#new-task #time', '#new-task #description']);
	      $.post(url, data).done(function (task) {
	        $('#tasks-list').append(generateTaskHTML(task));
	      }).fail(function (err) {
	        console.log(err);
	      });
	    },
	    deleteTask: function deleteTask(id) {
	      var url = rootURL + 'tasks/delete/' + id;
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map