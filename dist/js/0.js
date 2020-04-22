(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/framework-delegate-c2e2e1f4.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/framework-delegate-c2e2e1f4.js ***!
  \******************************************************************************************************/
/*! exports provided: a, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return attachComponent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return detachComponent; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n\nvar attachComponent = function (delegate, container, component, cssClasses, componentProps) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    var el;\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                if (delegate) {\n                    return [2 /*return*/, delegate.attachViewToDom(container, component, componentProps, cssClasses)];\n                }\n                if (typeof component !== 'string' && !(component instanceof HTMLElement)) {\n                    throw new Error('framework delegate is missing');\n                }\n                el = (typeof component === 'string')\n                    ? container.ownerDocument && container.ownerDocument.createElement(component)\n                    : component;\n                if (cssClasses) {\n                    cssClasses.forEach(function (c) { return el.classList.add(c); });\n                }\n                if (componentProps) {\n                    Object.assign(el, componentProps);\n                }\n                container.appendChild(el);\n                if (!el.componentOnReady) return [3 /*break*/, 2];\n                return [4 /*yield*/, el.componentOnReady()];\n            case 1:\n                _a.sent();\n                _a.label = 2;\n            case 2: return [2 /*return*/, el];\n        }\n    });\n}); };\nvar detachComponent = function (delegate, element) {\n    if (element) {\n        if (delegate) {\n            var container = element.parentElement;\n            return delegate.removeViewFromDom(container, element);\n        }\n        element.remove();\n    }\n    return Promise.resolve();\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/framework-delegate-c2e2e1f4.js?");

/***/ }),

/***/ "./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/index-6826f2f6.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/index-6826f2f6.js ***!
  \*****************************************************************************************/
