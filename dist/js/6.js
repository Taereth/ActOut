(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/status-tap-a0df8284.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/status-tap-a0df8284.js ***!
  \**********************************************************************************************/
/*! exports provided: startStatusTap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startStatusTap\", function() { return startStatusTap; });\n/* harmony import */ var _core_ca0488fc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-ca0488fc.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/core-ca0488fc.js\");\n/* harmony import */ var _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-3c7f3790.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/config-3c7f3790.js\");\n\n\nvar startStatusTap = function () {\n    var win = window;\n    win.addEventListener('statusTap', function () {\n        Object(_core_ca0488fc_js__WEBPACK_IMPORTED_MODULE_0__[\"f\"])(function () {\n            var width = win.innerWidth;\n            var height = win.innerHeight;\n            var el = document.elementFromPoint(width / 2, height / 2);\n            if (!el) {\n                return;\n            }\n            var contentEl = el.closest('ion-content');\n            if (contentEl) {\n                contentEl.componentOnReady().then(function () {\n                    Object(_core_ca0488fc_js__WEBPACK_IMPORTED_MODULE_0__[\"w\"])(function () { return contentEl.scrollToTop(300); });\n                });\n            }\n        });\n    });\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/status-tap-a0df8284.js?");

/***/ })

}]);