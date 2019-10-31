(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _form_midras_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form/midras-form.component */ "./src/app/form/midras-form.component.ts");
/* harmony import */ var _login_login_route_activator_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login-route-activator.service */ "./src/app/login/login-route-activator.service.ts");
/* harmony import */ var _final_page_success_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./final-page/success-page-component */ "./src/app/final-page/success-page-component.ts");







var routes = [
    { path: '', redirectTo: 'form', pathMatch: 'full' },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'form', component: _form_midras_form_component__WEBPACK_IMPORTED_MODULE_4__["MidrasFormComponent"], canActivate: [_login_login_route_activator_service__WEBPACK_IMPORTED_MODULE_5__["LoginRouteActivatorService"]] },
    { path: 'success-form', component: _final_page_success_page_component__WEBPACK_IMPORTED_MODULE_6__["SuccessPageComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\n\t<img src=\"/assets/5-5.jpg\" class=\"main-logo\">\n</header>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "header img {\n  margin: 3rem auto 3rem 3rem;\n  display: block;\n  height: 6rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFFSSw0QkFBMkI7RUFDM0IsZUFBYztFQUNkLGFBQVksRUFDYiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCJzdHlsZS9taXhpbi1tZWRpYVF1ZXJ5XCI7XG5cbmhlYWRlciB7XG4gIGltZyB7XG4gICAgbWFyZ2luOiAzcmVtIGF1dG8gM3JlbSAzcmVtO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogNnJlbTtcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'charts6';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form */ "./src/app/form/index.ts");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login */ "./src/app/login/index.ts");
/* harmony import */ var _form_form_elements_components_take_image_elements__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./form/form-elements-components/take-image-elements */ "./src/app/form/form-elements-components/take-image-elements/index.ts");
/* harmony import */ var _final_page_success_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./final-page/success-page-component */ "./src/app/final-page/success-page-component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _login__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["MidrasFormComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["SimpleFormComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["RadioComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["TextAreaComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["FootImageComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["VideosComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["InputComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["SelectComponent"],
                _final_page_success_page_component__WEBPACK_IMPORTED_MODULE_9__["SuccessPageComponent"],
                _form__WEBPACK_IMPORTED_MODULE_6__["BirthdayInputComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"]
            ],
            providers: [
                _login__WEBPACK_IMPORTED_MODULE_7__["UserAnthentityService"],
                _login__WEBPACK_IMPORTED_MODULE_7__["LoginRouteActivatorService"],
                _form__WEBPACK_IMPORTED_MODULE_6__["FormService"],
                _form_form_elements_components_take_image_elements__WEBPACK_IMPORTED_MODULE_8__["VideoService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/final-page/success-form-page.html":
/*!***************************************************!*\
  !*** ./src/app/final-page/success-form-page.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"success-page-container\">\n\t<h1 class=\"main-title\">טופס נשלח בהצלחה</h1>\n</div>\n"

/***/ }),

/***/ "./src/app/final-page/success-form-page.scss":
/*!***************************************************!*\
  !*** ./src/app/final-page/success-form-page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".success-page-container {\n  margin: 10rem 0; }\n\n.main-logo {\n  max-width: 40rem;\n  width: 80%;\n  margin: auto;\n  display: block; }\n\n.main-title {\n  color: #fff;\n  text-align: center;\n  font-weight: bold;\n  font-size: 3rem;\n  margin-top: 3rem; }\n\n@media only screen and (min-width: 768px) and (max-width: 1279px) {\n    .main-title {\n      font-size: 5rem; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9maW5hbC1wYWdlL3N1Y2Nlc3MtZm9ybS1wYWdlLnNjc3MiLCIvVXNlcnMvdHphZnJpci5yYXZlaC9XZWJzdG9ybVByb2plY3RzL2NhbnZhcy9jaGFydHM2L3NyYy9hcHAvc3R5bGUvX3ZhcmlibGUuc2NzcyIsIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9zdHlsZS9fbWl4aW4tbWVkaWFRdWVyeS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQ0UsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDRSxpQkFBZ0I7RUFDaEIsV0FBVTtFQUNWLGFBQVk7RUFDWixlQUFjLEVBQ2Y7O0FBRUQ7RUFDRSxZQ2RnQjtFRGVoQixtQkFBa0I7RUFDbEIsa0JBQWlCO0VBQ2pCLGdCQUFlO0VBQ2YsaUJBQWdCLEVBSWpCOztBRXdCRztJRmpDSjtNQU9JLGdCQUFlLEVBRWxCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9maW5hbC1wYWdlL3N1Y2Nlc3MtZm9ybS1wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vc3R5bGUvdmFyaWJsZVwiO1xuQGltcG9ydCBcIi4uL3N0eWxlL21peGluLW1lZGlhUXVlcnlcIjtcblxuLnN1Y2Nlc3MtcGFnZS1jb250YWluZXIge1xuICBtYXJnaW46IDEwcmVtIDA7XG59XG5cbi5tYWluLWxvZ28ge1xuICBtYXgtd2lkdGg6IDQwcmVtO1xuICB3aWR0aDogODAlO1xuICBtYXJnaW46IGF1dG87XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4ubWFpbi10aXRsZSB7XG4gIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgbWFyZ2luLXRvcDogM3JlbTtcbiAgQGluY2x1ZGUgcmVzcG9uZC10byh0YWJsZXQpe1xuICAgIGZvbnQtc2l6ZTogNXJlbTtcbiAgfVxufVxuIiwiJGNvbG9yLW1haW46ICMzYjQ2NWM7XG4kY29sb3Itd2hpdGU6ICNmZmY7XG4kY29sb3ItYmxhY2s6ICMwMDA7XG4kY29sb3ItZXJyb3I6ICNmZjlhOWE7XG4kY29sb3ItZ3JlZW46ICM0MzljNDM7XG4kY29sb3ItdW5zZWxlY3RlZDogIzU2NTg1NjtcbiRjb2xvci1kYXJrLWJsdWU6ICMyYTNkNjM7XG4iLCIkbW9iaWxlOiA3NjdweDtcbiR0YWJsZXQ6IDEyODBweDtcbiR1bml0OiAxO1xuJG1vYmlsZV9wbHVzXzE6ICgkbW9iaWxlICsgMSkgKiAkdW5pdDtcbiR0YWJsZXQ6ICR0YWJsZXQgKiAkdW5pdDtcbiR0YWJsZXRfbWludXNfMTogKCR0YWJsZXQgLSAxKSAqICR1bml0O1xuXG5AbWl4aW4gcmVzcG9uZC10bygkbWVkaWEpIHtcbiAgQGlmICRtZWRpYSA9PSBwb3J0cmFpdCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbiAgQGlmICRtZWRpYSA9PSBsYW5kc2NhcGUge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxuICBAaWYgJG1lZGlhID09IG1vYmlsZSB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbiAgQGlmICRtZWRpYSA9PSBtb2JpbGUtcG9ydHJhaXQge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxuICBAaWYgJG1lZGlhID09IG1vYmlsZS1sYW5kc2NhcGUge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IG1vYmlsZS10YWJsZXQge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJG1vYmlsZV9wbHVzXzEpIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0X21pbnVzXzEpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gbW9iaWxlLXRhYmxldC1wb3J0cmFpdCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlX3BsdXNfMSkgYW5kIChtYXgtd2lkdGg6ICR0YWJsZXRfbWludXNfMSkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gdGFibGV0IHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRtb2JpbGVfcGx1c18xKSBhbmQgKG1heC13aWR0aDogJHRhYmxldF9taW51c18xKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IHRhYmxldC1wb3J0cmFpdCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlX3BsdXNfMSkgYW5kIChtYXgtd2lkdGg6ICR0YWJsZXRfbWludXNfMSkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gdGFibGV0LWxhbmRzY2FwZSB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlX3BsdXNfMSkgYW5kIChtYXgtd2lkdGg6ICR0YWJsZXRfbWludXNfMSkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IGRlc2stdGFiIHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRtb2JpbGUpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gZGVza3RvcCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkdGFibGV0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IG5vZGVza3RvcCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/final-page/success-page-component.ts":
/*!******************************************************!*\
  !*** ./src/app/final-page/success-page-component.ts ***!
  \******************************************************/
/*! exports provided: SuccessPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessPageComponent", function() { return SuccessPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var SuccessPageComponent = /** @class */ (function () {
    function SuccessPageComponent(router) {
        this.router = router;
    }
    SuccessPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'success-form-page',
            template: __webpack_require__(/*! ./success-form-page.html */ "./src/app/final-page/success-form-page.html"),
            styles: [__webpack_require__(/*! ./success-form-page.scss */ "./src/app/final-page/success-form-page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SuccessPageComponent);
    return SuccessPageComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/birthday-input.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/form/form-elements-components/birthday-input.component.ts ***!
  \***************************************************************************/
/*! exports provided: BirthdayInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BirthdayInputComponent", function() { return BirthdayInputComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var BirthdayInputComponent = /** @class */ (function () {
    function BirthdayInputComponent() {
        this.currentYear = new Date().getFullYear();
    }
    BirthdayInputComponent.prototype.ngOnInit = function () {
        var formControlValidationNeededDay = this.inputBirthday.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required) : new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        var formControlValidationNeededMounth = this.inputBirthday.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required) : new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        var formControlValidationNeededYear = this.inputBirthday.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required) : new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.parentForm.addControl('birthdayDay', formControlValidationNeededDay);
        this.parentForm.addControl('birthdayMonth', formControlValidationNeededMounth);
        this.parentForm.addControl('birthdayYear', formControlValidationNeededYear);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], BirthdayInputComponent.prototype, "inputBirthday", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], BirthdayInputComponent.prototype, "parentForm", void 0);
    BirthdayInputComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'input-birthday',
            template: "\n<div [formGroup]=\"parentForm\">\n        <label>{{inputBirthday.title}}</label>\n        <div class=\"birthday--inputs\">\n        <input\n         formControlName=\"birthdayDay\"\n         max=\"31\"\n         id=\"birthdayDay\" type=\"number\" name=\"birthdayDay\"/>\n        <span>/</span>\n        <input\n         formControlName=\"birthdayMonth\"\n         max=\"12\"\n         id=\"birthdayMonth\" type=\"number\" name=\"birthdayMonth\"/>\n        <span>/</span>\n        <input\n         formControlName=\"birthdayYear\"\n         max=\"{{currentYear}}\"\n         min=\"1900\"\n         id=\"birthdayYear\" type=\"number\" name=\"birthdayYear\"/>\n        </div>\n         </div>\n    ",
            styles: ["\n    .birthday--inputs {\n        display:flex;\n        justify-content: flex-start;\n    }\n    .birthday--inputs input {\n        width: 5rem;\n        margin: 0 .25rem;\n    }\n    "]
        })
    ], BirthdayInputComponent);
    return BirthdayInputComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/index.ts":
/*!********************************************************!*\
  !*** ./src/app/form/form-elements-components/index.ts ***!
  \********************************************************/
/*! exports provided: TextAreaComponent, RadioComponent, InputComponent, FootImageComponent, VideosComponent, VideoService, SimpleFormComponent, SelectComponent, BirthdayInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _textArea_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./textArea.component */ "./src/app/form/form-elements-components/textArea.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextAreaComponent", function() { return _textArea_component__WEBPACK_IMPORTED_MODULE_0__["TextAreaComponent"]; });

/* harmony import */ var _radio_component_radio_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./radio-component/radio.component */ "./src/app/form/form-elements-components/radio-component/radio.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioComponent", function() { return _radio_component_radio_component__WEBPACK_IMPORTED_MODULE_1__["RadioComponent"]; });

/* harmony import */ var _input_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.component */ "./src/app/form/form-elements-components/input.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputComponent", function() { return _input_component__WEBPACK_IMPORTED_MODULE_2__["InputComponent"]; });

