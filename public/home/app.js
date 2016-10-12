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
	
	__webpack_require__(31);
	__webpack_require__(33)();

/***/ },

/***/ 31:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var swapIcons = __webpack_require__(47);
	
	module.exports = function () {
	  $(document).ready(function () {
	
	    $('.menu-icon').click(function () {
	      var $this = $(this);
	      swapIcons($this.children('i'), 'menu', 'close');
	      // swapClasses($this.children('i'), 'fa-times', 'fa-bars');
	      $this.siblings('nav').toggleClass('collapsed');
	    });
	  });
	};

/***/ },

/***/ 47:
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function ($element, firstHTML, secondHTML) {
	  var html = $element.html();
	
	  if (html === firstHTML) {
	    $element.html(secondHTML);
	  } else {
	    $element.html(firstHTML);
	  }
	};

/***/ }

/******/ });
//# sourceMappingURL=app.js.map