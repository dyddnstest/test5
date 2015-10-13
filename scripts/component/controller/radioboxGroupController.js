define([
"app"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$controller"];
	var Controller = function ($scope, $controller) {
		$scope.addItem = function(){
			$scope.meta.items.push({ value: "" });
		};

		$scope.removeItem = function(index){
			$scope.meta.items.splice(index, 1);
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("radioboxGroupController", Controller);
});