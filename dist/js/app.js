/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"home~new-item":"home~new-item","home":"home","new-item":"new-item","stencil-polyfills-css-shim":"stencil-polyfills-css-shim","stencil-polyfills-dom":"stencil-polyfills-dom"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5 lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5 lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./ion-action-sheet-controller_8.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-action-sheet-controller_8.entry.js\",\n\t\t37\n\t],\n\t\"./ion-action-sheet-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-action-sheet-ios.entry.js\",\n\t\t38\n\t],\n\t\"./ion-action-sheet-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-action-sheet-md.entry.js\",\n\t\t39\n\t],\n\t\"./ion-alert-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-alert-ios.entry.js\",\n\t\t17\n\t],\n\t\"./ion-alert-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-alert-md.entry.js\",\n\t\t18\n\t],\n\t\"./ion-app_8-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-app_8-ios.entry.js\",\n\t\t0,\n\t\t9\n\t],\n\t\"./ion-app_8-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-app_8-md.entry.js\",\n\t\t0,\n\t\t10\n\t],\n\t\"./ion-avatar_3-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-avatar_3-ios.entry.js\",\n\t\t40\n\t],\n\t\"./ion-avatar_3-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-avatar_3-md.entry.js\",\n\t\t41\n\t],\n\t\"./ion-back-button-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-back-button-ios.entry.js\",\n\t\t42\n\t],\n\t\"./ion-back-button-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-back-button-md.entry.js\",\n\t\t43\n\t],\n\t\"./ion-backdrop-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-backdrop-ios.entry.js\",\n\t\t79\n\t],\n\t\"./ion-backdrop-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-backdrop-md.entry.js\",\n\t\t80\n\t],\n\t\"./ion-button_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-button_2-ios.entry.js\",\n\t\t44\n\t],\n\t\"./ion-button_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-button_2-md.entry.js\",\n\t\t45\n\t],\n\t\"./ion-card_5-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-card_5-ios.entry.js\",\n\t\t46\n\t],\n\t\"./ion-card_5-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-card_5-md.entry.js\",\n\t\t47\n\t],\n\t\"./ion-checkbox-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-checkbox-ios.entry.js\",\n\t\t48\n\t],\n\t\"./ion-checkbox-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-checkbox-md.entry.js\",\n\t\t49\n\t],\n\t\"./ion-chip-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-chip-ios.entry.js\",\n\t\t50\n\t],\n\t\"./ion-chip-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-chip-md.entry.js\",\n\t\t51\n\t],\n\t\"./ion-col_3.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-col_3.entry.js\",\n\t\t81\n\t],\n\t\"./ion-datetime_3-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-datetime_3-ios.entry.js\",\n\t\t13\n\t],\n\t\"./ion-datetime_3-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-datetime_3-md.entry.js\",\n\t\t14\n\t],\n\t\"./ion-fab_3-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-fab_3-ios.entry.js\",\n\t\t52\n\t],\n\t\"./ion-fab_3-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-fab_3-md.entry.js\",\n\t\t53\n\t],\n\t\"./ion-img.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-img.entry.js\",\n\t\t82\n\t],\n\t\"./ion-infinite-scroll_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-infinite-scroll_2-ios.entry.js\",\n\t\t33\n\t],\n\t\"./ion-infinite-scroll_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-infinite-scroll_2-md.entry.js\",\n\t\t34\n\t],\n\t\"./ion-input-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-input-ios.entry.js\",\n\t\t54\n\t],\n\t\"./ion-input-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-input-md.entry.js\",\n\t\t55\n\t],\n\t\"./ion-item-option_3-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-item-option_3-ios.entry.js\",\n\t\t56\n\t],\n\t\"./ion-item-option_3-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-item-option_3-md.entry.js\",\n\t\t57\n\t],\n\t\"./ion-item_8-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-item_8-ios.entry.js\",\n\t\t58\n\t],\n\t\"./ion-item_8-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-item_8-md.entry.js\",\n\t\t59\n\t],\n\t\"./ion-loading-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-loading-ios.entry.js\",\n\t\t19\n\t],\n\t\"./ion-loading-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-loading-md.entry.js\",\n\t\t20\n\t],\n\t\"./ion-menu_4-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-menu_4-ios.entry.js\",\n\t\t11\n\t],\n\t\"./ion-menu_4-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-menu_4-md.entry.js\",\n\t\t12\n\t],\n\t\"./ion-modal-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-modal-ios.entry.js\",\n\t\t0,\n\t\t60\n\t],\n\t\"./ion-modal-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-modal-md.entry.js\",\n\t\t0,\n\t\t61\n\t],\n\t\"./ion-nav_5.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-nav_5.entry.js\",\n\t\t0,\n\t\t29\n\t],\n\t\"./ion-popover-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-popover-ios.entry.js\",\n\t\t0,\n\t\t62\n\t],\n\t\"./ion-popover-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-popover-md.entry.js\",\n\t\t0,\n\t\t63\n\t],\n\t\"./ion-progress-bar-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-progress-bar-ios.entry.js\",\n\t\t64\n\t],\n\t\"./ion-progress-bar-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-progress-bar-md.entry.js\",\n\t\t65\n\t],\n\t\"./ion-radio_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-radio_2-ios.entry.js\",\n\t\t25\n\t],\n\t\"./ion-radio_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-radio_2-md.entry.js\",\n\t\t26\n\t],\n\t\"./ion-range-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-range-ios.entry.js\",\n\t\t66\n\t],\n\t\"./ion-range-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-range-md.entry.js\",\n\t\t67\n\t],\n\t\"./ion-refresher_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-refresher_2-ios.entry.js\",\n\t\t35\n\t],\n\t\"./ion-refresher_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-refresher_2-md.entry.js\",\n\t\t36\n\t],\n\t\"./ion-reorder_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-reorder_2-ios.entry.js\",\n\t\t31\n\t],\n\t\"./ion-reorder_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-reorder_2-md.entry.js\",\n\t\t32\n\t],\n\t\"./ion-ripple-effect.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-ripple-effect.entry.js\",\n\t\t83\n\t],\n\t\"./ion-route_4.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-route_4.entry.js\",\n\t\t68\n\t],\n\t\"./ion-searchbar-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-searchbar-ios.entry.js\",\n\t\t21\n\t],\n\t\"./ion-searchbar-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-searchbar-md.entry.js\",\n\t\t22\n\t],\n\t\"./ion-segment_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-segment_2-ios.entry.js\",\n\t\t69\n\t],\n\t\"./ion-segment_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-segment_2-md.entry.js\",\n\t\t70\n\t],\n\t\"./ion-select_3-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-select_3-ios.entry.js\",\n\t\t27\n\t],\n\t\"./ion-select_3-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-select_3-md.entry.js\",\n\t\t28\n\t],\n\t\"./ion-slide_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-slide_2-ios.entry.js\",\n\t\t84\n\t],\n\t\"./ion-slide_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-slide_2-md.entry.js\",\n\t\t85\n\t],\n\t\"./ion-spinner.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-spinner.entry.js\",\n\t\t71\n\t],\n\t\"./ion-split-pane-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-split-pane-ios.entry.js\",\n\t\t86\n\t],\n\t\"./ion-split-pane-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-split-pane-md.entry.js\",\n\t\t87\n\t],\n\t\"./ion-tab-bar_2-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-tab-bar_2-ios.entry.js\",\n\t\t72\n\t],\n\t\"./ion-tab-bar_2-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-tab-bar_2-md.entry.js\",\n\t\t73\n\t],\n\t\"./ion-tab_2.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-tab_2.entry.js\",\n\t\t30\n\t],\n\t\"./ion-text.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-text.entry.js\",\n\t\t74\n\t],\n\t\"./ion-textarea-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-textarea-ios.entry.js\",\n\t\t75\n\t],\n\t\"./ion-textarea-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-textarea-md.entry.js\",\n\t\t76\n\t],\n\t\"./ion-toast-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-toast-ios.entry.js\",\n\t\t23\n\t],\n\t\"./ion-toast-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-toast-md.entry.js\",\n\t\t24\n\t],\n\t\"./ion-toggle-ios.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-toggle-ios.entry.js\",\n\t\t15\n\t],\n\t\"./ion-toggle-md.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-toggle-md.entry.js\",\n\t\t16\n\t],\n\t\"./ion-virtual-scroll.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ion-virtual-scroll.entry.js\",\n\t\t88\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(function() {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {\n\t\treturn __webpack_require__(id);\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.id = \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5 lazy recursive ^\\\\.\\\\/.*\\\\.entry\\\\.js$ include: \\\\.entry\\\\.js$ exclude: \\\\.system\\\\.entry\\\\.js$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack:///./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5_lazy_^\\.\\/.*\\.entry\\.js$_include:_\\.entry\\.js$_exclude:_\\.system\\.entry\\.js$_namespace_object?");

