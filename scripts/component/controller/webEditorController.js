define([
"app"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$controller"];
	var Controller = function ($scope, $controller) {

	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("webEditorController", Controller);
});