/* harmony import */ var _take_image_elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./take-image-elements */ "./src/app/form/form-elements-components/take-image-elements/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FootImageComponent", function() { return _take_image_elements__WEBPACK_IMPORTED_MODULE_3__["FootImageComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return _take_image_elements__WEBPACK_IMPORTED_MODULE_3__["VideosComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoService", function() { return _take_image_elements__WEBPACK_IMPORTED_MODULE_3__["VideoService"]; });

/* harmony import */ var _simple_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simple-form.component */ "./src/app/form/form-elements-components/simple-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleFormComponent", function() { return _simple_form_component__WEBPACK_IMPORTED_MODULE_4__["SimpleFormComponent"]; });

/* harmony import */ var _select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./select.component */ "./src/app/form/form-elements-components/select.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return _select_component__WEBPACK_IMPORTED_MODULE_5__["SelectComponent"]; });

/* harmony import */ var _birthday_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./birthday-input.component */ "./src/app/form/form-elements-components/birthday-input.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BirthdayInputComponent", function() { return _birthday_input_component__WEBPACK_IMPORTED_MODULE_6__["BirthdayInputComponent"]; });










/***/ }),

/***/ "./src/app/form/form-elements-components/input.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/form/form-elements-components/input.component.ts ***!
  \******************************************************************/
/*! exports provided: InputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputComponent", function() { return InputComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var InputComponent = /** @class */ (function () {
    function InputComponent() {
    }
    InputComponent.prototype.ngOnInit = function () {
        if (this.inputElem.maxDate) {
            var day = void 0;
            var mounth = void 0;
            day = this.inputElem.maxDate.getDate();
            mounth = this.inputElem.maxDate.getMonth() + 1;
            var year = this.inputElem.maxDate.getFullYear();
            day = day < 10 ? '0' + day : day;
            mounth = mounth < 10 ? '0' + mounth : mounth;
            var date = year + "-" + mounth + "-" + day;
            this.inputElem.maxDateParsed = date;
        }
        var formControlValidationNeeded = this.inputElem.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required) : new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.parentForm.addControl(this.inputElem.name, formControlValidationNeeded);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], InputComponent.prototype, "inputElem", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], InputComponent.prototype, "parentForm", void 0);
    InputComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'input-component',
            template: "\n<div [formGroup]=\"parentForm\">\n        <label for=\"{{inputElem.id}}\"> {{inputElem.label}}\n        </label>\n        <input\n         formControlName=\"{{inputElem.name}}\"\n         [attr.max]=\"inputElem.maxDate ? inputElem.maxDateParsed : null\"\n         [attr.min]=\"inputElem.maxDate ? '1900-01-01' : null\"\n         id=\"{{inputElem.id}}\" type=\"{{inputElem.type}}\" name=\"{{inputElem.name}}\"\n         [attr.required]=\"inputElem.required ? '' : null\"\n         [attr.placeholder]=\"inputElem.placeholder ? inputElem.placeholder : null\"/>\n         </div>\n    "
        })
    ], InputComponent);
    return InputComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/radio-component/radio-component.html":
/*!************************************************************************************!*\
  !*** ./src/app/form/form-elements-components/radio-component/radio-component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"radios-container\" [formGroup]=\"parentForm\" >\n\t<ng-template let-isRequired=\"radios.required\" ngFor let-radioElem [ngForOf]=\"radio.elements\">\n\t\t<label for=\"{{radioElem.id}}\" [ngClass]=\"{'checked': parentForm.controls[radio.name].value == radioElem.label,'radio__image-include':radioElem.imgs}\">\n\t\t\t<input (change)=\"handleChange($event)\"\n\t\t\t\t   formControlName=\"{{radio.name}}\"\n\t\t\t\t   [attr.required]=\"radio.required ? '' : null\"\n\t\t\t\t   type=\"radio\"\n\t\t\t\t   id=\"{{radioElem.id}}\"\n\t\t\t\t   value=\"{{radioElem.label}}\"\n\t\t\t\t   class=\"radio-elem\"\n\t\t\t>\n\t\t\t<img *ngIf=\"mainImageNeeded(radioElem)\" src=\"{{radioElem.imgs[0].src}}\" class=\"radio-image\">\n\t\t\t<img *ngIf=\"radioElem.imgs && radioElem.imgs[1]  && parentForm.controls[radio.name].value == radioElem.label\" src=\"{{radioElem.imgs[1].src}}\" class=\"radio-image\">\n\t\t\t<span class=\"radio-text\">\n            {{radioElem.label}}\n            </span>\n\t\t</label>\n\t</ng-template>\n</div>\n"

/***/ }),

/***/ "./src/app/form/form-elements-components/radio-component/radio.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/form/form-elements-components/radio-component/radio.component.ts ***!
  \**********************************************************************************/
/*! exports provided: RadioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadioComponent", function() { return RadioComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var RadioComponent = /** @class */ (function () {
    function RadioComponent() {
        this.nextSlide = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    RadioComponent.prototype.ngOnInit = function () {
        var formControlValidationNeeded = this.radio.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required) : new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.parentForm.addControl(this.radio.name, formControlValidationNeeded);
    };
    RadioComponent.prototype.handleChange = function (event) {
        setTimeout(function () { this.nextSlide.emit(); }.bind(this), 500);
    };
    RadioComponent.prototype.mainImageNeeded = function (radioElem) {
        if (radioElem.imgs && radioElem.imgs[1]) {
            return this.parentForm.controls[this.radio.name].value != radioElem.label;
        }
        else if (radioElem.imgs) {
            return true;
        }
        return false;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], RadioComponent.prototype, "radio", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], RadioComponent.prototype, "parentForm", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], RadioComponent.prototype, "nextSlide", void 0);
    RadioComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'input-radio',
            template: __webpack_require__(/*! ./radio-component.html */ "./src/app/form/form-elements-components/radio-component/radio-component.html"),
            styles: [__webpack_require__(/*! ./radio.scss */ "./src/app/form/form-elements-components/radio-component/radio.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], RadioComponent);
    return RadioComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/radio-component/radio.scss":
/*!**************************************************************************!*\
  !*** ./src/app/form/form-elements-components/radio-component/radio.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".radios-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n\nlabel {\n  background-color: #565856;\n  padding: .5rem;\n  width: 10rem;\n  height: 10rem;\n  display: table-cell;\n  vertical-align: middle;\n  transition: .4s;\n  font-size: 2.5rem;\n  margin: 0 1rem 1rem;\n  position: relative;\n  text-align: center;\n  border-radius: 1.5rem; }\n\nlabel.checked {\n    background-color: #439c43; }\n\n.customer-details__form .radios__container label {\n    height: 4rem;\n    width: 6rem;\n    margin: 1rem 1rem;\n    display: inline-block;\n    font-size: 2rem; }\n\ninput {\n  position: absolute;\n  visibility: hidden; }\n\ninput:checked ~ label {\n  background-color: #439c43; }\n\n.radio-text {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 100%;\n  line-height: 1.5;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%); }\n\n.radio-image {\n  width: 6rem; }\n\n.radio__image-include {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around; }\n\n.radio__image-include .radio-text {\n    font-size: 2rem;\n    position: static;\n    -webkit-transform: none;\n            transform: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9mb3JtL2Zvcm0tZWxlbWVudHMtY29tcG9uZW50cy9yYWRpby1jb21wb25lbnQvcmFkaW8uc2NzcyIsIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9zdHlsZS9fdmFyaWJsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsY0FBYTtFQUNiLGdCQUFlO0VBQ2Ysd0JBQXVCLEVBQ3hCOztBQUVEO0VBQ0UsMEJDSndCO0VES3hCLGVBQWM7RUFDZCxhQUFZO0VBQ1osY0FBYTtFQUNiLG9CQUFtQjtFQUNuQix1QkFBc0I7RUFDdEIsZ0JBQWU7RUFDZixrQkFBaUI7RUFDakIsb0JBQW1CO0VBQ25CLG1CQUFrQjtFQUNsQixtQkFBa0I7RUFDbEIsc0JBQXFCLEVBWXRCOztBQXhCRDtJQWNJLDBCQ2xCaUIsRURtQmxCOztBQUVEO0lBQ0UsYUFBWTtJQUNaLFlBQVc7SUFDWCxrQkFBaUI7SUFDakIsc0JBQXFCO0lBQ3JCLGdCQUFlLEVBQ2hCOztBQUdIO0VBQ0UsbUJBQWtCO0VBQ2xCLG1CQUFrQixFQUNuQjs7QUFFRDtFQUNFLDBCQ3BDbUIsRURxQ3BCOztBQUVEO0VBQ0UsbUJBQWtCO0VBQ2xCLFNBQVE7RUFDUixRQUFPO0VBQ1AsWUFBVztFQUNYLGlCQUFnQjtFQUNoQixvQ0FBMkI7VUFBM0IsNEJBQTJCLEVBQzVCOztBQUVEO0VBQ0UsWUFBVyxFQUNaOztBQUVEO0VBQ0UsY0FBYTtFQUNiLHVCQUFzQjtFQUN0QixvQkFBbUI7RUFDbkIsOEJBQTZCLEVBTTlCOztBQVZEO0lBTUksZ0JBQWU7SUFDZixpQkFBZ0I7SUFDaEIsd0JBQWU7WUFBZixnQkFBZSxFQUNoQiIsImZpbGUiOiJzcmMvYXBwL2Zvcm0vZm9ybS1lbGVtZW50cy1jb21wb25lbnRzL3JhZGlvLWNvbXBvbmVudC9yYWRpby5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uL3N0eWxlL3ZhcmlibGVcIjtcblxuLnJhZGlvcy1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5sYWJlbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci11bnNlbGVjdGVkO1xuICBwYWRkaW5nOiAuNXJlbTtcbiAgd2lkdGg6IDEwcmVtO1xuICBoZWlnaHQ6IDEwcmVtO1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB0cmFuc2l0aW9uOiAuNHM7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xuICBtYXJnaW46IDAgMXJlbSAxcmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMS41cmVtO1xuICAmLmNoZWNrZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1ncmVlbjtcbiAgfVxuXG4gIC5jdXN0b21lci1kZXRhaWxzX19mb3JtIC5yYWRpb3NfX2NvbnRhaW5lciAmIHtcbiAgICBoZWlnaHQ6IDRyZW07XG4gICAgd2lkdGg6IDZyZW07XG4gICAgbWFyZ2luOiAxcmVtIDFyZW07XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgfVxufVxuXG5pbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG5pbnB1dDpjaGVja2VkIH4gbGFiZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItZ3JlZW47XG59XG5cbi5yYWRpby10ZXh0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbn1cblxuLnJhZGlvLWltYWdlIHtcbiAgd2lkdGg6IDZyZW07XG59XG5cbi5yYWRpb19faW1hZ2UtaW5jbHVkZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAucmFkaW8tdGV4dCB7XG4gICAgZm9udC1zaXplOiAycmVtO1xuICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgdHJhbnNmb3JtOiBub25lO1xuICB9XG59XG4iLCIkY29sb3ItbWFpbjogIzNiNDY1YztcbiRjb2xvci13aGl0ZTogI2ZmZjtcbiRjb2xvci1ibGFjazogIzAwMDtcbiRjb2xvci1lcnJvcjogI2ZmOWE5YTtcbiRjb2xvci1ncmVlbjogIzQzOWM0MztcbiRjb2xvci11bnNlbGVjdGVkOiAjNTY1ODU2O1xuJGNvbG9yLWRhcmstYmx1ZTogIzJhM2Q2MztcbiJdfQ== */"

/***/ }),

/***/ "./src/app/form/form-elements-components/select.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/form/form-elements-components/select.component.ts ***!
  \*******************************************************************/
