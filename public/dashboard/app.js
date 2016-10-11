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
	
	__webpack_require__(15);
	__webpack_require__(19)();

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
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  font-weight: lighter;\n}\nul {\n  list-style-type: none;\n  padding-left: 0;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:focus {\n  outline: none;\n}\nbody {\n  background-color: #5086d2;\n  background-size: contain;\n  background-image: -webkit-radial-gradient(0 0, circle, #5086d2, #717cf6);\n  background-image: radial-gradient(circle at 0 0, #5086d2, #717cf6);\n  min-height: 100vh;\n  margin: 0;\n}\n.no-scroll {\n  overflow: hidden;\n}\nheader {\n  padding: 20px 5px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n}\nheader h1 {\n  display: none;\n}\nheader .logout {\n  background-color: transparent;\n  border: none;\n  position: absolute;\n  right: 5px;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n}\nheader .logout i {\n  font-size: 30px;\n}\nheader .logout h4 {\n  display: none;\n}\nheader .logout:hover {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\nheader #nav-buttons {\n  font-size: 0;\n  width: 60%;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  overflow: hidden;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: color, background-color;\n  transition-property: color, background-color;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\nheader #nav-buttons button {\n  font-size: 20px;\n  height: 30px;\n  border-radius: 2px;\n  border: 1px solid rgba(255, 255, 255, 0.8);\n  background-color: transparent;\n  width: 50%;\n}\nheader #nav-buttons button.left {\n  border-radius: 2px 0 0 2px;\n}\nheader #nav-buttons button.right {\n  border-radius: 0 2px 2px 0;\n}\nheader #nav-buttons button.current {\n  background-color: rgba(255, 255, 255, 0.8);\n  color: #717cf6;\n}\nheader #nav-buttons button.current:hover {\n  background-color: rgba(255, 255, 255, 0.8);\n  color: #717cf6;\n}\nheader #nav-buttons button:hover {\n  background-color: #2098d1;\n  color: white;\n  background-color: rgba(255, 255, 255, 0.2);\n}\n@media only screen and (min-width: 700px) {\n  header {\n    justify-content: flex-start;\n    padding-left: 20px;\n    padding-right: 20px;\n  }\n  header h1 {\n    display: block;\n    flex-grow: 1;\n  }\n  header #nav-buttons {\n    width: 250px;\n    justify-content: flex-end;\n  }\n  header #nav-buttons button {\n    border: none;\n    display: inline-block;\n    vertical-align: middle;\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    width: 100px;\n  }\n  header #nav-buttons button.current {\n    background-color: transparent;\n    color: #ffffff;\n    font-size: 22px;\n  }\n  header #nav-buttons button.current:hover {\n    background-color: transparent;\n    color: rgba(255, 255, 255, 0.8);\n  }\n  header #nav-buttons button:hover {\n    background-color: transparent;\n    color: rgba(255, 255, 255, 0.8);\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n  header .logout {\n    position: static;\n    width: 100px;\n  }\n  header .logout i {\n    display: none;\n  }\n  header .logout h4 {\n    font-size: 20px;\n    margin: 0;\n    display: inline-flex;\n  }\n}\n#tasks-container #no-tasks {\n  margin: 70px;\n  font-size: 14px;\n  opacity: 0.5;\n  text-align: center;\n}\n#tasks-container .task {\n  padding: 20px 5px;\n  background-color: rgba(255, 255, 255, 0.9);\n  margin: 0 0 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  flex-wrap: wrap;\n}\n#tasks-container .task * {\n  color: rgba(0, 0, 0, 0.8);\n}\n#tasks-container .task .task-heading {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n#tasks-container .task .title {\n  font-size: 30px;\n  margin: 0;\n}\n#tasks-container .task .more {\n  border: none;\n  background-color: transparent;\n  align-self: flex-start;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n}\n#tasks-container .task .more i {\n  font-size: 30px;\n}\n#tasks-container .task .more:hover {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n#tasks-container .task .date {\n  margin: 0;\n}\n#tasks-container .task .page-overlay {\n  display: none;\n}\n#tasks-container .task .page-overlay.open {\n  display: block;\n  position: fixed;\n  height: 100vh;\n  background-color: rgba(40, 40, 40, 0.775);\n  width: 100vw;\n  left: 0;\n  top: 0;\n}\n#tasks-container .task .time,\n#tasks-container .task .description {\n  width: 100%;\n}\n#tasks-container .task .time {\n  text-align: center;\n  font-size: 40px;\n}\n#tasks-container .task #edit-description {\n  margin: 0;\n}\n#tasks-container .task .more-actions {\n  display: none;\n}\n#tasks-container .task .more-actions.open {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  position: absolute;\n  background: #fff;\n  margin: 90px 0;\n  padding: 10px 5px;\n  z-index: 999;\n  left: 0;\n  right: 0;\n  border-radius: 2px;\n}\n#tasks-container .task .more-actions.open button {\n  font-size: 20px;\n  height: 40px;\n  width: 100%;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n}\n#tasks-container .task .more-actions.open button:hover {\n  -webkit-transform: scale(1.01);\n  transform: scale(1.01);\n}\n@media only screen and (min-width: 700px) {\n  #tasks-container .task .more-actions.open {\n    width: 700px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n#tasks-container .task .more-actions.open:after {\n  content: '';\n  position: absolute;\n  border-style: solid;\n  border-width: 0 14px 16px;\n  border-color: #FFFFFF transparent;\n  width: 0px;\n  top: -11px;\n  right: 7px;\n}\n#tasks-container .task .editing .title {\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  width: 100%;\n}\n#tasks-container .task .editing .title:focus {\n  outline: none;\n}\n#tasks-container .task .editing .description-heading {\n  margin: 0;\n}\n#tasks-container .task .editing #edit-description {\n  width: 100%;\n  box-sizing: border-box;\n  border: none;\n  border-top: 1px solid rgba(0, 0, 0, 0.2);\n}\n#tasks-container .task .editing #edit-description:focus {\n  outline: none;\n}\n#tasks-container .task .editing .edit-buttons {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: 0 40px;\n  box-sizing: border-box;\n}\n#tasks-container .task .editing .edit-buttons button {\n  width: 45%;\n  text-align: center;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  overflow: hidden;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: color, background-color;\n  transition-property: color, background-color;\n}\n#tasks-container .task .editing .edit-buttons button:hover {\n  background-color: #2098d1;\n  color: white;\n}\n#tasks-container .task .editing .edit-buttons button.cancel-changes {\n  height: 40px;\n  border-radius: 2px;\n  border: 1px solid #fe5151;\n  background-color: transparent;\n  color: #fe5151;\n}\n#tasks-container .task .editing .edit-buttons button.cancel-changes:hover {\n  background-color: #fe5151;\n  color: rgba(255, 255, 255, 0.8);\n}\n#tasks-container .task .editing .edit-buttons button.save-changes {\n  height: 40px;\n  border-radius: 2px;\n  border: 1px solid #74c947;\n  background-color: transparent;\n  color: #74c947;\n}\n#tasks-container .task .editing .edit-buttons button.save-changes:hover {\n  background-color: #74c947;\n  color: rgba(255, 255, 255, 0.8);\n}\n#tasks-container .task hr {\n  width: 100%;\n}\n@media only screen and (min-width: 700px) {\n  #tasks-container .task {\n    border-radius: 2px;\n    padding-left: 15px;\n    padding-right: 15px;\n  }\n}\n#timer-container .timer {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  align-items: center;\n  margin-top: 15% auto;\n  /* justify-content: center; */\n  margin: 15% auto;\n}\n@media only screen and (min-width: 700px) {\n  #timer-container .timer {\n    margin-top: 10%;\n  }\n}\n#timer-container .time {\n  font-size: 70px;\n  margin: 20px 0;\n  width: 100%;\n  text-align: center;\n}\n@media only screen and (min-width: 700px) {\n  #timer-container .time {\n    font-size: 150px;\n  }\n}\n#timer-container .timer-buttons {\n  width: 90%;\n  margin-top: 20px;\n  /* padding: 0 10%; */\n  display: flex;\n  justify-content: space-between;\n}\n#timer-container .timer-buttons button {\n  width: 48%;\n  font-size: 20px;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  overflow: hidden;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: color, background-color;\n  transition-property: color, background-color;\n}\n#timer-container .timer-buttons button:hover {\n  background-color: #2098d1;\n  color: white;\n}\n#timer-container .timer-buttons button.start {\n  height: 50px;\n  border-radius: 2px;\n  background-color: #74c947;\n  border: none;\n  outline: none;\n}\n#timer-container .timer-buttons button.start:hover {\n  background-color: #67bf38;\n}\n#timer-container .timer-buttons button.stop,\n#timer-container .timer-buttons button.cancel-save {\n  height: 50px;\n  border-radius: 2px;\n  background-color: #fe5151;\n  border: none;\n  outline: none;\n}\n#timer-container .timer-buttons button.stop:hover,\n#timer-container .timer-buttons button.cancel-save:hover {\n  background-color: #fe3838;\n}\n#timer-container .timer-buttons button.save {\n  height: 50px;\n  border-radius: 2px;\n  background-color: #37c3fe;\n  border: none;\n  outline: none;\n  opacity: 0.2;\n}\n#timer-container .timer-buttons button.save.active,\n#timer-container .timer-buttons button.submit {\n  height: 50px;\n  border-radius: 2px;\n  background-color: #37c3fe;\n  border: none;\n  outline: none;\n  opacity: 1;\n}\n#timer-container .timer-buttons button.save.active:hover,\n#timer-container .timer-buttons button.submit:hover {\n  background-color: #1ebbfe;\n}\n#timer-container #save-task {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 20px 10px;\n}\n#timer-container #save-task textarea,\n#timer-container #save-task input {\n  box-sizing: border-box;\n  width: 90%;\n  background-color: rgba(255, 255, 255, 0.2);\n  border: none;\n  padding: 10px;\n  font-size: 20px;\n}\n#timer-container #save-task textarea::-webkit-input-placeholder,\n#timer-container #save-task input::-webkit-input-placeholder {\n  color: rgba(255, 255, 255, 0.5);\n}\n#timer-container #save-task textarea::-moz-placeholder,\n#timer-container #save-task input::-moz-placeholder {\n  color: rgba(255, 255, 255, 0.5);\n}\n#timer-container #save-task textarea:-ms-input-placeholder,\n#timer-container #save-task input:-ms-input-placeholder {\n  color: rgba(255, 255, 255, 0.5);\n}\n#timer-container #save-task textarea:-moz-placeholder,\n#timer-container #save-task input:-moz-placeholder {\n  color: rgba(255, 255, 255, 0.5);\n}\n#timer-container #save-task textarea.top,\n#timer-container #save-task input.top {\n  border-radius: 2px 2px 0 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n#timer-container #save-task textarea.bottom,\n#timer-container #save-task input.bottom {\n  border-radius: 0 0 2px 2px;\n}\n#timer-container #save-task textarea:focus,\n#timer-container #save-task input:focus {\n  outline: none;\n}\nmain {\n  min-height: 65vh;\n}\n@media only screen and (min-width: 700px) {\n  main {\n    width: 700px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n.logout-container {\n  bottom: 20px;\n  width: 100%;\n  text-align: center;\n  margin: 50px 0;\n}\n.logout {\n  height: 50px;\n  border-radius: 2px;\n  border: 1px solid rgba(255, 255, 255, 0.8);\n  background-color: transparent;\n  width: 80%;\n  color: #fe5151;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  overflow: hidden;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: color, background-color;\n  transition-property: color, background-color;\n}\n.logout:hover {\n  background-color: #2098d1;\n  color: white;\n  background-color: #fe5151;\n  border-color: #fe5151;\n  color: rgba(255, 255, 255, 0.8);\n}\n@media only screen and (min-width: 700px) {\n  .logout {\n    width: 700px;\n  }\n}\n.logout h4 {\n  margin: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
	
	  $(document).ready(function () {
	    __webpack_require__(20)(('https://bjohnson-time-tracker.herokuapp.com/'));
	    __webpack_require__(26)(('https://bjohnson-time-tracker.herokuapp.com/'));
	    __webpack_require__(29)(('https://bjohnson-time-tracker.herokuapp.com/'));
	  });
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(21);
	var generate = __webpack_require__(22);
	var utils = __webpack_require__(23)();
	
	module.exports = function (apiURL) {
	  var getTasks = __webpack_require__(24)(apiURL).getTasks;
	
	  $('button.logout').click(function () {
	    var url = apiURL + 'user/logout';
	
	    $.get(url).done(function () {
	      window.location = ('https://bjohnson-time-tracker.herokuapp.com/');
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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(23)();
	
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(25);
	
	module.exports = function (apiURL) {
	  var utils = __webpack_require__(23)(apiURL);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timeHTML = __webpack_require__(22);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generate = __webpack_require__(25);
	var onClick = __webpack_require__(27);
	var toggleScroll = __webpack_require__(28);
	
	module.exports = function (apiURL) {
	  var ajax = __webpack_require__(24)(apiURL);
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
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($selector, child, callback) {
	  $selector.on('click', child, callback);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	  $('body').toggleClass('no-scroll');
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var timer = __webpack_require__(21);
	var utils = __webpack_require__(23)();
	var generate = __webpack_require__(22);
	
	module.exports = function (apiURL) {
	  var $container = $('#timer-container');
	  var createTask = __webpack_require__(30)(apiURL);
	
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
	    var getTasks = __webpack_require__(24)(apiURL).getTasks;
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(23)();
	
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