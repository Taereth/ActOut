(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/swipe-back-35ad8e37.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/swipe-back-35ad8e37.js ***!
  \**********************************************************************************************/
/*! exports provided: createSwipeBackGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSwipeBackGesture\", function() { return createSwipeBackGesture; });\n/* harmony import */ var _index_624eea58_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-624eea58.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/index-624eea58.js\");\n\nvar createSwipeBackGesture = function (el, canStartHandler, onStartHandler, onMoveHandler, onEndHandler) {\n    var win = el.ownerDocument.defaultView;\n    var canStart = function (detail) {\n        return detail.startX <= 50 && canStartHandler();\n    };\n    var onMove = function (detail) {\n        // set the transition animation's progress\n        var delta = detail.deltaX;\n        var stepValue = delta / win.innerWidth;\n        onMoveHandler(stepValue);\n    };\n    var onEnd = function (detail) {\n        // the swipe back gesture has ended\n        var delta = detail.deltaX;\n        var width = win.innerWidth;\n        var stepValue = delta / width;\n        var velocity = detail.velocityX;\n        var z = width / 2.0;\n        var shouldComplete = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);\n        var missing = shouldComplete ? 1 - stepValue : stepValue;\n        var missingDistance = missing * width;\n        var realDur = 0;\n        if (missingDistance > 5) {\n            var dur = missingDistance / Math.abs(velocity);\n            realDur = Math.min(dur, 540);\n        }\n        /**\n         * TODO: stepValue can sometimes return a negative\n         * value, but you can't have a negative time value\n         * for the cubic bezier curve (at least with web animations)\n         * Not sure if the negative step value is an error or not\n         */\n        onEndHandler(shouldComplete, (stepValue <= 0) ? 0.01 : stepValue, realDur);\n    };\n    return Object(_index_624eea58_js__WEBPACK_IMPORTED_MODULE_0__[\"createGesture\"])({\n        el: el,\n        gestureName: 'goback-swipe',\n        gesturePriority: 40,\n        threshold: 10,\n        canStart: canStart,\n        onStart: onStartHandler,\n        onMove: onMove,\n        onEnd: onEnd\n    });\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/swipe-back-35ad8e37.js?");

/***/ })

}]);