/*! exports provided: SelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return SelectComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
    }
    SelectComponent.prototype.ngOnInit = function () {
        var formControlValidationNeeded = this.selectElem.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required) : new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.parentForm.addControl(this.selectElem.name, formControlValidationNeeded);
    };
    SelectComponent.prototype.checkDefaultValue = function (hidden, disable, defaultSelect, value, text) {
        if (hidden && disable && defaultSelect) {
            return '';
        }
        else if (value) {
            return value;
        }
        else {
            return text;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SelectComponent.prototype, "selectElem", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], SelectComponent.prototype, "parentForm", void 0);
    SelectComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'select-component',
            template: "\n<div [formGroup]=\"parentForm\">\n        <label *ngIf=\"selectElem.label\" [attr.for]=\"selectElem.id ? selectElem.id : null\">{{selectElem.label}}</label>\n        <div class=\"select-container\">\n            <span class=\"arrow\"></span>\n            <select\n                [attr.id]=\"selectElem.id ? selectElem.id : null\"\n                name=\"{{selectElem.name}}\"\n                [attr.required]=\"selectElem.required ? '' : null\"\n                formControlName=\"{{selectElem.name}}\"\n                >\n                <option *ngFor=\"let option of selectElem.options\"\n                 [attr.selected]=\"option.defaultSelect? '': null\"\n                 [attr.disabled]=\"option.disabled? '': null\"\n                 [attr.hidden]=\"option.hidden? '': null\"\n                 [value]=\"checkDefaultValue(option.hidden, option.disabled, option.defaultSelect, option.value, option.text)\">{{option.text}}</option>\n            </select>\n        </div>\n        </div>\n    ",
            styles: ["\n        select {\n            background-color: #fff;\n            border: 0;\n            border-radius: 0;\n            height: 2.8rem;\n            width: 17.3rem;\n            -webkit-appearance: none;\n            appearance: none;\n            padding-right: .5rem;\n        }\n        .select-container {\n            position: relative;\n            width: fit-content;\n        }\n    "]
        })
    ], SelectComponent);
    return SelectComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/simple-form.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/form/form-elements-components/simple-form.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let elem of customerForm\" [ngClass]=\"elem.class\" [formGroup]=\"parentForm\" class=\"input__container\">\n\t<div class=\"radios__container\" *ngIf=\"elem.radio\">\n\t\t<input-radio [parentForm]=\"parentForm\" [radio]=\"elem.radio\"></input-radio>\n\t</div>\n\t<textarea-component [parentForm]=\"parentForm\" *ngIf=\"elem.textarea\" [ta]=\"elem.textarea\"></textarea-component>\n\t<input-component [parentForm]=\"parentForm\" *ngIf=\"elem.input\" [inputElem]=\"elem.input\"></input-component>\n\t<input-birthday [parentForm]=\"parentForm\" *ngIf=\"elem.inputBirthday\" [inputBirthday]=\"elem.inputBirthday\"></input-birthday>\n\t<select-component [parentForm]=\"parentForm\" *ngIf=\"elem.select\" [selectElem]=\"elem.select\"></select-component>\n</div>\n"

/***/ }),

/***/ "./src/app/form/form-elements-components/simple-form.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/form/form-elements-components/simple-form.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".input__container {\n  overflow: hidden;\n  flex: 0 0 50%; }\n  .input__container:first-child {\n    flex: 0 0 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9mb3JtL2Zvcm0tZWxlbWVudHMtY29tcG9uZW50cy9zaW1wbGUtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGlCQUFnQjtFQUNoQixjQUFhLEVBS2Q7RUFQRDtJQUtJLGVBQWMsRUFDZiIsImZpbGUiOiJzcmMvYXBwL2Zvcm0vZm9ybS1lbGVtZW50cy1jb21wb25lbnRzL3NpbXBsZS1mb3JtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3N0eWxlL21peGluLW1lZGlhUXVlcnlcIjtcblxuLmlucHV0X19jb250YWluZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBmbGV4OiAwIDAgNTAlO1xuXG4gICY6Zmlyc3QtY2hpbGQge1xuICAgIGZsZXg6IDAgMCAxMDAlO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/form/form-elements-components/simple-form.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/form/form-elements-components/simple-form.component.ts ***!
  \************************************************************************/
/*! exports provided: SimpleFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleFormComponent", function() { return SimpleFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var SimpleFormComponent = /** @class */ (function () {
    function SimpleFormComponent() {
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], SimpleFormComponent.prototype, "customerForm", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], SimpleFormComponent.prototype, "parentForm", void 0);
    SimpleFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'simple-form',
            template: __webpack_require__(/*! ./simple-form.component.html */ "./src/app/form/form-elements-components/simple-form.component.html"),
            styles: [__webpack_require__(/*! ./simple-form.component.scss */ "./src/app/form/form-elements-components/simple-form.component.scss")]
        })
    ], SimpleFormComponent);
    return SimpleFormComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/take-image-elements/foot-image-component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/form/form-elements-components/take-image-elements/foot-image-component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"foot-image__container\" [formGroup]=\"parentForm\">\n\t<div class=\"leg-layout\">\n\t\t<label>\n\t\t\t<input type=\"radio\" name=\"legLine\" id=\"legNormal\" class=\"leg-layout__radio\" checked>\n\t\t\t<img src=\"assets/SoftwareIcons_Natural02.png\" class=\"leg-lyaout__selected\">\n\t\t\t<img src=\"assets/SoftwareIcons_Natural01.png\" class=\"leg-lyaout__unselected\">\n\t\t\t<p>ניטראלית</p>\n\t\t</label>\n\t\t<label>\n\t\t\t<input type=\"radio\" name=\"legLine\" id=\"legInside\" class=\"leg-layout__radio\">\n\t\t\t<img src=\"assets/SoftwareIcons_Pronation02.png\" class=\"leg-lyaout__selected\">\n\t\t\t<img src=\"assets/SoftwareIcons_Pronation01.png\" class=\"leg-lyaout__unselected\">\n\t\t\t<p>נטיה פינמה</p>\n\t\t</label>\n\t\t<label>\n\t\t\t<input type=\"radio\" name=\"legLine\" id=\"legOutside\" class=\"leg-layout__radio\">\n\t\t\t<img src=\"assets/SoftwareIcons_Supination02.png\" class=\"leg-lyaout__selected\">\n\t\t\t<img src=\"assets/SoftwareIcons_Supination01.png\" class=\"leg-lyaout__unselected\">\n\t\t\t<p>נטיה החוצה</p>\n\t\t</label>\n\t</div>\n\n\t<canvas #canvas [ngClass]=\"{'video-camera--on':!cameraOn}\" (click)=\"updateLine($event)\"\n\t\t\t[width]=\"canvasParams.canvasWidth\" [height]=\"canvasParams.canvasHight\"></canvas>\n\t<br/>\n\t<video-capture *ngIf=\"!killVideo\" (takePhoto)=\"captureImage($event)\"></video-capture>\n\n\t<div class=\"take-image__container\">\n\n\t\t<div class=\"take-image__thumbnail\">\n\t\t\t<canvas width=\"100\" #thumbnailGalleryItem height=\"100\" *ngFor=\"let img of thumbnailGalleryAmount;let i = index\" (click)=\"updateMainImage(i)\" class=\"foot__image__thumbnail\"></canvas>\n\t\t</div>\n\n\t\t<div class=\"take-image__file\">\n\t\t\t<label class=\"choose-file__btn take-image__item\" for=\"fileSystem\"> בחר קובץ\n\t\t\t\t<input (change)=\"updateImageFromFile($event)\" type=\"file\" id=\"fileSystem\" multiple accept=\"image/*\">\n\t\t\t</label>\n\t\t</div>\n\n\t\t<!--<div class=\"take-image__camera\">\n\t\t\t<div class=\"take-image__item&#45;&#45;container\" *ngFor=\"let img of thumbnailGalleryAmount;let i = index\">\n\t\t\t\t<button *ngIf=\"!isMobileDevice()\" [attr.data-index]=\"i\" class=\"choose-file__btn take-image__item\" (click)=\"activateCamera($event, i)\">\n\t\t\t\t\tהפעל מצלמה\n\t\t\t\t</button>\n\t\t\t\t<label *ngIf=\"isMobileDevice()\" class=\"choose-file__btn take-image__item\" for=\"cameraFile{{i}}\"> צלם\n\t\t\t\t\t<input (change)=\"updateImageFromFile($event, i)\" [attr.data-index]=\"i\" type=\"file\" id=\"cameraFile{{i}}\" accept=\"image/*\"\n\t\t\t\t\t\t   capture=\"camera\">\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t</div>-->\n\n\t\t<div class=\"take-image__camera\">\n\t\t\t<div class=\"take-image__item--container\">\n\t\t\t\t<button *ngIf=\"!isMobileDevice()\" class=\"choose-file__btn take-image__item\" (click)=\"activateCamera($event)\">\n\t\t\t\t\tהפעל מצלמה\n\t\t\t\t</button>\n\t\t\t\t<label *ngIf=\"isMobileDevice()\" class=\"choose-file__btn take-image__item\" for=\"cameraFile\"> צלם\n\t\t\t\t\t<input (change)=\"updateImageFromFile($event)\" type=\"file\" id=\"cameraFile\" accept=\"image/*\"\n\t\t\t\t\t\t   capture=\"camera\">\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/form/form-elements-components/take-image-elements/foot-image-component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/form/form-elements-components/take-image-elements/foot-image-component.ts ***!
  \*******************************************************************************************/
/*! exports provided: FootImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FootImageComponent", function() { return FootImageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _video_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./video.service */ "./src/app/form/form-elements-components/take-image-elements/video.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");




