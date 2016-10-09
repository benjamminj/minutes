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
	
	__webpack_require__(10);
	__webpack_require__(14)();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
	
	  $(document).ready(function () {
	    __webpack_require__(15)(('//localhost:5000/'));
	    __webpack_require__(21)(('//localhost:5000/'));
	    __webpack_require__(23)(('//localhost:5000/'));
	  });
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(16);
	var generate = __webpack_require__(17);
	
	module.exports = function (apiURL) {
	  var getTasks = __webpack_require__(19)(apiURL).getTasks;
	
	  $('button.logout').click(function () {
	    var url = apiURL + 'user/logout';
	    console.log(url);
	
	    console.log('button click');
	    $.get(url).done(function () {
	      window.location = ('//localhost:5000/');
	    });
	  });
	
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(18)();
	
	module.exports = {
	  timerHTML: function timerHTML() {
	    return '\n      <button class="cancel">\n        <i class="fa fa-times" aria-hidden="true"></i>\n      </button>\n      <div class="timer">\n        <h2>\n          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>\n        </h2>\n        <button class="start">Start</button>\n        <button class="stop">Stop</button>\n      </div>\n    ';
	  },
	  timerClosePromptHTML: function timerClosePromptHTML() {
	    return '\n      <div class="timer-close-prompt">\n        <h2>Are you sure you want to end the timer? You will lose any time currently on the clock</h2>\n        <button class="yes">Yes, I would like to cancel this timer</button>\n        <button class="no">No, I want to keep running the timer</button>\n      </div>\n    ';
	  },
	  timerSaveHTML: function timerSaveHTML(seconds) {
	    return '\n      <div class="timer-save">\n        <form action="" id="save-task">\n          <input type="text" placeholder="Choose a Title" class="title">\n          <h4 class="time">\n            ' + this.divideTimeHTML(seconds) + '\n          </h4>\n          <textarea placeholder="Add a Description" class="description" rows="10" cols="50"></textarea>\n          <button class="cancel-save">Cancel</button>\n          <button type="submit">Save</button>\n        </form>\n      </div>\n    ';
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
/* 18 */
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
	    redirectToLogin: function redirectToLogin(location) {
	      window.location = location || rootURL;
	    },
	    addLeadingZeroes: function addLeadingZeroes(number) {
	      return ('0' + number).slice(-2);
	    }
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(20);
	
	module.exports = function (apiURL) {
	  var utils = __webpack_require__(18)(apiURL);
	
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
	    editTask: function editTask(id, edits, callback) {
	
	      var title = edits.children('.title').val() || undefined;
	      var description = edits.children('.description').val() || undefined;
	
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

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timeHTML = __webpack_require__(17);
	
	module.exports = {
	  editTaskHTML: function editTaskHTML(task) {
	    var currentTitle = task.find('.title').html();
	    var currentDescription = task.children('.description').html() || '';
	    var time = task.children('.time').html();
	    var date = task.find('.date').html();
	
	    console.log(currentTitle, currentDescription, time, date);
	
	    return '\n      <input type="text" class="title" placeholder="' + currentTitle + '">\n      <h4 class="date">' + date + '</h4>\n      <h4 class="time">' + time + '</h4>\n      <textarea name="" id="#edit-description" class="description" cols="30" rows="4" placeholder="Add a Description">' + currentDescription + '</textarea>\n      <button class="cancel-changes">Cancel Changes</button>\n      <button class="save-changes">Save Changes</button>\n    ';
	  },
	  taskHTML: function taskHTML(task) {
	    return '\n      <div class="task" id="' + task._id + '">\n        ' + this.innerTaskHTML(task.title, task.date, task.time, task.description, task._id) + '\n      </div>\n    ';
	  },
	  innerTaskHTML: function innerTaskHTML(title, date, time, description) {
	    date = new Date(date).toDateString();
	    if (!description) {
	      description = '';
	    } else {
	      description = description.replace(/\n/g, '<br>');
	    }
	
	    // Move the more-actions div to make the margins work out better?
	    // Maybe move to directly below the task-heading, or directly above the page overlay./
	
	    return '\n      <div class="task-heading">\n        <h3 class="title">' + title + '</h3>\n        <button class="more"><i class="fa fa-angle-down" aria-label="More"></i></button>\n        <div class="more-actions">\n          <button class="edit"><i class="fa fa-pencil"></i> Edit</button>\n          <hr>\n          <button class="delete"><i class="fa fa-trash"></i> Delete</button>\n        </div>\n        <div class="page-overlay"></div>\n      </div>\n      <h4 class="date">' + date + '</h4>\n      <h1 class="time">' + timeHTML.divideTimeHTML(time) + '</h4>\n      <p class="description">' + description + '</p>\n    ';
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(20);
	var onClick = __webpack_require__(22);
	
	module.exports = function (apiURL) {
	  var ajax = __webpack_require__(19)(apiURL);
	  var $container = $('#tasks-container');
	
	  ajax.getTasks();
	
	  $container.on('click', '.more', function () {
	    console.log('We got a click!');
	
	    $(this).siblings('.more-actions, .page-overlay').toggleClass('open');
	    $('body').toggleClass('no-scroll');
	  });
	
	  onClick($container, '.page-overlay.open', function () {
	    $(this).toggleClass('open').siblings('.more-actions').toggleClass('open');
	    $('body').toggleClass('no-scroll');
	  });
	
	  $container.on('click', '.edit', function () {
	    var task = $(this).parents('.task');
	
	    console.log('task', task);
	    var html = generate.editTaskHTML(task);
	
	    $('.more-actions').html(html);
	  });
	
	  $container.on('click', '.task .save-changes', function () {
	    var $task = $(this).parents('.task');
	    var $editContainer = $(this).parent();
	
	    console.log($task.attr('id'));
	    ajax.editTask($task.attr('id'), $editContainer, function (err, editedTask) {
	      if (editedTask) {
	        $task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
	      }
	    });
	  });
	
	  $container.on('click', '.cancel-changes', function () {
	    var task = $(this).parent();
	
	    // TODO -- update ajax.getOneTask to utilize full callback
	    ajax.getTasks();
	  });
	
	  $container.on('click', '.delete', function () {
	    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
	    ajax.deleteTask($(this).parents('.task').attr('id'));
	  });
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($selector, child, callback) {
	  $selector.on('click', child, callback);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(16);
	var utils = __webpack_require__(18)();
	var generate = __webpack_require__(17);
	
	module.exports = function (apiURL) {
	  var $container = $('#timer-container');
	  var createTask = __webpack_require__(24)(apiURL);
	
	  $container.on('click', '.timer .start', function () {
	
	    $('#timer-container .start').addClass('pause').removeClass('start').html('Pause');
	
	    timer.start(function (currentTime) {
	      if (currentTime > 0) {
	        $('#timer-container .stop').addClass('active');
	      }
	
	      if (currentTime % 360 === 0) {
	        increaseTimerHTML('.timer .hours');
	      } else if (currentTime % 60 === 0) {
	        increaseTimerHTML('.timer .minutes');
	      } else {
	        increaseTimerHTML('.timer .seconds');
	      }
	
	      function increaseTimerHTML(selector) {
	        var selectorValuePlusOne = parseInt($(selector).html()) + 1;
	        $(selector).html(utils.addLeadingZeroes(selectorValuePlusOne));
	      }
	    });
	  });
	
	  $container.on('click', '.timer .pause', function () {
	    timer.pause();
	    $('#timer-container .pause').addClass('start').removeClass('pause').html('Start');
	  });
	
	  $container.on('click', '.timer .stop.active', function () {
	    var seconds = timer.stop();
	
	    $container.html(generate.timerSaveHTML(seconds));
	  });
	
	  $container.on('submit', '#save-task', function (event) {
	    var timeInSeconds = timer.stop();
	    var getTasks = __webpack_require__(19)(apiURL).getTasks;
	
	    timer.reset();
	    event.preventDefault();
	
	    createTask(timeInSeconds, function () {
	      $container.hide().siblings('#tasks-container').show();
	      getTasks();
	    });
	  });
	
	  $container.on('click', '.cancel-save', function (event) {
	    event.preventDefault();
	    timer.reset();
	    $container.hide().siblings('#tasks-container').show();
	  });
	
	  $container.on('click', '.cancel', function () {
	    $container.append(generate.timerClosePromptHTML());
	  });
	
	  $container.on('click', '.timer-close-prompt .yes', function () {
	    timer.reset();
	    $container.hide().siblings('#tasks-container').show();
	  });
	
	  $container.on('click', '.timer-close-prompt .no', function () {
	    $('#timer-container .timer-close-prompt').hide();
	  });
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(18)();
	
	module.exports = function (apiURL) {
	
	  return function (time, callback) {
	    var url = apiURL + 'tasks/create';
	    var title = utils.getValue('.timer-save .title') || undefined;
	    var description = utils.getValue('.timer-save .description');
	    // console.log(description.replace('/\n/g, <br>'));
	    var data = { title: title, date: new Date(Date.now()), time: time, description: description };
	
	    $.post(url, data).done(function (task) {
	      callback(null, task);
	    }).fail(function (err) {
	      callback(err);
	    });
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map