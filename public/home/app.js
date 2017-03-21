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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(24);
	__webpack_require__(26)();

/***/ },

/***/ 24:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(27);
	
	var signup = _require.signup;
	
	
	module.exports = function () {
	  $(document).ready(function () {
	    $('#sign-up-form').submit(function (ev) {
	      ev.preventDefault();
	      var username = $('#signup-username').val() || undefined;
	      var password = $('#signup-password').val() || undefined;
	
	      signup({ username: username, password: password });
	    });
	  });
	};

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(28);
	
	var login = _require.login;
	
	
	var $usernameLabel = $('label[for="signup-username"]');
	var $passwordLabel = $('label[for="signup-password"]');
	
	function handleInvalidUsername(err) {
	  if (err.status === 400 && /Path \`username\` is required/.test(err.responseText)) {
	    $usernameLabel.addClass('error');
	    $usernameLabel.html('Invalid username');
	  }
	}
	
	function handleDuplicateUsername(err) {
	  if (err.status === 400 && /E11000/.test(err.responseJSON.message)) {
	    $usernameLabel.addClass('error');
	    $usernameLabel.html('This username already exists.');
	  }
	}
	
	function handleInvalidPassword(err) {
	  if (err.status === 500 && /EncryptionError/.test(err.responseJSON.name)) {
	    $passwordLabel.addClass('error');
	    $passwordLabel.html('Invalid password');
	  }
	}
	
	module.exports = {
	  signup: function signup(_ref) {
	    var username = _ref.username;
	    var password = _ref.password;
	
	    $.ajax('/user/signup', {
	      method: 'POST',
	      data: {
	        username: username,
	        password: password
	      }
	    }).done(function () {
	      login({ username: username, password: password });
	    }).fail(function (err) {
	      handleDuplicateUsername(err);
	      handleInvalidUsername(err);
	      handleInvalidPassword(err);
	    });
	  }
	};

/***/ },

/***/ 28:
/***/ function(module, exports) {

	"use strict";
	
	var Controller = {};
	
	Controller.login = function (request) {
	  $.post("/user/login", request).done(function () {
	    window.location = "/dashboard/#tasks-container";
	  });
	};
	
	module.exports = Controller;

/***/ }

/******/ });
//# sourceMappingURL=app.js.map