var FootImageComponent = /** @class */ (function () {
    function FootImageComponent(videoService) {
        this.videoService = videoService;
        this.currentCameraInput = 0;
        this.killVideo = true;
        this.cameraOn = false;
        this.canvasParams = {
            right: 280,
            left: 20,
            images: [],
            canvasWidth: 0,
            canvasHight: 0
        };
        this.thumbnailGalleryAmount = [];
        this.cameraOn = false;
    }
    FootImageComponent.prototype.onResize = function (event) {
        this.updateCanvasSize();
        setTimeout(this.updateCanvasElements.bind(this), 0); //wait for resize to finish
    };
    FootImageComponent.prototype.ngAfterViewInit = function () {
        setTimeout(function () {
            this.updateCanvasSize();
            this.canvasParams.right = this.canvasParams.canvasWidth * 0.8;
            this.canvasParams.left = this.canvasParams.canvasWidth * 0.2;
            this.canvasContext = this.canvas.nativeElement.getContext('2d');
            // this.updateCanvasElements();
            setTimeout(this.updateCanvasElements.bind(this, this.currentCameraInput), 0); //wait for resize to finish
            this.canvasParams.images = ['assets/SoftwareIcons_Type01.png',
                'assets/SoftwareIcons_Type01.png',
                'assets/SoftwareIcons_Type01.png'];
            this.thumbnailGalleryAmount[this.canvasParams.images.length - 1] = '';
            // this.initThumbnailPlaceHolder('../../../../assets/SoftwareIcons_Type01.png');
            this.initThumbnailPlaceHolder();
        }.bind(this));
        this.parentForm.addControl('image0', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]());
        this.parentForm.addControl('image1', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]());
        this.parentForm.addControl('image2', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]());
    };
    FootImageComponent.prototype.ngOnInit = function () {
        this.videoService.change.subscribe(function (event) {
            this.updateImageFromVideo(event);
        }.bind(this));
        this.videoService.cameraOn.subscribe(function () {
            this.killVideo = false;
        }.bind(this));
    };
    FootImageComponent.prototype.activateCamera = function (event, index) {
        if (event !== 'continues') {
            this.currentCameraInput = 0;
        }
        this.cameraOn = true;
        this.videoService.activeCamera();
    };
    FootImageComponent.prototype.updateCanvasSize = function () {
        this.canvasParams.canvasWidth = Math.floor(this.canvas.nativeElement.offsetWidth);
        this.canvasParams.canvasHight = Math.floor(this.canvas.nativeElement.offsetHeight);
    };
    FootImageComponent.prototype.updateLine = function (event) {
        event.preventDefault();
        this.canvasContext.clearRect(0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHight);
        if (event.offsetX > this.canvasParams.canvasWidth / 2) {
            this.canvasParams.right = event.offsetX;
        }
        else {
            this.canvasParams.left = event.offsetX;
        }
        this.updateCanvasElements();
    };
    FootImageComponent.prototype.updateCanvasElements = function () {
        //image
        if (this.canvasParams.images[this.currentCameraInput]) {
            this.canvasContext.drawImage(this.canvasParams.images[this.currentCameraInput], 0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHight);
        }
        //right
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5, 3]);
        this.canvasContext.moveTo(this.canvasParams.right, 0);
        this.canvasContext.lineTo(this.canvasParams.right, this.canvasParams.canvasHight);
        this.canvasContext.lineWidth = 4;
        this.canvasContext.stroke();
        //left
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5, 3]);
        this.canvasContext.moveTo(this.canvasParams.left, 0);
        this.canvasContext.lineTo(this.canvasParams.left, this.canvasParams.canvasHight);
        this.canvasContext.lineWidth = 4;
        this.canvasContext.stroke();
    };
    FootImageComponent.prototype.updateImageFromVideo = function (videoElement) {
        this.drew(videoElement, this.currentCameraInput);
        this.cameraOn = false;
        this.killVideo = true;
        this.currentCameraInput++;
        if (this.currentCameraInput === 3) {
            this.currentCameraInput = 0;
        }
        else {
            setTimeout(this.activateCamera.bind(this, 'continues', ''));
        }
    };
    FootImageComponent.prototype.updateImageFromFile = function (event, index) {
        for (var i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i] || i < 3) {
                var img = new Image();
                img.onload = this.drew.bind(this, img, i);
                img.onerror = this.failed;
                img.src = URL.createObjectURL(event.target.files[i]);
            }
            else {
                break;
            }
        }
    };
    FootImageComponent.prototype.updateFormWithImage = function (image, index) {
        this.canvas.nativeElement.toBlob(function (blob) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onloadend = function () {
                var base64data = fileReader.result;
                this.parentForm.controls["image" + index].setValue(base64data);
            }.bind(this);
        }.bind(this));
    };
    FootImageComponent.prototype.updateCanvasThumbnails = function (image, index) {
        var thumbContext = this.thumbnailGalleryItem.toArray()[index].nativeElement.getContext('2d');
        thumbContext.drawImage(image, 0, 0, 100, 100);
    };
    FootImageComponent.prototype.drew = function (image, index) {
        this.currentCameraInput = index;
        this.canvasParams.images[this.currentCameraInput] = image;
        this.updateCanvasThumbnails(image, index);
        this.updateCanvasElements();
        this.updateFormWithImage(image, index);
    };
    FootImageComponent.prototype.failed = function () {
        console.log('dammmmm!');
    };
    FootImageComponent.prototype.isMobileDevice = function () {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    ;
    FootImageComponent.prototype.updateMainImage = function (index) {
        this.currentCameraInput = index;
        this.updateCanvasElements();
    };
    FootImageComponent.prototype.initThumbnailPlaceHolder = function (fileDir) {
        var img = new Image();
        img.onload = function (img) {
            this.canvasParams.images.push(img);
            this.canvasParams.images.push(img);
            this.canvasParams.images.push(img);
        }.bind(this, img);
        img.onerror = this.failed;
        img.src = fileDir;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('canvas'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], FootImageComponent.prototype, "canvas", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"])('thumbnailGalleryItem'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
    ], FootImageComponent.prototype, "thumbnailGalleryItem", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"])
    ], FootImageComponent.prototype, "parentForm", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:resize', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], FootImageComponent.prototype, "onResize", null);
    FootImageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'foot-image',
            template: __webpack_require__(/*! ./foot-image-component.html */ "./src/app/form/form-elements-components/take-image-elements/foot-image-component.html"),
            styles: [__webpack_require__(/*! ./foot-image.component.scss */ "./src/app/form/form-elements-components/take-image-elements/foot-image.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_video_service__WEBPACK_IMPORTED_MODULE_2__["VideoService"]])
    ], FootImageComponent);
    return FootImageComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/take-image-elements/foot-image.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/form/form-elements-components/take-image-elements/foot-image.component.scss ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".foot-image__container {\n  display: flex;\n  justify-content: space-evenly; }\n  @media only screen and (max-width: 1280px) {\n    .foot-image__container {\n      display: block; } }\n  #file {\n  position: absolute;\n  visibility: hidden; }\n  .choose-file__btn {\n  background-color: #439c43;\n  padding: 1rem;\n  margin: 0 1rem;\n  position: relative;\n  height: 10rem; }\n  .choose-file__btn input {\n    position: absolute;\n    visibility: hidden; }\n  @media only screen and (max-width: 767px) {\n    .choose-file__btn {\n      line-height: 6rem;\n      margin: 1rem;\n      height: auto; } }\n  canvas {\n  background-color: #fff;\n  width: 95vw;\n  max-width: 74rem;\n  max-height: 55rem;\n  height: calc(95vw * 0.75);\n  margin: 0 auto 1rem;\n  display: none; }\n  @media only screen and (max-width: 767px) {\n    canvas {\n      height: calc(95vw * 0.5625); } }\n  @media only screen and (min-width: 1280px) {\n    canvas {\n      margin: 0; } }\n  .video-camera--on {\n  display: block; }\n  .foot-layout, .leg-layout {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  position: relative; }\n  .foot-layout p, .leg-layout p {\n    color: #565856; }\n  @media only screen and (min-width: 1280px) {\n    .foot-layout, .leg-layout {\n      flex-direction: column; } }\n  .leg-layout {\n  justify-content: space-evenly; }\n  .leg-lyaout__selected, .leg-lyaout__unselected {\n  width: 9rem;\n  padding: 0 2rem; }\n  .leg-lyaout__selected {\n  display: none; }\n  .leg-lyaout__unselected {\n  display: block; }\n  .leg-layout__radio {\n  position: absolute;\n  visibility: hidden; }\n  .leg-layout__radio:checked ~ .leg-lyaout__selected {\n  display: block; }\n  .leg-layout__radio:checked ~ .leg-lyaout__unselected {\n  display: none; }\n  .leg-layout__radio:checked ~ p {\n  color: #fff; }\n  .take-image__container {\n  display: flex;\n  justify-content: space-evenly; }\n  @media only screen and (max-width: 767px) {\n    .take-image__container {\n      justify-content: space-around; } }\n  .take-image__container .take-image__file, .take-image__container .take-image__thumbnail, .take-image__container .take-image__camera {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly; }\n  .foot__image__thumbnail {\n  width: 10rem;\n  height: 10rem;\n  display: block; }\n  @media only screen and (min-width: 1280px) {\n    .foot__image__thumbnail {\n      display: flex;\n      justify-content: space-evenly;\n      margin: 0; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9mb3JtL2Zvcm0tZWxlbWVudHMtY29tcG9uZW50cy90YWtlLWltYWdlLWVsZW1lbnRzL2Zvb3QtaW1hZ2UuY29tcG9uZW50LnNjc3MiLCIvVXNlcnMvdHphZnJpci5yYXZlaC9XZWJzdG9ybVByb2plY3RzL2NhbnZhcy9jaGFydHM2L3NyYy9hcHAvc3R5bGUvX21peGluLW1lZGlhUXVlcnkuc2NzcyIsIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9zdHlsZS9fdmFyaWJsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQ0UsY0FBYTtFQUNiLDhCQUE2QixFQUk5QjtFQzBERztJRGhFSjtNQUlJLGVBQWMsRUFFakIsRUFBQTtFQUVEO0VBQ0UsbUJBQWtCO0VBQ2xCLG1CQUFrQixFQUNuQjtFQUVEO0VBQ0UsMEJFYm1CO0VGY25CLGNBQWE7RUFDYixlQUFjO0VBQ2QsbUJBQWtCO0VBQ2xCLGNBQWEsRUFZZDtFQWpCRDtJQVFJLG1CQUFrQjtJQUNsQixtQkFBa0IsRUFDbkI7RUNQQztJREhKO01BYUksa0JBQWlCO01BQ2pCLGFBQVk7TUFDWixhQUFZLEVBRWYsRUFBQTtFQUVEO0VBQ0UsdUJFbkNnQjtFRm9DaEIsWUFBVztFQUNYLGlCQUFnQjtFQUNoQixrQkFBaUI7RUFDakIsMEJBQXlCO0VBQ3pCLG9CQUFtQjtFQUNuQixjQUFhLEVBT2Q7RUM5Qkc7SURnQko7TUFTSSw0QkFBMkIsRUFLOUIsRUFBQTtFQ2NHO0lENUJKO01BWUksVUFBUyxFQUVaLEVBQUE7RUFFRDtFQUNFLGVBQWMsRUFDZjtFQUVEO0VBQ0UsY0FBYTtFQUNiLGdCQUFlO0VBQ2YsK0JBQThCO0VBQzlCLG1CQUFrQixFQVNuQjtFQWJEO0lBT0ksZUV6RHNCLEVGMER2QjtFQ0FDO0lEUko7TUFXSSx1QkFBc0IsRUFFekIsRUFBQTtFQUVEO0VBQ0UsOEJBQTZCLEVBQzlCO0VBRUQ7RUFDRSxZQUFXO0VBQ1gsZ0JBQWUsRUFDaEI7RUFFRDtFQUNFLGNBQWEsRUFDZDtFQUVEO0VBQ0UsZUFBYyxFQUNmO0VBRUQ7RUFDRSxtQkFBa0I7RUFDbEIsbUJBQWtCLEVBQ25CO0VBRUQ7RUFDRSxlQUFjLEVBQ2Y7RUFFRDtFQUNFLGNBQWEsRUFDZDtFQUVEO0VBQ0UsWUVwR2dCLEVGcUdqQjtFQUVEO0VBQ0UsY0FBYTtFQUNiLDhCQUE2QixFQVU5QjtFQ2pHRztJRHFGSjtNQUlJLDhCQUE2QixFQVFoQyxFQUFBO0VBWkQ7SUFRSSxjQUFhO0lBQ2IsdUJBQXNCO0lBQ3RCLDhCQUE2QixFQUM5QjtFQUdIO0VBQ0UsYUFBWTtFQUNaLGNBQWE7RUFDYixlQUFjLEVBTWY7RUNoRUc7SUR1REo7TUFLSSxjQUFhO01BQ2IsOEJBQTZCO01BQzdCLFVBQVMsRUFFWixFQUFBIiwiZmlsZSI6InNyYy9hcHAvZm9ybS9mb3JtLWVsZW1lbnRzLWNvbXBvbmVudHMvdGFrZS1pbWFnZS1lbGVtZW50cy9mb290LWltYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uL3N0eWxlL3ZhcmlibGVcIjtcbkBpbXBvcnQgXCIuLi8uLi8uLi9zdHlsZS9taXhpbi1tZWRpYVF1ZXJ5XCI7XG5cbi5mb290LWltYWdlX19jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgQGluY2x1ZGUgcmVzcG9uZC10byhub2Rlc2t0b3ApIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxufVxuXG4jZmlsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4uY2hvb3NlLWZpbGVfX2J0biB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1ncmVlbjtcbiAgcGFkZGluZzogMXJlbTtcbiAgbWFyZ2luOiAwIDFyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAxMHJlbTtcblxuICBpbnB1dCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxuXG4gIEBpbmNsdWRlIHJlc3BvbmQtdG8obW9iaWxlKSB7XG4gICAgbGluZS1oZWlnaHQ6IDZyZW07XG4gICAgbWFyZ2luOiAxcmVtO1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxufVxuXG5jYW52YXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XG4gIHdpZHRoOiA5NXZ3O1xuICBtYXgtd2lkdGg6IDc0cmVtO1xuICBtYXgtaGVpZ2h0OiA1NXJlbTtcbiAgaGVpZ2h0OiBjYWxjKDk1dncgKiAwLjc1KTtcbiAgbWFyZ2luOiAwIGF1dG8gMXJlbTtcbiAgZGlzcGxheTogbm9uZTtcbiAgQGluY2x1ZGUgcmVzcG9uZC10byhtb2JpbGUpIHtcbiAgICBoZWlnaHQ6IGNhbGMoOTV2dyAqIDAuNTYyNSk7XG4gIH1cbiAgQGluY2x1ZGUgcmVzcG9uZC10byhkZXNrdG9wKXtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLnZpZGVvLWNhbWVyYS0tb24ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmZvb3QtbGF5b3V0LCAubGVnLWxheW91dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgcCB7XG4gICAgY29sb3I6ICRjb2xvci11bnNlbGVjdGVkO1xuICB9XG5cbiAgQGluY2x1ZGUgcmVzcG9uZC10byhkZXNrdG9wKXtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG59XG5cbi5sZWctbGF5b3V0IHtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbi5sZWctbHlhb3V0X19zZWxlY3RlZCwgLmxlZy1seWFvdXRfX3Vuc2VsZWN0ZWQge1xuICB3aWR0aDogOXJlbTtcbiAgcGFkZGluZzogMCAycmVtO1xufVxuXG4ubGVnLWx5YW91dF9fc2VsZWN0ZWQge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4ubGVnLWx5YW91dF9fdW5zZWxlY3RlZCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4ubGVnLWxheW91dF9fcmFkaW8ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLmxlZy1sYXlvdXRfX3JhZGlvOmNoZWNrZWQgfiAubGVnLWx5YW91dF9fc2VsZWN0ZWQge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmxlZy1sYXlvdXRfX3JhZGlvOmNoZWNrZWQgfiAubGVnLWx5YW91dF9fdW5zZWxlY3RlZCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5sZWctbGF5b3V0X19yYWRpbzpjaGVja2VkIH4gcCB7XG4gIGNvbG9yOiAkY29sb3Itd2hpdGU7XG59XG5cbi50YWtlLWltYWdlX19jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgQGluY2x1ZGUgcmVzcG9uZC10byhtb2JpbGUpIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgfVxuXG4gIC50YWtlLWltYWdlX19maWxlLCAudGFrZS1pbWFnZV9fdGh1bWJuYWlsLCAudGFrZS1pbWFnZV9fY2FtZXJhIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIH1cbn1cblxuLmZvb3RfX2ltYWdlX190aHVtYm5haWwge1xuICB3aWR0aDogMTByZW07XG4gIGhlaWdodDogMTByZW07XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBAaW5jbHVkZSByZXNwb25kLXRvKGRlc2t0b3ApIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuIiwiJG1vYmlsZTogNzY3cHg7XG4kdGFibGV0OiAxMjgwcHg7XG4kdW5pdDogMTtcbiRtb2JpbGVfcGx1c18xOiAoJG1vYmlsZSArIDEpICogJHVuaXQ7XG4kdGFibGV0OiAkdGFibGV0ICogJHVuaXQ7XG4kdGFibGV0X21pbnVzXzE6ICgkdGFibGV0IC0gMSkgKiAkdW5pdDtcblxuQG1peGluIHJlc3BvbmQtdG8oJG1lZGlhKSB7XG4gIEBpZiAkbWVkaWEgPT0gcG9ydHJhaXQge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG4gIEBpZiAkbWVkaWEgPT0gbGFuZHNjYXBlIHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbiAgQGlmICRtZWRpYSA9PSBtb2JpbGUge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG4gIEBpZiAkbWVkaWEgPT0gbW9iaWxlLXBvcnRyYWl0IHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbiAgQGlmICRtZWRpYSA9PSBtb2JpbGUtbGFuZHNjYXBlIHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtZWRpYSA9PSBtb2JpbGUtdGFibGV0IHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRtb2JpbGVfcGx1c18xKSBhbmQgKG1heC13aWR0aDogJHRhYmxldF9taW51c18xKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IG1vYmlsZS10YWJsZXQtcG9ydHJhaXQge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJG1vYmlsZV9wbHVzXzEpIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0X21pbnVzXzEpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IHRhYmxldCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlX3BsdXNfMSkgYW5kIChtYXgtd2lkdGg6ICR0YWJsZXRfbWludXNfMSkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtZWRpYSA9PSB0YWJsZXQtcG9ydHJhaXQge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJG1vYmlsZV9wbHVzXzEpIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0X21pbnVzXzEpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IHRhYmxldC1sYW5kc2NhcGUge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJG1vYmlsZV9wbHVzXzEpIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0X21pbnVzXzEpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtZWRpYSA9PSBkZXNrLXRhYiB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IGRlc2t0b3Age1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJHRhYmxldCkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtZWRpYSA9PSBub2Rlc2t0b3Age1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHRhYmxldCkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG4iLCIkY29sb3ItbWFpbjogIzNiNDY1YztcbiRjb2xvci13aGl0ZTogI2ZmZjtcbiRjb2xvci1ibGFjazogIzAwMDtcbiRjb2xvci1lcnJvcjogI2ZmOWE5YTtcbiRjb2xvci1ncmVlbjogIzQzOWM0MztcbiRjb2xvci11bnNlbGVjdGVkOiAjNTY1ODU2O1xuJGNvbG9yLWRhcmstYmx1ZTogIzJhM2Q2MztcbiJdfQ== */"

