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
	
	__webpack_require__(26)();

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Controller = {};
	
	Controller.login = function (request) {
	  $.post(('//localhost:5000/') + "user/login", request).done(function () {
	    window.location = ('//localhost:5000/') + "dashboard";
	  });
	};
	
	module.exports = Controller;

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var controller = __webpack_require__(27);
	
	module.exports = function () {
	
	  $(document).ready(function () {
	    $('#signup-form').submit(function (event) {
	      // console.log('here');
	      event.preventDefault();
	      var request = { username: $('#create-username').val(), password: $('#create-password').val() };
	
	      controller.signup(request);
	    });
	  });
	};

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var loginRequest = __webpack_require__(25).login;
	
	var Controller = {};
	
	Controller.signup = function (request) {
	  $.post(('//localhost:5000/') + 'user/signup', request).done(function () {
	    loginRequest(request);
	  });
	};
	
	module.exports = Controller;

/***/ }

/******/ });
//# sourceMappingURL=app.js.map