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
	
	__webpack_require__(14);
	__webpack_require__(18)();

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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
	
	  $(document).ready(function () {
	    __webpack_require__(19)(('https://bjohnson-time-tracker.herokuapp.com/'));
	    __webpack_require__(27)(('https://bjohnson-time-tracker.herokuapp.com/'));
	    __webpack_require__(29)(('https://bjohnson-time-tracker.herokuapp.com/'));
	  });
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(20);
	var generate = __webpack_require__(21);
	var toggleNav = __webpack_require__(22)().toggleNav;
	var toggleScroll = __webpack_require__(23);
	var router = __webpack_require__(24);
	
	module.exports = function () {
	
	  var $tasksContainer = $('#tasks-container');
	  var $timerContainer = $('#timer-container');
	
	  $('.my-tasks').click(function () {
	    timer.reset();
	    router.getTasks();
	    toggleNav($(this));
	    $timerContainer.hide();
	    $tasksContainer.show();
	  });
	
	  $('.new-task').click(function () {
	    $tasksContainer.hide();
	    toggleNav($(this));
	    $timerContainer.show().html(generate.timerHTML());
	  });
	
	  // Make the header dark when the user scrolls past a certain point
	  $(document).scroll(function () {
	    var scrollPosition = $(this).scrollTop();
	    var $header = $('header');
	
	    if (scrollPosition >= 30) {
	      $header.addClass('dark');
	    } else {
	      $header.removeClass('dark');
	    }
	  });
	
	  var $profileDisplay = $('.profile-display');
	  $('.profile').click(function () {
	    $profileDisplay.toggleClass('open');
	    toggleScroll();
	  });
	
	  $('.page-overlay').click(function () {
	    $profileDisplay.toggleClass('open');
	    toggleScroll();
	  });
	
	  $('button.logout').click(function () {
	    router.logout().then(function () {
	      window.location = ('https://bjohnson-time-tracker.herokuapp.com/');
	    });
	  });
	};

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(22)();
	
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
/* 22 */
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
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	  $('body').toggleClass('no-scroll');
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Router = {};
	
	Router.getTasks = __webpack_require__(25)(('https://bjohnson-time-tracker.herokuapp.com/')).getTasks;
	Router.logout = function () {
	  return $.get(('https://bjohnson-time-tracker.herokuapp.com/') + 'user/logout');
	};
	
	module.exports = Router;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(26);
	
	module.exports = function (apiURL) {
	  var utils = __webpack_require__(22)(apiURL);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timeHTML = __webpack_require__(21);
	
	module.exports = {
	  editTaskHTML: function editTaskHTML(task) {
	    var currentTitle = task.find('.title').html();
	    var currentDescription = task.children('.description').html() || '';
	    var formattedDescription = currentDescription.replace('<br>', '\n');
	
	    return '\n      <input type="text" class="title" value="' + currentTitle + '" placeholder="Title">\n      <textarea name="" id="edit-description" cols="30" rows="4" placeholder="Add a Description">' + formattedDescription + '</textarea>  \n      <div class="edit-buttons">\n        <button class="cancel-changes">Cancel</button>\n        <button class="save-changes">Save</button>        \n      </div>  \n    ';
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
	
	    return '\n      <div class="task-heading">\n        <h3 class="title">' + title + '</h3>\n        <button class="more"><i class="material-icons" aria-label="More">expand_more</i></button>\n        <div class="more-actions">\n          <button class="edit"><i class="material-icons">mode_edit</i><h4>Edit</h4></button>\n          <hr>\n          <button class="delete"><i class="material-icons">delete_forever</i><h4>Delete</h4></button>\n        </div>\n        <div class="page-overlay"></div>\n      </div>\n      <h4 class="date">' + date + '</h4>\n      <h1 class="time">' + timeHTML.divideTimeHTML(time) + '</h4>\n      <p class="description">' + description + '</p>\n    ';
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(26);
	var onClick = __webpack_require__(28);
	var toggleScroll = __webpack_require__(23);
	
	module.exports = function (apiURL) {
	  var router = __webpack_require__(25)(apiURL);
	  var $container = $('#tasks-container');
	
	  router.getTasks();
	
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
	    router.editTask(id, $editContainer, function (err, editedTask) {
	      if (editedTask) {
	        $task.html(generate.innerTaskHTML(editedTask.title, editedTask.date, editedTask.time, editedTask.description));
	        toggleScroll();
	      }
	    });
	  });
	
	  containerClick('.cancel-changes', function () {
	    // let task = $(this).parent();
	
	    // TODO -- update router.getOneTask to utilize full callback
	    router.getTasks();
	    toggleScroll();
	  });
	
	  containerClick('.delete', function () {
	    // TODO -- refactor router.delete to separate the router call from the DOM manipulation
	    router.deleteTask($(this).parents('.task').attr('id'));
	    toggleScroll();
	  });
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($selector, child, callback) {
	  $selector.on('click', child, callback);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(20);
	var utils = __webpack_require__(22)();
	var generate = __webpack_require__(21);
	
	module.exports = function (apiURL) {
	  var $container = $('#timer-container');
	
	  $container.on('click', '.timer .start', function () {
	
	    $('#timer-container .start').addClass('stop').removeClass('start').html('Stop');
	
	    timer.start(function (currentTime) {
	      var $hours = $('.timer .hours');
	      var $minutes = $('.timer .minutes');
	      var $seconds = $('.timer .seconds');
	
	      if (currentTime % 360 === 0) {
	        increaseTimerHTML($hours);
	        $minutes.html('00');
	        $seconds.html('00');
	      } else if (currentTime % 60 === 0) {
	        increaseTimerHTML($minutes);
	        $seconds.html('00');
	      } else {
	        increaseTimerHTML($seconds);
	      }
	
	      function increaseTimerHTML($element) {
	        var elementValuePlusOne = parseInt($element.html()) + 1;
	        $element.html(utils.addLeadingZeroes(elementValuePlusOne));
	      }
	    });
	  });
	
	  $container.on('click', '.timer .stop', function () {
	    timer.stop();
	
	    // Makes sure that the time >= 1 before activating the 'Save' button
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
	    var getTasks = __webpack_require__(25)(apiURL).getTasks;
	
	    timer.reset();
	    event.preventDefault();
	
	    var createTask = __webpack_require__(30)(apiURL);
	    createTask(timeInSeconds).then(function () {
	      $container.hide().siblings('#tasks-container').show();
	      toggleNav();
	      getTasks();
	    });
	  });
	
	  function toggleNav() {
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(22)();
	
	module.exports = function (apiURL) {
	
	  return function (time) {
	    var url = apiURL + 'tasks/create';
	    var title = utils.getValue('.timer-save .title') || undefined;
	    var description = utils.getValue('.timer-save .description');
	
	    var data = { title: title, date: new Date(Date.now()), time: time, description: description };
	
	    return $.post(url, data);
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map