/***/ }),

/***/ "./src/app/form/form-elements-components/take-image-elements/index.ts":
/*!****************************************************************************!*\
  !*** ./src/app/form/form-elements-components/take-image-elements/index.ts ***!
  \****************************************************************************/
/*! exports provided: FootImageComponent, VideosComponent, VideoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _foot_image_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foot-image-component */ "./src/app/form/form-elements-components/take-image-elements/foot-image-component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FootImageComponent", function() { return _foot_image_component__WEBPACK_IMPORTED_MODULE_0__["FootImageComponent"]; });

/* harmony import */ var _videos_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videos.component */ "./src/app/form/form-elements-components/take-image-elements/videos.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return _videos_component__WEBPACK_IMPORTED_MODULE_1__["VideosComponent"]; });

/* harmony import */ var _video_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./video.service */ "./src/app/form/form-elements-components/take-image-elements/video.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoService", function() { return _video_service__WEBPACK_IMPORTED_MODULE_2__["VideoService"]; });






/***/ }),

/***/ "./src/app/form/form-elements-components/take-image-elements/video.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/form/form-elements-components/take-image-elements/video.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".videoCroping {\n  width: 30rem;\n  height: 30rem;\n  overflow: hidden; }\n\nvideo {\n  width: 95vw;\n  max-width: 74rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9mb3JtL2Zvcm0tZWxlbWVudHMtY29tcG9uZW50cy90YWtlLWltYWdlLWVsZW1lbnRzL3ZpZGVvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBWTtFQUNaLGNBQWE7RUFDYixpQkFBZ0IsRUFDakI7O0FBQ0Q7RUFDRSxZQUFXO0VBQ1gsaUJBQWdCLEVBQ2pCIiwiZmlsZSI6InNyYy9hcHAvZm9ybS9mb3JtLWVsZW1lbnRzLWNvbXBvbmVudHMvdGFrZS1pbWFnZS1lbGVtZW50cy92aWRlby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi52aWRlb0Nyb3Bpbmcge1xuICB3aWR0aDogMzByZW07XG4gIGhlaWdodDogMzByZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG52aWRlbyB7XG4gIHdpZHRoOiA5NXZ3O1xuICBtYXgtd2lkdGg6IDc0cmVtO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/form/form-elements-components/take-image-elements/video.service.ts":
/*!************************************************************************************!*\
  !*** ./src/app/form/form-elements-components/take-image-elements/video.service.ts ***!
  \************************************************************************************/
/*! exports provided: VideoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoService", function() { return VideoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var VideoService = /** @class */ (function () {
    function VideoService() {
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.cameraOn = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    VideoService.prototype.done = function (event) {
        this.change.emit(event);
    };
    VideoService.prototype.activeCamera = function () {
        this.cameraOn.emit();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], VideoService.prototype, "change", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], VideoService.prototype, "cameraOn", void 0);
    VideoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], VideoService);
    return VideoService;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/take-image-elements/videos.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/form/form-elements-components/take-image-elements/videos.component.ts ***!
  \***************************************************************************************/
/*! exports provided: VideosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return VideosComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _video_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./video.service */ "./src/app/form/form-elements-components/take-image-elements/video.service.ts");



var VideosComponent = /** @class */ (function () {
    function VideosComponent(videoService) {
        this.videoService = videoService;
        this.takePhoto = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    VideosComponent.prototype.ngOnInit = function () {
        this.activeVideo();
    };
    VideosComponent.prototype.activeVideo = function () {
        if (window.navigator.mediaDevices.getUserMedia) {
            var that = this;
            window.navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                // var me = document.getElementById('videoElement');
                // me.srcObject = stream;
                that.video.nativeElement.srcObject = stream;
            })
                .catch(function (err0r) {
                console.log("Something went wrong!");
                console.log(err0r);
            });
        }
    };
    VideosComponent.prototype.captureImage = function () {
        // this.takePhoto.emit(this.video);
        this.videoService.done(this.video.nativeElement);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('videoElement'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], VideosComponent.prototype, "video", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], VideosComponent.prototype, "takePhoto", void 0);
    VideosComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'video-capture',
            template: "\n        <!--<div class=\"videoCroping\">-->\n            <video (click)=\"captureImage()\" autoplay=\"true\" id=\"videoElement\" #videoElement></video>\n        <!--</div>-->\n    ",
            styles: [__webpack_require__(/*! ./video.component.scss */ "./src/app/form/form-elements-components/take-image-elements/video.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_video_service__WEBPACK_IMPORTED_MODULE_2__["VideoService"]])
    ], VideosComponent);
    return VideosComponent;
}());



/***/ }),

/***/ "./src/app/form/form-elements-components/textArea.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/form/form-elements-components/textArea.component.ts ***!
  \*********************************************************************/
/*! exports provided: TextAreaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextAreaComponent", function() { return TextAreaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var TextAreaComponent = /** @class */ (function () {
    function TextAreaComponent() {
    }
    TextAreaComponent.prototype.ngOnInit = function () {
        var formControlValidationNeeded = this.ta.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required) : new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.parentForm.addControl(this.ta.id, formControlValidationNeeded);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextAreaComponent.prototype, "ta", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], TextAreaComponent.prototype, "parentForm", void 0);
    TextAreaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'textarea-component',
            template: "<div [formGroup]=\"parentForm\">\n        <textarea\n        formControlName=\"{{ta.id}}\"\n        id=\"{{ta.id}}\"\n        placeholder=\"{{ta.placeHolder}}\"\n        maxLength=\"{{ta.length}}\"\n        rows=\"{{ta.rows}}\"\n        [attr.required]=\"ta.required ? true : null\"></textarea>\n        </div>"
        })
    ], TextAreaComponent);
    return TextAreaComponent;
}());



/***/ }),

/***/ "./src/app/form/form.service.ts":
/*!**************************************!*\
  !*** ./src/app/form/form.service.ts ***!
  \**************************************/
/*! exports provided: FormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormService", function() { return FormService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FormService = /** @class */ (function () {
    function FormService() {
    }
    FormService.prototype.getFormElements = function () {
        return FORM_ELEMENTS;
    };
    FormService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], FormService);
    return FormService;
}());