/***/ }),

/***/ "./node_modules/@ionic/vue/node_modules/ionicons/dist/esm/legacy lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/vue/node_modules/ionicons/dist/esm/legacy lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./ion-icon.entry.js\": [\n\t\t\"./node_modules/@ionic/vue/node_modules/ionicons/dist/esm/legacy/ion-icon.entry.js\",\n\t\t96\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(function() {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(function() {\n\t\treturn __webpack_require__(id);\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.id = \"./node_modules/@ionic/vue/node_modules/ionicons/dist/esm/legacy lazy recursive ^\\\\.\\\\/.*\\\\.entry\\\\.js$ include: \\\\.entry\\\\.js$ exclude: \\\\.system\\\\.entry\\\\.js$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack:///./node_modules/@ionic/vue/node_modules/ionicons/dist/esm/legacy_lazy_^\\.\\/.*\\.entry\\.js$_include:_\\.entry\\.js$_exclude:_\\.system\\.entry\\.js$_namespace_object?");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"app\"\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3d6d93c5-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d6d93c5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { attrs: { id: \"app\" } },\n    [\n      _c(\n        \"ion-app\",\n        [\n          _c(\"ion-vue-router\"),\n          _c(\"ion-menu-controller\"),\n          _c(\"ion-modal-controller\")\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223d6d93c5-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3d6d93c5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3d6d93c5-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"3d6d93c5-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3d6d93c5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3d6d93c5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(F_pba_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(F_pba_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(F_pba_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var F_pba_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(F_pba_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _ionic_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/vue */ \"./node_modules/@ionic/vue/dist/ionic-vue.esm.js\");\n/* harmony import */ var _ionic_core_css_core_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/core/css/core.css */ \"./node_modules/@ionic/core/css/core.css\");\n/* harmony import */ var _ionic_core_css_core_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ionic_core_css_core_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _ionic_core_css_ionic_bundle_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/core/css/ionic.bundle.css */ \"./node_modules/@ionic/core/css/ionic.bundle.css\");\n/* harmony import */ var _ionic_core_css_ionic_bundle_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ionic_core_css_ionic_bundle_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar VueCookies = __webpack_require__(/*! vue-cookies */ \"./node_modules/vue-cookies/vue-cookies.js\");\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(VueCookies);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].$cookies.config('7d');\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].$cookies.set('theme', 'default');\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].$cookies.set('hover-time', '1s');\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(_ionic_vue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]); // router\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(_ionic_vue__WEBPACK_IMPORTED_MODULE_6__[\"IonicVueRouter\"]);\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount(\"#app\");\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _ionic_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/vue */ \"./node_modules/@ionic/vue/dist/ionic-vue.esm.js\");\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].use(_ionic_vue__WEBPACK_IMPORTED_MODULE_2__[\"IonicVueRouter\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new _ionic_vue__WEBPACK_IMPORTED_MODULE_2__[\"IonicVueRouter\"]({\n  mode: \"history\",\n  base: \"/\",\n  routes: [{\n    path: \"/\",\n    redirect: \"/home\"\n  }, {\n    path: \"/home\",\n    name: \"home\",\n    component: function component() {\n      return Promise.all(/*! import() | home */[__webpack_require__.e(\"home~new-item\"), __webpack_require__.e(\"home\")]).then(__webpack_require__.bind(null, /*! @/components/HomePage */ \"./src/components/HomePage.vue\"));\n    }\n  }, {\n    path: \"/new-item\",\n    name: \"new-item\",\n    component: function component() {\n      return Promise.all(/*! import() | new-item */[__webpack_require__.e(\"home~new-item\"), __webpack_require__.e(\"new-item\")]).then(__webpack_require__.bind(null, /*! @/components/NewItemPage */ \"./src/components/NewItemPage.vue\"));\n    }\n  }, {\n    path: \"/signup\",\n    name: \"signup\",\n    component: function component() {\n      return Promise.all(/*! import() | new-item */[__webpack_require__.e(\"home~new-item\"), __webpack_require__.e(\"new-item\")]).then(__webpack_require__.bind(null, /*! @/components/Register */ \"./src/components/Register.vue\"));\n    }\n  }, {\n    path: \"/dashboard\",\n    name: \"dashboard\",\n    component: function component() {\n      return Promise.all(/*! import() | new-item */[__webpack_require__.e(\"home~new-item\"), __webpack_require__.e(\"new-item\")]).then(__webpack_require__.bind(null, /*! @/components/Dashboard */ \"./src/components/Dashboard.vue\"));\n    }\n  }, {\n    path: \"/profiles/:id\",\n    name: \"profiles\",\n    component: function component() {\n      return Promise.all(/*! import() | new-item */[__webpack_require__.e(\"home~new-item\"), __webpack_require__.e(\"new-item\")]).then(__webpack_require__.bind(null, /*! @/components/Profile */ \"./src/components/Profile.vue\"));\n    }\n  }]\n}));\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });