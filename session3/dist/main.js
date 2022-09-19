/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ \"./src/model.js\");\n/* harmony import */ var _presenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presenter.js */ \"./src/presenter.js\");\n/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ \"./src/view.js\");\n\r\n\r\n\r\n\r\nfunction display(theView, persons, employees = []) {\r\n    const theModel = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(persons, employees)\r\n    const thePresenter = (0,_presenter_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(theModel, theView)\r\n    theView.listen(thePresenter.onAction)\r\n    theView.update(theModel)\r\n}\r\n\r\nasync function init() {\r\n    const theView = (0,_view_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(window)\r\n    try {\r\n        const response = await fetch('http://localhost:9090/persons')\r\n        if (!response.ok) throw response.statusText\r\n        const persons = await response.json()\r\n        const empRes = await fetch('http://localhost:9090/employees')\r\n        if (!empRes.ok) throw empRes.statusText\r\n        const employees = await empRes.json()\r\n        display(theView, persons, employees)\r\n    } catch (e) {\r\n        theView.displayError(e)\r\n    }\r\n}\r\n\r\ninit()\n\n//# sourceURL=webpack://server/./src/init.js?");

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst model = (persons, employees, filter = () => true) => {\r\n    const employeeMap = {}\r\n    employees.forEach(e => employeeMap[e.employeeId] = e)\r\n\r\n    const personData = () => persons\r\n        .map(p => ({ ...p, ...employeeMap[p.employeeId]}))\r\n        .filter(filter)\r\n\r\n    const updatePerson = p => model(persons.map(pp => p.id == pp.id? p : pp), employees, filter)\r\n    const addEmployee = e => model(persons, employees.concat(e), filter)\r\n\r\n    const filtered = filter => model(persons, employees, filter )\r\n    const all = () => model(persons, employees)\r\n\r\n    return { personData, updatePerson, addEmployee, filtered, all }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (model);\r\n\n\n//# sourceURL=webpack://server/./src/model.js?");

/***/ }),

/***/ "./src/presenter.js":
/*!**************************!*\
  !*** ./src/presenter.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((init_model, view) => {\r\n  let model = init_model\r\n\r\n  const onAction = async ({type, ...params}) =>  {\r\n    switch(type) {\r\n      case 'hire':\r\n        const { id } = params\r\n        const salary = view.prompt('Salary?')\r\n        if (salary) {\r\n          try {\r\n            const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }\r\n            const employeeResponse = await fetch('http://localhost:9090/employees', { method: 'POST', body: JSON.stringify({salary, manager:false}), headers })\r\n            if (!employeeResponse.ok) Error(employeeResponse.text)\r\n            const employee = await employeeResponse.json()\r\n            const personResponse = await fetch('http://localhost:9090/persons/' + id, { method: 'PATCH', body: JSON.stringify(employee), headers })\r\n            const person = await personResponse.json()\r\n            model = model.addEmployee(employee).updatePerson(person)\r\n            view.update(model)\r\n          } catch (e) {\r\n            view.displayError(e)\r\n          }\r\n        }\r\n        break;\r\n    }\r\n  }\r\n\r\n  return { onAction }\r\n});\r\n\n\n//# sourceURL=webpack://server/./src/presenter.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window => {\r\n    const document = window.document\r\n    const table_body = document.getElementById('employee_data')\r\n    const listeners = []\r\n\r\n    const listen = l => listeners.push(l)\r\n\r\n    const addPerson = p => {\r\n        const tr = table_body.appendChild(document.createElement('tr'))\r\n        tr.insertCell().appendChild(document.createTextNode(p.id))\r\n        tr.insertCell().appendChild(document.createTextNode(p.name))\r\n        if (p.employeeId) {\r\n            tr.insertCell().appendChild(document.createTextNode(p.employeeId))\r\n            tr.insertCell().appendChild(document.createTextNode(p.salary || 0))\r\n            tr.insertCell().appendChild(document.createTextNode(!!p.manager))\r\n        } else {\r\n            const button = tr.insertCell().appendChild(document.createElement('button'))\r\n            button.appendChild(document.createTextNode(\"Hire\"))\r\n            button.onclick = () => {\r\n                const event = { type: 'hire', id: p.id }\r\n                listeners.forEach(l => l(event))\r\n            }\r\n            tr.insertCell()\r\n            tr.insertCell()\r\n        }\r\n    }\r\n\r\n    const displayError = e => {\r\n        const msg_board = document.getElementById('error messages')\r\n        msg_board.innerText = e\r\n    }\r\n\r\n    const update = model => {\r\n        while(table_body.firstChild) table_body.removeChild(table_body.firstChild)\r\n        model.personData().forEach(addPerson)\r\n    }\r\n    const prompt = window.prompt.bind(window)\r\n\r\n    return { addPerson, update, listen, prompt, displayError }\r\n});\r\n\n\n//# sourceURL=webpack://server/./src/view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/init.js");
/******/ 	
/******/ })()
;