var FORM_ELEMENTS = [
    {
        title: 'קשת קשיחה?',
        radio: {
            name: 'keshet',
            required: true,
            elements: [
                {
                    id: 'keshet-yes',
                    label: 'כן'
                },
                {
                    id: 'keshet-no',
                    label: 'לא'
                }
            ]
        }
    },
    {
        title: 'מקור הגעה',
        radio: {
            name: 'referred',
            required: true,
            elements: [
                {
                    id: 'walkIn',
                    label: 'מזדמן'
                },
                {
                    id: 'advertising',
                    label: 'פרסום'
                },
                {
                    id: 'myPatient',
                    label: 'מטופל שלי'
                },
                {
                    id: 'other-referred',
                    label: 'אחר'
                }
            ]
        }
    },
    {
        title: 'ביטוח בריאות',
        radio: {
            name: 'insurance',
            required: true,
            elements: [
                {
                    id: 'clalit',
                    label: 'כללית',
                },
                {
                    id: 'macabi',
                    label: 'מכבי'
                },
                {
                    id: 'meuhedet',
                    label: 'מאוחדת'
                },
                {
                    id: 'leumit',
                    label: 'לאומית'
                },
                {
                    id: 'other-insurance',
                    label: 'אחר'
                }
            ]
        }
    },
    {
        title: 'האם קיימת פתולוגיה או תלונות כאב',
        textarea: {
            id: 'patalog',
            length: 10000,
            placeHolder: 'שים פה את הטקסט',
            required: true,
            rows: 5,
        }
    },
    {
        title: 'פעילות יום יומית',
        subtitle: 'פרט אופי פעילות: ריצה ספורט, עמידה ממושכת',
        textarea: {
            id: 'activity',
            length: 10000,
            placeHolder: 'שים פה את הטקסט',
            required: true,
            rows: 5,
        }
    },
    {
        title: 'קריסת קשת רוחבית',
        subtitle: 'יש צורך בהגבהה מטטראסל',
        radio: {
            name: 'kolapsBow',
            required: true,
            elements: [
                {
                    id: 'kolaps-bow-yes',
                    label: 'כן'
                },
                {
                    id: 'kolaps-bow-no',
                    label: 'לא'
                }
            ]
        }
    },
    {
        title: 'טווחי תנועה',
        subtitle: 'יש הגבלה בתנועה',
        radio: {
            name: 'movementLimitation',
            required: true,
            elements: [
                {
                    id: 'movement-limitation-yes',
                    label: 'כן'
                },
                {
                    id: 'movement-limitation-no',
                    label: 'לא'
                },
            ]
        }
    },
    {
        title: 'טביעת רגל',
        subtitle: 'סוג קשת פלנטארית',
        radio: {
            name: 'footPrint',
            required: true,
            elements: [
                {
                    id: 'footCollapse',
                    label: 'קריסה',
                    imgs: [
                        { src: '../../../../assets/SoftwareIcons_FootCollapsed.png' }
                    ]
                },
                {
                    id: 'footHigh',
                    label: 'גבוהה',
                    imgs: [
                        { src: '../../../../assets/SoftwareIcons_FootHigh.png' }
                    ]
                },
                {
                    id: 'footLow',
                    label: 'נמוכה',
                    imgs: [
                        { src: '../../../../assets/SoftwareIcons_FootLow.png' }
                    ]
                },
                {
                    id: 'footNormal',
                    label: 'נורמאלית',
                    imgs: [
                        { src: '../../../../assets/SoftwareIcons_FootNormal.png' }
                    ]
                }
            ]
        }
    },
    {
        title: 'צלם תמונה',
        footImage: true
    },
    {
        title: 'פרטי לקוח',
        class: 'customer-details',
        customerDetails: [
            {
                radio: {
                    required: true,
                    name: 'gender',
                    elements: [
                        {
                            id: 'male',
                            label: 'זכר',
                        },
                        {
                            id: 'female',
                            label: 'נקבה',
                        }
                    ]
                }
            },
            {
                input: {
                    required: true,
                    id: 'id-number',
                    name: 'idNumber',
                    placeholder: 'ת.ז',
                    type: 'number',
                    label: 'ת.ז'
                }
            },
            {
                input: {
                    required: true,
                    id: 'client-name',
                    name: 'name',
                    placeholder: 'שם פרטי ומשפחה',
                    type: 'text',
                    label: 'שם פרטי ומשפחה'
                }
            },
            {
                inputBirthday: {
                    title: 'תאריך יומולדת'
                }
            },
            {
                input: {
                    required: true,
                    id: 'phone',
                    name: 'phone',
                    placeholder: 'מספר טלפון',
                    type: 'number',
                    label: 'מספר טלפון'
                }
            },
            {
                input: {
                    required: true,
                    id: 'email',
                    name: 'email',
                    placeholder: 'אימייל',
                    type: 'email',
                    label: 'אימייל'
                }
            },
            {
                class: 'shoes',
                input: {
                    required: true,
                    id: 'shoes-size',
                    name: 'shoes',
                    placeholder: 'מידה',
                    type: 'number',
                    label: 'מידת נעלים'
                },
                select: {
                    name: 'shoesMeasureType',
                    required: true,
                    options: [
                        {
                            text: 'יחידת מידה',
                            defaultSelect: true,
                            disabled: true,
                            hidden: true
                        },
                        {
                            text: 'EUR',
                        },
                        {
                            text: 'US'
                        },
                        {
                            text: 'CM'
                        }
                    ]
                }
            },
            {
                select: {
                    label: 'סוג מדרס',
                    id: 'midras-type',
                    name: 'midras-type',
                    required: true,
                    options: [
                        {
                            text: 'בחר סוג מדרס',
                            defaultSelect: true,
                            disabled: true,
                            hidden: true
                        },
                        {
                            text: 'Soft Step',
                            defaultSelect: true
                        },
                        {
                            text: 'Balance Step',
                        },
                        {
                            text: 'Moonwalk',
                        },
                        {
                            text: 'On Cloud',
                        },
                        {
                            text: 'Ortostep',
                        },
                        {
                            text: 'Other',
                        }
                    ]
                }
            },
            {
                input: {
                    id: 'weight',
                    name: 'weight',
                    placeholder: 'משקל',
                    type: 'number',
                    required: true,
                    label: 'משקל'
                }
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/form/index.ts":
/*!*******************************!*\
  !*** ./src/app/form/index.ts ***!
  \*******************************/
/*! exports provided: MidrasFormComponent, FormService, TextAreaComponent, RadioComponent, InputComponent, FootImageComponent, VideosComponent, VideoService, SimpleFormComponent, SelectComponent, BirthdayInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _midras_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./midras-form.component */ "./src/app/form/midras-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MidrasFormComponent", function() { return _midras_form_component__WEBPACK_IMPORTED_MODULE_0__["MidrasFormComponent"]; });

/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.service */ "./src/app/form/form.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormService", function() { return _form_service__WEBPACK_IMPORTED_MODULE_1__["FormService"]; });

/* harmony import */ var _form_elements_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-elements-components */ "./src/app/form/form-elements-components/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextAreaComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["TextAreaComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["RadioComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["InputComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FootImageComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["FootImageComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["VideosComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoService", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["VideoService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleFormComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["SimpleFormComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["SelectComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BirthdayInputComponent", function() { return _form_elements_components__WEBPACK_IMPORTED_MODULE_2__["BirthdayInputComponent"]; });






/***/ }),

/***/ "./src/app/form/midras-form.component.html":
/*!*************************************************!*\
  !*** ./src/app/form/midras-form.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"midras-form__wrapper\">\n\t<form #midrasForm=\"ngForm\" #screenContainer (ngSubmit)=\"sendForm()\" id=\"main-form\" class=\"midras-form\" [formGroup]=\"parentForm\">\n\t\t<div *ngFor=\"let elem of formElements;let i =index\" class=\"screen screen-{{i}}\">\n\t\t\t<h3 class=\"title\">{{elem.title}}</h3>\n\t\t\t<p class=\"subTitle\" *ngIf=\"elem.subtitle\">{{elem.subtitle}}</p>\n\t\t\t<div class=\"form-elememt-component__container radio-container\" *ngIf=\"elem.radio\">\n\t\t\t\t<input-radio (nextSlide)=\"nextStep(this, 'valid')\" [parentForm]=\"parentForm\" class=\"input-radio\" [radio]=\"elem.radio\"></input-radio>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"elem.textarea\" class=\"form-elememt-component__container\">\n\t\t\t\t<textarea-component class=\"textarea-component\" [parentForm]=\"parentForm\" [ta]=\"elem.textarea\"></textarea-component>\n\t\t\t</div>\n\n\t\t\t<div *ngIf=\"elem.footImage\" class=\"form-elememt-component__container foot-image__container\">\n\t\t\t\t<foot-image [parentForm]=\"parentForm\"></foot-image>\n\t\t\t\t<!--<video-capture (takePhoto)=\"captureImage($event)\"></video-capture>-->\n\t\t\t</div>\n\t\t\t<div *ngIf=\"elem.customerDetails\" [ngClass]=\"elem.class\" class=\"form-elememt-component__container customer-details__form\">\n\t\t\t\t<simple-form [parentForm]=\"parentForm\" [customerForm]=\"elem.customerDetails\"></simple-form>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n\t<div class=\"form-submit\" [ngClass]=\"{'valid':midrasForm.valid}\" *ngIf=\"midrasForm.valid\">\n\t\t<button form=\"main-form\" class=\"btn\" type=\"submit\">שלח טופס</button>\n\t</div>\n\t<nav class=\"navigation\">\n\t\t<button class=\"btn \" [ngClass]=\"{disable: prevDisable}\" (click)=\"prevStep()\">הקודם</button>\n\t\t<button class=\"btn\" [ngClass]=\"{disable: nextDisable}\" (click)=\"nextStep(this, 'next')\">הבא</button>\n\t</nav>\n</div>\n<div class=\"send-from-overlay\" [ngClass]=\"{'active':activeSpinner}\">\n\n\t<svg class=\"spinner\" width=\"135\" height=\"135\" viewBox=\"0 0 135 135\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t<style type=\"text/css\">\n    \t\tpath {\n\t\t\t\tfill: #94c11f;\n\t\t\t}\n\t\t\t.outer {\n\t\t\t\tfill: #58c2df;\n\t\t\t}\n\t\t\tpath {\n\t\t\t\ttransform-origin: center;\n\t\t\t\tanimation: dotRoll1 2.5s linear infinite;\n\t\t\t}\n\t\t\tpath:last-child {\n\t\t\t\tanimation: dotRoll2 8s linear infinite;\n\t\t\t}\n\t\t\t@keyframes dotRoll1 { to { transform: rotate(-360deg) } }\n\t\t\t@keyframes dotRoll2 { to { transform: rotate(360deg) } }\n\t\t</style>\n\t\t<path class=\"inner\" d=\"M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z\"></path>\n\t\t<path class=\"outer\" d=\"M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z\"></path>\n\t</svg>\n\n\n</div>\n"

/***/ }),

/***/ "./src/app/form/midras-form.component.scss":
/*!*************************************************!*\
  !*** ./src/app/form/midras-form.component.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navigation {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background: #2a3d63;\n  padding: 1.5rem; }\n\n.btn {\n  font-size: 2rem;\n  color: #fff;\n  margin: 0 1rem;\n  background-color: #439c43;\n  min-width: 8rem; }\n\n.btn.disable {\n    background-color: #565856; }\n\n.main-logo {\n  max-width: 25rem;\n  width: 90%;\n  margin-bottom: 5rem; }\n\n@media only screen and (max-width: 767px) {\n    .main-logo {\n      margin-bottom: 2rem; } }\n\n.midras-form__wrapper {\n  font-size: 1.5rem;\n  color: #fff;\n  text-align: center;\n  width: 100vw;\n  overflow: hidden;\n  padding: 0; }\n\n@media only screen and (max-width: 767px) {\n    .midras-form__wrapper {\n      padding-top: 2.5rem; } }\n\n.midras-form {\n  display: flex;\n  flex-wrap: nowrap;\n  width: 100vw;\n  -webkit-transform: translateX(0%);\n          transform: translateX(0%);\n  transition: .5s; }\n\nfoot-image {\n  display: block;\n  margin-bottom: 3rem; }\n\n.screen {\n  width: 100vw;\n  height: calc(100vh - 19rem); }\n\n@media only screen and (max-width: 767px) {\n    .screen {\n      height: calc(100vh - 23rem); } }\n\n.ng-valid .screen {\n    height: calc(100vh - 26rem); }\n\n@media only screen and (max-width: 767px) {\n      .ng-valid .screen {\n        height: calc(100vh - 28rem); } }\n\n.form-elememt-component__container {\n  overflow: auto;\n  height: calc(100% - 5.6rem); }\n\n.title {\n  width: 100vw;\n  font-size: 4rem;\n  margin-bottom: 2rem;\n  padding: 0 3rem;\n  font-weight: bold; }\n\n@media only screen and (max-width: 767px) {\n    .title {\n      font-size: 3rem; } }\n\n.subTitle {\n  padding: 0 3rem; }\n\n.radio-container {\n  display: flex;\n  align-items: stretch;\n  justify-content: center;\n  flex-wrap: wrap; }\n\n.input-radio {\n  margin: .5rem; }\n\n.form-submit {\n  position: fixed;\n  left: 0;\n  width: 100%;\n  background-color: #2a3d63;\n  padding: 1.5rem;\n  transition: 1s;\n  -webkit-animation: slide-down 2.5s;\n          animation: slide-down 2.5s;\n  bottom: 6.9rem; }\n\n@-webkit-keyframes slide-down {\n  0% {\n    bottom: 50%;\n    opacity: 0; }\n  30% {\n    bottom: 50%;\n    opacity: 1; }\n  100% {\n    bottom: 6.9rem; } }\n\n@keyframes slide-down {\n  0% {\n    bottom: 50%;\n    opacity: 0; }\n  30% {\n    bottom: 50%;\n    opacity: 1; }\n  100% {\n    bottom: 6.9rem; } }\n\n.send-from-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  width: 100vw;\n  background-color: #3b465c;\n  opacity: 0;\n  z-index: -1;\n  transition: opacity .5s; }\n\n.send-from-overlay.active {\n    z-index: 5;\n    opacity: 1; }\n\n.send-from-overlay .spinner {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9mb3JtL21pZHJhcy1mb3JtLmNvbXBvbmVudC5zY3NzIiwiL1VzZXJzL3R6YWZyaXIucmF2ZWgvV2Vic3Rvcm1Qcm9qZWN0cy9jYW52YXMvY2hhcnRzNi9zcmMvYXBwL3N0eWxlL192YXJpYmxlLnNjc3MiLCIvVXNlcnMvdHphZnJpci5yYXZlaC9XZWJzdG9ybVByb2plY3RzL2NhbnZhcy9jaGFydHM2L3NyYy9hcHAvc3R5bGUvX21peGluLW1lZGlhUXVlcnkuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLGdCQUFlO0VBQ2YsVUFBUztFQUNULFlBQVc7RUFDWCxvQkNEdUI7RURFdkIsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDRSxnQkFBZTtFQUNmLFlDWmdCO0VEYWhCLGVBQWM7RUFDZCwwQkNYbUI7RURZbkIsZ0JBQWUsRUFJaEI7O0FBVEQ7SUFPSSwwQkNic0IsRURjdkI7O0FBR0g7RUFDRSxpQkFBZ0I7RUFDaEIsV0FBVTtFQUNWLG9CQUFtQixFQUlwQjs7QUVWRztJRkdKO01BS0ksb0JBQW1CLEVBRXRCLEVBQUE7O0FBRUQ7RUFDRSxrQkFBaUI7RUFDakIsWUNoQ2dCO0VEaUNoQixtQkFBa0I7RUFDbEIsYUFBWTtFQUNaLGlCQUFnQjtFQUNoQixXQUFVLEVBSVg7O0FFdEJHO0lGWUo7TUFRSSxvQkFBbUIsRUFFdEIsRUFBQTs7QUFFRDtFQUNFLGNBQWE7RUFDYixrQkFBaUI7RUFDakIsYUFBWTtFQUNaLGtDQUEwQjtVQUExQiwwQkFBMEI7RUFDMUIsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDRSxlQUFjO0VBQ2Qsb0JBQW1CLEVBQ3BCOztBQUVEO0VBQ0UsYUFBWTtFQUNaLDRCQUEyQixFQVU1Qjs7QUVqREc7SUZxQ0o7TUFJSSw0QkFBMkIsRUFROUIsRUFBQTs7QUFOQztJQUNFLDRCQUEyQixFQUk1Qjs7QUVoREM7TUYyQ0Y7UUFHSSw0QkFBMkIsRUFFOUIsRUFBQTs7QUFHSDtFQUNFLGVBQWM7RUFDZCw0QkFBMkIsRUFDNUI7O0FBRUQ7RUFDRSxhQUFZO0VBQ1osZ0JBQWU7RUFDZixvQkFBbUI7RUFDbkIsZ0JBQWU7RUFDZixrQkFBaUIsRUFJbEI7O0FFakVHO0lGd0RKO01BT0ksZ0JBQWUsRUFFbEIsRUFBQTs7QUFFRDtFQUNFLGdCQUFlLEVBQ2hCOztBQUVEO0VBQ0UsY0FBYTtFQUNiLHFCQUFvQjtFQUNwQix3QkFBdUI7RUFDdkIsZ0JBQWUsRUFDaEI7O0FBQ0Q7RUFDRSxjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxnQkFBZTtFQUNmLFFBQU87RUFDUCxZQUFXO0VBQ1gsMEJDbEd1QjtFRG1HdkIsZ0JBQWU7RUFDZixlQUFjO0VBQ2QsbUNBQTBCO1VBQTFCLDJCQUEwQjtFQUMxQixlQUFjLEVBQ2Y7O0FBRUQ7RUFDRTtJQUNFLFlBQVc7SUFDWCxXQUFVLEVBQUE7RUFFWjtJQUNFLFlBQVc7SUFDWCxXQUFVLEVBQUE7RUFFWjtJQUNFLGVBQWMsRUFBQSxFQUFBOztBQVZsQjtFQUNFO0lBQ0UsWUFBVztJQUNYLFdBQVUsRUFBQTtFQUVaO0lBQ0UsWUFBVztJQUNYLFdBQVUsRUFBQTtFQUVaO0lBQ0UsZUFBYyxFQUFBLEVBQUE7O0FBSWxCO0VBQ0UsZ0JBQWU7RUFDZixPQUFNO0VBQ04sUUFBTztFQUNQLGNBQWE7RUFDYixhQUFZO0VBQ1osMEJDbklrQjtFRG9JbEIsV0FBVTtFQUNWLFlBQVc7RUFDWCx3QkFBdUIsRUFZeEI7O0FBckJEO0lBWUksV0FBVTtJQUNWLFdBQVUsRUFDWDs7QUFkSDtJQWdCSSxnQkFBZTtJQUNmLFNBQVE7SUFDUixVQUFTO0lBQ1QseUNBQWdDO1lBQWhDLGlDQUFnQyxFQUNqQyIsImZpbGUiOiJzcmMvYXBwL2Zvcm0vbWlkcmFzLWZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vc3R5bGUvdmFyaWJsZVwiO1xuQGltcG9ydCBcIi4uL3N0eWxlL21peGluLW1lZGlhUXVlcnlcIjtcblxuLm5hdmlnYXRpb24ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICRjb2xvci1kYXJrLWJsdWU7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbn1cblxuLmJ0biB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgbWFyZ2luOiAwIDFyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1ncmVlbjtcbiAgbWluLXdpZHRoOiA4cmVtO1xuICAmLmRpc2FibGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci11bnNlbGVjdGVkO1xuICB9XG59XG5cbi5tYWluLWxvZ28ge1xuICBtYXgtd2lkdGg6IDI1cmVtO1xuICB3aWR0aDogOTAlO1xuICBtYXJnaW4tYm90dG9tOiA1cmVtO1xuICBAaW5jbHVkZSByZXNwb25kLXRvKG1vYmlsZSl7XG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgfVxufVxuXG4ubWlkcmFzLWZvcm1fX3dyYXBwZXIge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwdnc7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDA7XG4gIEBpbmNsdWRlIHJlc3BvbmQtdG8obW9iaWxlKXtcbiAgICBwYWRkaW5nLXRvcDogMi41cmVtO1xuICB9XG59XG5cbi5taWRyYXMtZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuICB3aWR0aDogMTAwdnc7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwMCUpO1xuICB0cmFuc2l0aW9uOiAuNXM7XG59XG5cbmZvb3QtaW1hZ2Uge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcbn1cblxuLnNjcmVlbiB7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTlyZW0pO1xuICBAaW5jbHVkZSByZXNwb25kLXRvKG1vYmlsZSkge1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDIzcmVtKTtcbiAgfVxuICAubmctdmFsaWQgJiB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMjZyZW0pO1xuICAgIEBpbmNsdWRlIHJlc3BvbmQtdG8obW9iaWxlKSB7XG4gICAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAyOHJlbSk7XG4gICAgfVxuICB9XG59XG5cbi5mb3JtLWVsZW1lbXQtY29tcG9uZW50X19jb250YWluZXIge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA1LjZyZW0pO1xufVxuXG4udGl0bGUge1xuICB3aWR0aDogMTAwdnc7XG4gIGZvbnQtc2l6ZTogNHJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgcGFkZGluZzogMCAzcmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgQGluY2x1ZGUgcmVzcG9uZC10byhtb2JpbGUpIHtcbiAgICBmb250LXNpemU6IDNyZW07XG4gIH1cbn1cblxuLnN1YlRpdGxlIHtcbiAgcGFkZGluZzogMCAzcmVtO1xufVxuXG4ucmFkaW8tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG4uaW5wdXQtcmFkaW8ge1xuICBtYXJnaW46IC41cmVtO1xufVxuXG4uZm9ybS1zdWJtaXQge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItZGFyay1ibHVlO1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIHRyYW5zaXRpb246IDFzO1xuICBhbmltYXRpb246IHNsaWRlLWRvd24gMi41cztcbiAgYm90dG9tOiA2LjlyZW07XG59XG5cbkBrZXlmcmFtZXMgc2xpZGUtZG93biB7XG4gIDAlIHtcbiAgICBib3R0b206IDUwJTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIDMwJXtcbiAgICBib3R0b206IDUwJTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIGJvdHRvbTogNi45cmVtO1xuICB9XG59XG5cbi5zZW5kLWZyb20tb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDEwMHZoO1xuICB3aWR0aDogMTAwdnc7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1tYWluO1xuICBvcGFjaXR5OiAwO1xuICB6LWluZGV4OiAtMTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuNXM7XG5cbiAgJi5hY3RpdmUge1xuICAgIHotaW5kZXg6IDU7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAuc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgfVxufVxuIiwiJGNvbG9yLW1haW46ICMzYjQ2NWM7XG4kY29sb3Itd2hpdGU6ICNmZmY7XG4kY29sb3ItYmxhY2s6ICMwMDA7XG4kY29sb3ItZXJyb3I6ICNmZjlhOWE7XG4kY29sb3ItZ3JlZW46ICM0MzljNDM7XG4kY29sb3ItdW5zZWxlY3RlZDogIzU2NTg1NjtcbiRjb2xvci1kYXJrLWJsdWU6ICMyYTNkNjM7XG4iLCIkbW9iaWxlOiA3NjdweDtcbiR0YWJsZXQ6IDEyODBweDtcbiR1bml0OiAxO1xuJG1vYmlsZV9wbHVzXzE6ICgkbW9iaWxlICsgMSkgKiAkdW5pdDtcbiR0YWJsZXQ6ICR0YWJsZXQgKiAkdW5pdDtcbiR0YWJsZXRfbWludXNfMTogKCR0YWJsZXQgLSAxKSAqICR1bml0O1xuXG5AbWl4aW4gcmVzcG9uZC10bygkbWVkaWEpIHtcbiAgQGlmICRtZWRpYSA9PSBwb3J0cmFpdCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbiAgQGlmICRtZWRpYSA9PSBsYW5kc2NhcGUge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxuICBAaWYgJG1lZGlhID09IG1vYmlsZSB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbiAgQGlmICRtZWRpYSA9PSBtb2JpbGUtcG9ydHJhaXQge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxuICBAaWYgJG1lZGlhID09IG1vYmlsZS1sYW5kc2NhcGUge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IG1vYmlsZS10YWJsZXQge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJG1vYmlsZV9wbHVzXzEpIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0X21pbnVzXzEpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gbW9iaWxlLXRhYmxldC1wb3J0cmFpdCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlX3BsdXNfMSkgYW5kIChtYXgtd2lkdGg6ICR0YWJsZXRfbWludXNfMSkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gdGFibGV0IHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRtb2JpbGVfcGx1c18xKSBhbmQgKG1heC13aWR0aDogJHRhYmxldF9taW51c18xKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IHRhYmxldC1wb3J0cmFpdCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlX3BsdXNfMSkgYW5kIChtYXgtd2lkdGg6ICR0YWJsZXRfbWludXNfMSkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gdGFibGV0LWxhbmRzY2FwZSB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkbW9iaWxlX3BsdXNfMSkgYW5kIChtYXgtd2lkdGg6ICR0YWJsZXRfbWludXNfMSkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IGRlc2stdGFiIHtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRtb2JpbGUpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWVkaWEgPT0gZGVza3RvcCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkdGFibGV0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1lZGlhID09IG5vZGVza3RvcCB7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/form/midras-form.component.ts":
/*!***********************************************!*\
  !*** ./src/app/form/midras-form.component.ts ***!
  \***********************************************/
/*! exports provided: MidrasFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MidrasFormComponent", function() { return MidrasFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../login */ "./src/app/login/index.ts");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form.service */ "./src/app/form/form.service.ts");
/* harmony import */ var _form_elements_components_take_image_elements__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form-elements-components/take-image-elements */ "./src/app/form/form-elements-components/take-image-elements/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");









