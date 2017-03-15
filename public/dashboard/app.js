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
	
	__webpack_require__(5)();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
	
	  $(document).ready(function () {
	    __webpack_require__(6)(('//localhost:5000/'));
	    __webpack_require__(12)(('//localhost:5000/'));
	    __webpack_require__(15)(('//localhost:5000/'));
	  });
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(7);
	var generate = __webpack_require__(8);
	var utils = __webpack_require__(9)();
	
	module.exports = function (apiURL) {
	  var getTasks = __webpack_require__(10)(apiURL).getTasks;
	
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
	    utils.toggleNav($(this));
	    $('#timer-container').hide().siblings('#tasks-container').show();
	  });
	
	  // header
	  $('#nav-buttons .new-task').click(function () {
	    $('#tasks-container').hide();
	    utils.toggleNav($(this));
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
	    this.end();
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
	  stop: function stop() {
	    this.isRunning = false;
	    clearInterval(this.intervalID);
	  },
	  end: function end() {
	    this.stop();
	    return this.timeInSeconds;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(9)();
	
	module.exports = {
	  timerHTML: function timerHTML() {
	    return '\n      <div class="timer">\n        <h2 class="time">\n          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>\n        </h2>\n        <div class="timer-buttons">\n          <button class="start">Start</button>\n          <button class="save">Save</button>\n        </div>\n      </div>\n    ';
	  },
	  timerClosePromptHTML: function timerClosePromptHTML() {
	    return '\n      <div class="timer-close-prompt">\n        <h2>Are you sure you want to end the timer? You will lose any time currently on the clock</h2>\n        <button class="yes">Yes, I would like to cancel this timer</button>\n        <button class="no">No, I want to keep running the timer</button>\n      </div>\n    ';
	  },
	  timerSaveHTML: function timerSaveHTML(seconds) {
	    return '\n      <div class="timer-save">\n        <form action="" id="save-task">\n          <h2 class="time">\n            ' + this.divideTimeHTML(seconds) + '\n          </h2>\n          <input type="text" placeholder="Choose a Title" class="title top">\n          <textarea placeholder="Add a Description" class="description bottom" rows="3" cols="50"></textarea>\n          <div class="timer-buttons">\n            <button class="cancel-save">Cancel</button>\n            <button type="submit" class="submit">Save</button>\n          </div>\n        </form>\n      </div>\n    ';
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
	    },
	    toggleNav: function toggleNav($button) {
	      if (!$button.hasClass('current')) {
	        $button.toggleClass('current').siblings().toggleClass('current');
	      }
	    }
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(11);
	
	module.exports = function (apiURL) {
	  var utils = __webpack_require__(9)(apiURL);
	
	  return {
	    getTasks: function getTasks() {
	      var url = apiURL + 'tasks/';
	      $.getJSON(url).done(function (tasks) {
	        $('#tasks-container').html('');
	
	        if (!tasks.length) {
	          $('#tasks-container').append('<h3 id="no-tasks">It looks like you haven\'t created any tasks yet. Click \'New\' to get started.</h3>');
	        }
	
	        tasks.forEach(function (task) {
	          $('#tasks-container').prepend(generate.taskHTML(task));
	        });
	      }).fail(function () {
	        utils.redirectToLogin();
	      });
	    },
	    editTask: function editTask(id, edits, callback) {
	
	      var title = edits.children('.title').val() || undefined;
	      var description = edits.children('#edit-description').val() || undefined;
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timeHTML = __webpack_require__(8);
	
	module.exports = {
	  editTaskHTML: function editTaskHTML(task) {
	    var currentTitle = task.find('.title').html();
	    var currentDescription = task.children('.description').html() || '';
	    var formattedDescription = currentDescription.replace('<br>', '\n');
	    var time = task.children('.time').html();
	    var date = task.find('.date').html();
	
	    return '\n      <input type="text" class="title" value="' + currentTitle + '" placeholder="Title">\n      <!-- <h4 class="date">' + date + '</h4> -->\n      <!-- <h4 class="time">' + time + '</h4> -->\n      <!-- <h4 class="description-heading">Description</h4> -->\n      <textarea name="" id="edit-description" cols="30" rows="4" placeholder="Add a Description">' + formattedDescription + '</textarea>  \n      <div class="edit-buttons">\n        <button class="cancel-changes">Cancel</button>\n        <button class="save-changes">Save</button>        \n      </div>  \n    ';
	  },
	  taskHTML: function taskHTML(task) {
	    return '\n      <div class="task" id="' + task._id + '">\n        ' + this.innerTaskHTML(task.title, task.date, task.time, task.description, task._id) + '\n      </div>\n    ';
	  },
	
	
	  // TO DO -- refactor so that it only takes a single task as an arg.
	  innerTaskHTML: function innerTaskHTML(title, date, time, description) {
	    date = new Date(date).toDateString();
	    if (!description) {
	      description = '';
	    } else {
	      description = description.replace(/\n/g, '<br>');
	    }
	
	    return '\n      <div class="task-heading">\n        <h3 class="title">' + title + '</h3>\n        <button class="more"><i class="fa fa-angle-down" aria-label="More"></i></button>\n        <div class="more-actions">\n          <button class="edit"><i class="fa fa-pencil"></i> Edit</button>\n          <hr>\n          <button class="delete"><i class="fa fa-trash"></i> Delete</button>\n        </div>\n        <div class="page-overlay"></div>\n      </div>\n      <h4 class="date">' + date + '</h4>\n      <h1 class="time">' + timeHTML.divideTimeHTML(time) + '</h4>\n      <p class="description">' + description + '</p>\n    ';
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(11);
	var onClick = __webpack_require__(13);
	var toggleScroll = __webpack_require__(14);
	
	module.exports = function (apiURL) {
	  var ajax = __webpack_require__(10)(apiURL);
	  var $container = $('#tasks-container');
	
	  ajax.getTasks();
	
	  containerClick('.more', function () {
	    $(this).siblings('.more-actions, .page-overlay').toggleClass('open');
	    toggleScroll();
	  });
	
	  function containerClick(child, callback) {
	    return onClick($container, child, callback);
	  }
	
	  containerClick('.page-overlay.open', function () {
	    $(this).toggleClass('open').siblings('.more-actions').toggleClass('open');
	    toggleScroll();
	  });
	
	  containerClick('.edit', function () {
	    var task = $(this).parents('.task');
	    var html = generate.editTaskHTML(task);
	
	    $('.more-actions').html(html).toggleClass('editing');
	  });
	
	  containerClick('.task .save-changes', function () {
	    var $task = $(this).parents('.task');
	    var $editContainer = $(this).parents('.more-actions');
	    var id = $task.attr('id');
	
	    // TO DO -- refactor so that takes an object as second arg. { title: ___, desc: ____ }
	    ajax.editTask(id, $editContainer, function (err, editedTask) {
	      if (editedTask) {
	        $task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
	        toggleScroll();
	      }
	    });
	  });
	
	  containerClick('.cancel-changes', function () {
	    // let task = $(this).parent();
	
	    // TODO -- update ajax.getOneTask to utilize full callback
	    ajax.getTasks();
	    toggleScroll();
	  });
	
	  containerClick('.delete', function () {
	    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
	    ajax.deleteTask($(this).parents('.task').attr('id'));
	    toggleScroll();
	  });
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($selector, child, callback) {
	  $selector.on('click', child, callback);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	  $('body').toggleClass('no-scroll');
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(7);
	var utils = __webpack_require__(9)();
	var generate = __webpack_require__(8);
	
	module.exports = function (apiURL) {
	  var $container = $('#timer-container');
	  var createTask = __webpack_require__(16)(apiURL);
	
	  $container.on('click', '.timer .start', function () {
	
	    $('#timer-container .start').addClass('stop').removeClass('start').html('Stop');
	
	    timer.start(function (currentTime) {
	
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
	
	  $container.on('click', '.timer .stop', function () {
	    timer.stop();
	
	    // New
	    if (timer.timeInSeconds > 0) {
	      $('#timer-container .save').addClass('active');
	    }
	
	    $(this).addClass('start').removeClass('stop').html('Start');
	  });
	
	  $container.on('click', '.timer .save.active', function () {
	    var seconds = timer.end();
	
	    $container.html(generate.timerSaveHTML(seconds));
	  });
	
	  $container.on('submit', '#save-task', function (event) {
	    var timeInSeconds = timer.end();
	    var getTasks = __webpack_require__(10)(apiURL).getTasks;
	
	    timer.reset();
	    event.preventDefault();
	
	    createTask(timeInSeconds, function () {
	      $container.hide().siblings('#tasks-container').show();
	      toggleNav();
	      getTasks();
	    });
	  });
	
	  function toggleNav() {
	    console.log('asdfasdfasdf');
	    utils.toggleNav($('.my-tasks'));
	  }
	
	  $container.on('click', '.cancel-save', function (event) {
	    event.preventDefault();
	    timer.reset();
	    toggleNav();
	    $container.hide().siblings('#tasks-container').show();
	  });
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(9)();
	
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