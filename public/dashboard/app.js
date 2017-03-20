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
	
	__webpack_require__(5);
	__webpack_require__(10)();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
	  $(document).ready(function () {
	    __webpack_require__(11)(('//localhost:5000/'));
	    __webpack_require__(17)(('//localhost:5000/'));
	    __webpack_require__(20)(('//localhost:5000/'));
	  });
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (apiURL) {
	  $('.logout').click(function (ev) {
	    ev.preventDefault();
	    var url = apiURL + 'user/logout';
	
	    $.get(url).done(function () {
	      window.location = ('//localhost:5000/');
	    });
	  });
	};

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14)();
	
	module.exports = {
	  timerHTML: function timerHTML() {
	    return '\n      <div class="timer">\n        <h2 class="time">\n          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>\n        </h2>\n        <div class="timer-buttons">\n          <button class="start">Start</button>\n          <button class="save">Save</button>\n        </div>\n      </div>\n    ';
	  },
	  timerClosePromptHTML: function timerClosePromptHTML() {
	    return '\n      <div class="timer-close-prompt">\n        <h2>Are you sure you want to end the timer? You will lose any time currently on the clock</h2>\n        <button class="yes">Yes, I would like to cancel this timer</button>\n        <button class="no">No, I want to keep running the timer</button>\n      </div>\n    ';
	  },
	  timerSaveHTML: function timerSaveHTML(seconds) {
	    return '\n      <div class="timer-save">\n        <form action="" id="save-task">\n          <h2 class="time">\n            ' + this.divideTimeHTML(seconds) + '\n          </h2>\n          <input type="text" placeholder="Choose a Title" class="title top">\n          <textarea placeholder="Add a Description" class="description bottom" rows="10" cols="50"></textarea>\n          <div class="timer-buttons">\n            <button class="cancel-save">Cancel</button>\n            <button type="submit" class="submit">Save</button>\n          </div>\n        </form>\n      </div>\n    ';
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(16);
	
	module.exports = function (apiURL) {
	  var utils = __webpack_require__(14)(apiURL);
	
	  return {
	    getTasks: function getTasks() {
	      var url = '/tasks/';
	      $.getJSON(url).done(function (tasks) {
	        $('#tasks-container').html('');
	
	        if (!tasks.length) {
	          $('#tasks-container').addClass('no-content');
	          $('#tasks-container').append('<h3 id="no-tasks">It looks like you haven\'t created any tasks yet. <a href="#timer-container">Create a new one today</a></h3>');
	        }
	
	        tasks.forEach(function (task) {
	          $('#tasks-container').removeClass('no-content');
	          $('#tasks-container').prepend(generate.taskHTML(task));
	        });
	      }).fail(function () {
	        utils.redirectToLogin();
	      });
	    },
	    editTask: function editTask(id, edits, callback) {
	      var title = edits.find('.edit-title').val();
	      var description = edits.find('.edit-description').val();
	
	      $.ajax({
	        url: '/tasks/edit/' + id,
	        type: 'PUT',
	        data: { title: title, description: description }
	      }).done(function (editedTask) {
	        callback(null, editedTask);
	      }).fail(function (err) {
	        callback(err);
	      });
	    },
	    deleteTask: function deleteTask(id) {
	      var url = '/tasks/delete/' + id;
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timeHTML = __webpack_require__(13);
	
	var saveIcon = '\n  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n      <path d="M0 0h24v24H0z" fill="none"/>\n      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>\n  </svg>\n';
	
	var editIcon = '\n  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n  </svg>\n';
	
	var deleteIcon = '\n  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n  </svg>\n';
	
	var infoIcon = '\n  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>\n  </svg>\n';
	
	var closeIcon = '\n  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n  </svg>\n';
	
	module.exports = {
	  editTaskHTML: function editTaskHTML(task) {
	    var currentTitle = task.find('.title').html();
	    var currentDescription = task.find('.description').html() || '';
	    var formattedDescription = currentDescription.replace('<br>', '\n');
	    var time = task.find('.time').html();
	    var date = task.find('.date').html();
	
	    return '\n      <input type="text" class="title" value="' + currentTitle + '" placeholder="Title">\n      <!-- <h4 class="date">' + date + '</h4> -->\n      <!-- <h4 class="time">' + time + '</h4> -->\n      <!-- <h4 class="description-heading">Description</h4> -->\n      <textarea name="" id="edit-description" cols="30" rows="4" placeholder="Add a Description">' + formattedDescription + '</textarea>\n      <div class="edit-buttons">\n        <button class="cancel-changes">Cancel</button>\n        <button class="save-changes">Save</button>\n      </div>\n    ';
	  },
	  taskHTML: function taskHTML(task) {
	    return '\n      <div class="task" id="' + task._id + '">\n        ' + this.innerTaskHTML(task) + '\n      </div>\n    ';
	  },
	
	
	  // TO DO -- refactor so that it only takes a single task as an arg.
	  innerTaskHTML: function innerTaskHTML(_ref) {
	    var title = _ref.title;
	    var date = _ref.date;
	    var time = _ref.time;
	    var description = _ref.description;
	    var _id = _ref._id;
	
	    date = new Date(date).toDateString();
	
	    var descriptionHTML = void 0;
	    if (!description) {
	      descriptionHTML = '';
	    } else {
	      descriptionHTML = description.replace(/\n/g, '<br>');
	    }
	
	    return '\n      <input hidden type="checkbox" class="info-toggler" id="info-' + _id + '" />\n      <input hidden type="checkbox" class="edit-toggler" id="edit-' + _id + '" />\n\n      <div class="task-content">\n        <div class="task-default">\n          <div class="task-default-header">\n            <h4 class="date">' + date + '</h4>\n            <h3 class="time">' + timeHTML.divideTimeHTML(time) + '</h3>\n          </div>\n          <h3 class="title">' + title + '</h3>\n        </div>\n        <div class="task-info task-modal" hidden>\n          <div class="task-modal-content">\n            <h4 class="date">' + date + '</h4>\n            <label for="info-' + _id + '" class="close-icon">' + closeIcon + '</label>\n            <h1 class="time">' + timeHTML.divideTimeHTML(time) + '</h4>\n            <h3 class="title">' + title + '</h3>\n            <p class="description">' + descriptionHTML + '</p>\n          </div>\n        </div>\n        <div class="task-edit task-modal" hidden>\n          <div class="task-modal-content">\n            <button class="task-edit-save">' + saveIcon + '</button>\n            <label for="edit-' + _id + '" class="close-icon">' + closeIcon + '</label>\n            <input required class="edit-title" type="text" placeholder="Title" value="' + title + '" />\n            <textarea class="edit-description" name="description" placeholder="Description">' + (description || '') + '</textarea>\n          </div>\n        </div>\n      </div>\n\n      <div class="action-buttons">\n        <label for="info-' + _id + '">' + infoIcon + '</label>\n        <label for="edit-' + _id + '">' + editIcon + '</label>\n        <button class="delete-btn">' + deleteIcon + '</button>\n      </div>\n    ';
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(16);
	var onClick = __webpack_require__(18);
	var toggleScroll = __webpack_require__(19);
	
	module.exports = function (apiURL) {
	  var ajax = __webpack_require__(15)(apiURL);
	  var $container = $('#tasks-container');
	
	  ajax.getTasks();
	
	  containerClick('.more', function () {
	    $(this).siblings('.actions, .page-overlay').toggleClass('open');
	    toggleScroll();
	  });
	
	  function containerClick(child, callback) {
	    return onClick($container, child, callback);
	  }
	
	  containerClick('.page-overlay.open', function () {
	    $(this).toggleClass('open').siblings('.actions').toggleClass('open');
	    toggleScroll();
	  });
	
	  containerClick('.edit', function () {
	    var $task = $(this).parents('.task');
	    var html = generate.editTaskHTML($task);
	
	    $task.find('.task-content').html(html);
	    // $('.more-actions').html(html).toggleClass('editing');
	  });
	
	  containerClick('.task .task-edit-save', function () {
	    var $task = $(this).parents('.task');
	    var $editContainer = $(this).parents('.task-edit');
	    var id = $task.attr('id');
	
	    // TO DO -- refactor so that takes an object as second arg. { title: ___, desc: ____ }
	    ajax.editTask(id, $editContainer, function (err, editedTask) {
	      if (editedTask) {
	        console.log('it works?');
	        $task.html(generate.innerTaskHTML(editedTask));
	        toggleScroll();
	      }
	
	      if (err) {
	        console.log(err);
	      }
	    });
	  });
	
	  containerClick('.delete-btn', function () {
	    // TODO -- refactor ajax.delete to separate the AJAX call from the DOM manipulation
	    ajax.deleteTask($(this).parents('.task').attr('id'));
	    toggleScroll();
	  });
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($selector, child, callback) {
	  $selector.on('click', child, callback);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	  $('body').toggleClass('no-scroll');
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(12);
	var utils = __webpack_require__(14)();
	var generate = __webpack_require__(13);
	
	function goToTasksView() {
	  window.location.hash = '#tasks-container';
	}
	
	function removeTimerSaveHTML($container) {
	  $container.find('.timer-save').remove();
	}
	
	function resetClock($container) {
	  timer.reset();
	
	  var $time = $container.find('.time');
	  $time.find('.hours, .minutes, .seconds').html('00');
	}
	
	module.exports = function (apiURL) {
	  var $container = $('#timer-container');
	  var createTask = __webpack_require__(21)(apiURL);
	
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
	
	    $container.append(generate.timerSaveHTML(seconds));
	  });
	
	  $container.on('submit', '#save-task', function (event) {
	    var timeInSeconds = timer.end();
	    var getTasks = __webpack_require__(15)(apiURL).getTasks;
	
	    resetClock($container);
	    event.preventDefault();
	
	    createTask(timeInSeconds, function () {
	      removeTimerSaveHTML($container);
	      goToTasksView();
	      getTasks();
	    });
	  });
	
	  $container.on('click', '.cancel-save', function (event) {
	    event.preventDefault();
	    resetClock($container);
	    removeTimerSaveHTML($container);
	    goToTasksView();
	  });
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14)();
	
	module.exports = function () {
	  return function (time, callback) {
	    var url = '/tasks/create';
	    var title = utils.getValue('.timer-save .title') || undefined;
	    var description = utils.getValue('.timer-save .description');
	
	    var data = {
	      title: title,
	      date: new Date(Date.now()),
	      time: time,
	      description: description
	    };
	
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