var MidrasFormComponent = /** @class */ (function () {
    function MidrasFormComponent(router, auth, formService, videoService, formBuilder, _http) {
        this.router = router;
        this.auth = auth;
        this.formService = formService;
        this.videoService = videoService;
        this.formBuilder = formBuilder;
        this._http = _http;
        this.currentIndex = 0;
        this.prevDisable = true;
        this.nextDisable = false;
        this.activeSpinner = false;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].serverCall + "/sendForm";
    }
    MidrasFormComponent.prototype.ngAfterViewInit = function () {
        this.parentForm.removeControl('inValidForInit');
    };
    MidrasFormComponent.prototype.ngOnInit = function () {
        var isUserLogin = this.auth.isLogin();
        if (!isUserLogin)
            this.router.navigate(['/login']);
        this.getElement();
        this.parentForm = this.formBuilder.group({ inValidForInit: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required) });
    };
    MidrasFormComponent.prototype.getElement = function () {
        this.formElements = this.formService.getFormElements();
    };
    MidrasFormComponent.prototype.nextStep = function (formElem, elemClick) {
        if ((this.formElements.length - 1) > this.currentIndex) {
            this.prevDisable = false;
            this.currentIndex++;
            this.screenContainer.nativeElement.style = "transform: translateX(" + this.currentIndex + "00%)";
            this.nextDisable = !((this.formElements.length - 1) > this.currentIndex);
        }
        else {
            this.nextDisable = true;
        }
    };
    MidrasFormComponent.prototype.prevStep = function () {
        if (this.currentIndex > 0) {
            this.nextDisable = false;
            this.currentIndex--;
            this.screenContainer.nativeElement.style = "transform: translateX(" + this.currentIndex + "00%)";
            this.prevDisable = !(this.currentIndex > 0);
        }
        else {
            this.prevDisable = true;
        }
    };
    MidrasFormComponent.prototype.captureImage = function (data) {
        console.log('parent video:', data);
    };
    MidrasFormComponent.prototype.sendForm = function () {
        var _this = this;
        if (this.parentForm.valid) {
            var formData = new FormData();
            var fieldAgent = JSON.parse(localStorage.getItem('userAuth'));
            formData.append('fieldAgent', fieldAgent.userName);
            for (var formItem in this.parentForm.value) {
                formData.append(formItem, this.parentForm.value[formItem]);
            }
            this._http.post(this.url, formData).subscribe(function (respone) { return console.log(respone); }, function (error) { return console.log(error); });
            this.activeSpinner = true;
            setTimeout(function () { return _this.router.navigate(['/success-form']); }, 3000);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('screenContainer'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], MidrasFormComponent.prototype, "screenContainer", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('overlaySpinner'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], MidrasFormComponent.prototype, "overlaySpinner", void 0);
    MidrasFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'midras-form',
            template: __webpack_require__(/*! ./midras-form.component.html */ "./src/app/form/midras-form.component.html"),
            styles: [__webpack_require__(/*! ./midras-form.component.scss */ "./src/app/form/midras-form.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _login__WEBPACK_IMPORTED_MODULE_3__["UserAnthentityService"],
            _form_service__WEBPACK_IMPORTED_MODULE_4__["FormService"],
            _form_elements_components_take_image_elements__WEBPACK_IMPORTED_MODULE_5__["VideoService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]])
    ], MidrasFormComponent);
    return MidrasFormComponent;
}());



