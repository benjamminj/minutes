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
	
	__webpack_require__(35);
	__webpack_require__(37)();

/***/ },

/***/ 35:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var router = __webpack_require__(38);
	
	module.exports = function () {
	  $(document).ready(function () {
	    $('#login-form').submit(function (event) {
	      event.preventDefault();
	      var request = { username: $('#username').val(), password: $('#password').val() };
	
	      router.login(request).then(function () {
	        window.location = ('https://bjohnson-time-tracker.herokuapp.com/') + 'dashboard';
	      }).catch(function (err) {
	        if (err.status === 401) {
	          var message = err.responseJSON.message;
	          $('header h3').html(message + '. Please try again').addClass('unauthorized');
	        }
	      });
	    });
	  });
	};

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Router = {};
	
	Router.login = function (request) {
	  return $.post({
	    url: ('https://bjohnson-time-tracker.herokuapp.com/') + 'user/login',
	    data: request,
	    dataType: 'json'
	  });
	
	  // .done(() => {
	  //   window.location = `${API_URL}dashboard`;
	  // });
	};
	
	module.exports = Router;

/***/ }

/******/ });
//# sourceMappingURL=app.js.map