/*! exports provided: d, g, l, s, t */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return deepReady; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"g\", function() { return getIonPageElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"l\", function() { return lifecycle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"s\", function() { return setPageHidden; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"t\", function() { return transition; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _core_ca0488fc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core-ca0488fc.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/core-ca0488fc.js\");\n/* harmony import */ var _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants-3c3e1099.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/constants-3c3e1099.js\");\n\n\n\nvar iosTransitionAnimation = function () { return __webpack_require__.e(/*! import() */ 89).then(__webpack_require__.bind(null, /*! ./ios.transition-071bd421.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/ios.transition-071bd421.js\")); };\nvar mdTransitionAnimation = function () { return __webpack_require__.e(/*! import() */ 90).then(__webpack_require__.bind(null, /*! ./md.transition-15a81b08.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/md.transition-15a81b08.js\")); };\nvar transition = function (opts) {\n    return new Promise(function (resolve, reject) {\n        Object(_core_ca0488fc_js__WEBPACK_IMPORTED_MODULE_1__[\"w\"])(function () {\n            beforeTransition(opts);\n            runTransition(opts).then(function (result) {\n                if (result.animation) {\n                    result.animation.destroy();\n                }\n                afterTransition(opts);\n                resolve(result);\n            }, function (error) {\n                afterTransition(opts);\n                reject(error);\n            });\n        });\n    });\n};\nvar beforeTransition = function (opts) {\n    var enteringEl = opts.enteringEl;\n    var leavingEl = opts.leavingEl;\n    setZIndex(enteringEl, leavingEl, opts.direction);\n    if (opts.showGoBack) {\n        enteringEl.classList.add('can-go-back');\n    }\n    else {\n        enteringEl.classList.remove('can-go-back');\n    }\n    setPageHidden(enteringEl, false);\n    if (leavingEl) {\n        setPageHidden(leavingEl, false);\n    }\n};\nvar runTransition = function (opts) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    var animationBuilder, ani;\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, getAnimationBuilder(opts)];\n            case 1:\n                animationBuilder = _a.sent();\n                ani = (animationBuilder)\n                    ? animation(animationBuilder, opts)\n                    : noAnimation(opts);\n                return [2 /*return*/, ani];\n        }\n    });\n}); };\nvar afterTransition = function (opts) {\n    var enteringEl = opts.enteringEl;\n    var leavingEl = opts.leavingEl;\n    enteringEl.classList.remove('ion-page-invisible');\n    if (leavingEl !== undefined) {\n        leavingEl.classList.remove('ion-page-invisible');\n    }\n};\nvar getAnimationBuilder = function (opts) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    var getAnimation, _a;\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_b) {\n        switch (_b.label) {\n            case 0:\n                if (!opts.leavingEl || !opts.animated || opts.duration === 0) {\n                    return [2 /*return*/, undefined];\n                }\n                if (opts.animationBuilder) {\n                    return [2 /*return*/, opts.animationBuilder];\n                }\n                if (!(opts.mode === 'ios')) return [3 /*break*/, 2];\n                return [4 /*yield*/, iosTransitionAnimation()];\n            case 1:\n                _a = (_b.sent()).iosTransitionAnimation;\n                return [3 /*break*/, 4];\n            case 2: return [4 /*yield*/, mdTransitionAnimation()];\n            case 3:\n                _a = (_b.sent()).mdTransitionAnimation;\n                _b.label = 4;\n            case 4:\n                getAnimation = _a;\n                return [2 /*return*/, getAnimation];\n        }\n    });\n}); };\nvar animation = function (animationBuilder, opts) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    var trans, mod, err_1, didComplete;\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, waitForReady(opts, true)];\n            case 1:\n                _a.sent();\n                _a.label = 2;\n            case 2:\n                _a.trys.push([2, 5, , 6]);\n                return [4 /*yield*/, __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ./index-69c37885.js */ \"./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/index-69c37885.js\"))];\n            case 3:\n                mod = _a.sent();\n                return [4 /*yield*/, mod.create(animationBuilder, opts.baseEl, opts)];\n            case 4:\n                trans = _a.sent();\n                return [3 /*break*/, 6];\n            case 5:\n                err_1 = _a.sent();\n                trans = animationBuilder(opts.baseEl, opts);\n                return [3 /*break*/, 6];\n            case 6:\n                fireWillEvents(opts.enteringEl, opts.leavingEl);\n                return [4 /*yield*/, playTransition(trans, opts)];\n            case 7:\n                didComplete = _a.sent();\n                if (opts.progressCallback) {\n                    opts.progressCallback(undefined);\n                }\n                if (didComplete) {\n                    fireDidEvents(opts.enteringEl, opts.leavingEl);\n                }\n                return [2 /*return*/, {\n                        hasCompleted: didComplete,\n                        animation: trans\n                    }];\n        }\n    });\n}); };\nvar noAnimation = function (opts) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    var enteringEl, leavingEl;\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                enteringEl = opts.enteringEl;\n                leavingEl = opts.leavingEl;\n                return [4 /*yield*/, waitForReady(opts, false)];\n            case 1:\n                _a.sent();\n                fireWillEvents(enteringEl, leavingEl);\n                fireDidEvents(enteringEl, leavingEl);\n                return [2 /*return*/, {\n                        hasCompleted: true\n                    }];\n        }\n    });\n}); };\nvar waitForReady = function (opts, defaultDeep) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    var deep, promises;\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                deep = opts.deepWait !== undefined ? opts.deepWait : defaultDeep;\n                promises = deep ? [\n                    deepReady(opts.enteringEl),\n                    deepReady(opts.leavingEl),\n                ] : [\n                    shallowReady(opts.enteringEl),\n                    shallowReady(opts.leavingEl),\n                ];\n                return [4 /*yield*/, Promise.all(promises)];\n            case 1:\n                _a.sent();\n                return [4 /*yield*/, notifyViewReady(opts.viewIsReady, opts.enteringEl)];\n            case 2:\n                _a.sent();\n                return [2 /*return*/];\n        }\n    });\n}); };\nvar notifyViewReady = function (viewIsReady, enteringEl) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                if (!viewIsReady) return [3 /*break*/, 2];\n                return [4 /*yield*/, viewIsReady(enteringEl)];\n            case 1:\n                _a.sent();\n                _a.label = 2;\n            case 2: return [2 /*return*/];\n        }\n    });\n}); };\nvar playTransition = function (trans, opts) {\n    var progressCallback = opts.progressCallback;\n    // TODO: Remove AnimationBuilder\n    var promise = new Promise(function (resolve) {\n        trans.onFinish(function (currentStep) {\n            if (typeof currentStep === 'number') {\n                resolve(currentStep === 1);\n            }\n            else if (trans.hasCompleted !== undefined) {\n                resolve(trans.hasCompleted);\n            }\n        });\n    });\n    // cool, let's do this, start the transition\n    if (progressCallback) {\n        // this is a swipe to go back, just get the transition progress ready\n        // kick off the swipe animation start\n        trans.progressStart(true);\n        progressCallback(trans);\n    }\n    else {\n        // only the top level transition should actually start \"play\"\n        // kick it off and let it play through\n        // ******** DOM WRITE ****************\n        trans.play();\n    }\n    // create a callback for when the animation is done\n    return promise;\n};\nvar fireWillEvents = function (enteringEl, leavingEl) {\n    lifecycle(leavingEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_2__[\"b\"]);\n    lifecycle(enteringEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_2__[\"L\"]);\n};\nvar fireDidEvents = function (enteringEl, leavingEl) {\n    lifecycle(enteringEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_2__[\"a\"]);\n    lifecycle(leavingEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_2__[\"c\"]);\n};\nvar lifecycle = function (el, eventName) {\n    if (el) {\n        var ev = new CustomEvent(eventName, {\n            bubbles: false,\n            cancelable: false,\n        });\n        el.dispatchEvent(ev);\n    }\n};\nvar shallowReady = function (el) {\n    if (el && el.componentOnReady) {\n        return el.componentOnReady();\n    }\n    return Promise.resolve();\n};\nvar deepReady = function (el) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"])(void 0, void 0, void 0, function () {\n    var element, stencilEl;\n    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                element = el;\n                if (!element) return [3 /*break*/, 4];\n                if (!(element.componentOnReady != null)) return [3 /*break*/, 2];\n                return [4 /*yield*/, element.componentOnReady()];\n            case 1:\n                stencilEl = _a.sent();\n                if (stencilEl != null) {\n                    return [2 /*return*/];\n                }\n                _a.label = 2;\n            case 2: return [4 /*yield*/, Promise.all(Array.from(element.children).map(deepReady))];\n            case 3:\n                _a.sent();\n                _a.label = 4;\n            case 4: return [2 /*return*/];\n        }\n    });\n}); };\nvar setPageHidden = function (el, hidden) {\n    if (hidden) {\n        el.setAttribute('aria-hidden', 'true');\n        el.classList.add('ion-page-hidden');\n    }\n    else {\n        el.hidden = false;\n        el.removeAttribute('aria-hidden');\n        el.classList.remove('ion-page-hidden');\n    }\n};\nvar setZIndex = function (enteringEl, leavingEl, direction) {\n    if (enteringEl !== undefined) {\n        enteringEl.style.zIndex = (direction === 'back')\n            ? '99'\n            : '101';\n    }\n    if (leavingEl !== undefined) {\n        leavingEl.style.zIndex = '100';\n    }\n};\nvar getIonPageElement = function (element) {\n    if (element.classList.contains('ion-page')) {\n        return element;\n    }\n    var ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');\n    if (ionPage) {\n        return ionPage;\n    }\n    // idk, return the original element so at least something animates and we don't have a null pointer\n    return element;\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@ionic/vue/node_modules/@ionic/core/dist/esm-es5/index-6826f2f6.js?");

/***/ })

}]);