/***/ }),

/***/ "./src/app/login/index.ts":
/*!********************************!*\
  !*** ./src/app/login/index.ts ***!
  \********************************/
/*! exports provided: LoginComponent, LoginRouteActivatorService, UserAnthentityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]; });

/* harmony import */ var _login_route_activator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login-route-activator.service */ "./src/app/login/login-route-activator.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginRouteActivatorService", function() { return _login_route_activator_service__WEBPACK_IMPORTED_MODULE_1__["LoginRouteActivatorService"]; });

/* harmony import */ var _user_anthentity_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-anthentity.service */ "./src/app/login/user-anthentity.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserAnthentityService", function() { return _user_anthentity_service__WEBPACK_IMPORTED_MODULE_2__["UserAnthentityService"]; });






/***/ }),

/***/ "./src/app/login/login-route-activator.service.ts":
/*!********************************************************!*\
  !*** ./src/app/login/login-route-activator.service.ts ***!
  \********************************************************/
/*! exports provided: LoginRouteActivatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRouteActivatorService", function() { return LoginRouteActivatorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_anthentity_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-anthentity.service */ "./src/app/login/user-anthentity.service.ts");




var LoginRouteActivatorService = /** @class */ (function () {
    function LoginRouteActivatorService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    LoginRouteActivatorService.prototype.canActivate = function (route) {
        if (this.auth.isLogin()) {
            return true;
        }
        this.router.navigate(['login']);
    };
    LoginRouteActivatorService.prototype.canDeactivate = function (route) {
        if (this.auth.isLogin()) {
            this.router.navigate(['form']);
        }
        return true;
    };
    LoginRouteActivatorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_user_anthentity_service__WEBPACK_IMPORTED_MODULE_3__["UserAnthentityService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], LoginRouteActivatorService);
    return LoginRouteActivatorService;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-popup\">\n\t<form #loginForm=\"ngForm\" (ngSubmit)=\"login(loginForm.value)\">\n\t\t<div class=\"user-name\">\n\t\t\t<label for=\"userName\">שם משתמש:</label>\n\t\t\t<input type=\"text\" [(ngModel)]=\"userName\" name=\"userName\" id=\"userName\" required>\n\t\t</div>\n\t\t<div class=\"password\">\n\t\t\t<label for=\"password\">סיסמה:</label>\n\t\t\t<input type=\"password\" [(ngModel)]=\"password\" name=\"password\" id=\"password\" required>\n\t\t</div>\n\t\t<div class=\"submit\">\n\t\t\t<span (mouseenter)=\"mouseoverLogin=true\" (mouseleave)=\"mouseoverLogin=false\">\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"loginForm.invalid\">התחבר</button>\n\t\t\t</span>\n\t\t</div>\n\t</form>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-popup {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content; }\n  .login-popup label {\n    color: #fff;\n    font-size: 1.6rem;\n    margin-left: .5rem;\n    min-width: 9rem; }\n  .login-popup input {\n    border: 0;\n    border-radius: .4rem;\n    line-height: 2rem; }\n  .user-name {\n  margin-bottom: 1rem; }\n  .password {\n  margin-bottom: 1rem; }\n  .main-logo {\n  width: 20rem;\n  display: block;\n  margin: 0 auto 4rem; }\n  .btn-primary {\n  width: 22rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsIi9Vc2Vycy90emFmcmlyLnJhdmVoL1dlYnN0b3JtUHJvamVjdHMvY2FudmFzL2NoYXJ0czYvc3JjL2FwcC9zdHlsZS9fdmFyaWJsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsZ0JBQWU7RUFDZixTQUFRO0VBQ1IsVUFBUztFQUNULHlDQUErQjtVQUEvQixpQ0FBK0I7RUFDL0IsMkJBQWtCO0VBQWxCLHdCQUFrQjtFQUFsQixtQkFBa0IsRUFhbkI7RUFsQkQ7SUFRSSxZQ1RjO0lEVWQsa0JBQWlCO0lBQ2pCLG1CQUFrQjtJQUNsQixnQkFBZSxFQUNoQjtFQVpIO0lBY0ksVUFBUztJQUNULHFCQUFvQjtJQUNwQixrQkFBaUIsRUFDbEI7RUFFSDtFQUNFLG9CQUFtQixFQUNwQjtFQUNEO0VBQ0Usb0JBQW1CLEVBQ3BCO0VBQ0Q7RUFDRSxhQUFZO0VBQ1osZUFBYztFQUNkLG9CQUFtQixFQUNwQjtFQUNEO0VBQ0UsYUFBWSxFQUNiIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vc3R5bGUvdmFyaWJsZVwiO1xuXG4ubG9naW4tcG9wdXAge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcblxuICBsYWJlbCB7XG4gICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBtYXJnaW4tbGVmdDogLjVyZW07XG4gICAgbWluLXdpZHRoOiA5cmVtO1xuICB9XG4gIGlucHV0IHtcbiAgICBib3JkZXI6IDA7XG4gICAgYm9yZGVyLXJhZGl1czogLjRyZW07XG4gICAgbGluZS1oZWlnaHQ6IDJyZW07XG4gIH1cbn1cbi51c2VyLW5hbWUge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuLnBhc3N3b3JkIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cbi5tYWluLWxvZ28ge1xuICB3aWR0aDogMjByZW07XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgYXV0byA0cmVtO1xufVxuLmJ0bi1wcmltYXJ5IHtcbiAgd2lkdGg6IDIycmVtO1xufVxuIiwiJGNvbG9yLW1haW46ICMzYjQ2NWM7XG4kY29sb3Itd2hpdGU6ICNmZmY7XG4kY29sb3ItYmxhY2s6ICMwMDA7XG4kY29sb3ItZXJyb3I6ICNmZjlhOWE7XG4kY29sb3ItZ3JlZW46ICM0MzljNDM7XG4kY29sb3ItdW5zZWxlY3RlZDogIzU2NTg1NjtcbiRjb2xvci1kYXJrLWJsdWU6ICMyYTNkNjM7XG4iXX0= */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_anthentity_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-anthentity.service */ "./src/app/login/user-anthentity.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        var lastLogin = JSON.parse(localStorage.getItem('userAuth'));
        if (lastLogin) {
            this.userName = lastLogin.userName;
            this.password = lastLogin.password;
        }
    }
    LoginComponent.prototype.login = function (formValues) {
        this.auth.updateCurrentUser(formValues.userName, formValues.password);
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'login-popup',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_user_anthentity_service__WEBPACK_IMPORTED_MODULE_2__["UserAnthentityService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/user-anthentity.service.ts":
/*!**************************************************!*\
  !*** ./src/app/login/user-anthentity.service.ts ***!
  \**************************************************/
/*! exports provided: UserAnthentityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAnthentityService", function() { return UserAnthentityService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");




var UserAnthentityService = /** @class */ (function () {
    function UserAnthentityService(router) {
        this.router = router;
        this.loginAlready = false;
    }
    UserAnthentityService.prototype.canActivate = function (route) {
        if (!this.isAuthenticated()) {
            console.log(true);
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    UserAnthentityService.prototype.updateCurrentUser = function (userName, password) {
        var _this = this;
        this.currentUser = {
            userName: userName,
            password: password
        };
        localStorage.setItem('userAuth', JSON.stringify(this.currentUser));
        this.isAuthenticated().then(function (value) {
            if (value) {
                _this.router.navigate(['form']);
            }
            else {
                console.log(false);
            }
        });
    };
    UserAnthentityService.prototype.isLogin = function () {
        // return true;
        return this.loginAlready;
    };
    UserAnthentityService.prototype.isAuthenticated = function () {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append('userName', this.currentUser.userName);
            formData.append('password', this.currentUser.password);
            var xhr = new XMLHttpRequest;
            xhr.open('POST', _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].serverCall + "/get-user-sheets", true);
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var res = JSON.parse(xhr.response);
                    if (res.user === 'authentic') {
                        this.loginAlready = true;
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            }.bind(this);
            xhr.send(formData);
        }.bind(this));
        /*const localUser = localStorage.getItem('userAuth');
        if (localUser) {
            console.log('call server');
            this.router.navigate(['/form']);
            return true;
        } else if (this.currentUser) {
            console.log('call to server with what we have');
            return false;
        } else {
            console.log('stay and login');
            return false
        }*/
    };
    UserAnthentityService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], UserAnthentityService);
    return UserAnthentityService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    serverCall: 'http://localhost:3000'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .then(function (param) { return console.log('start', param); })
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/tzafrir.raveh/WebstormProjects/canvas/charts6/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map