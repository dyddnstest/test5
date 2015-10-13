define([
"app"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$controller"];
	var Controller = function ($scope, $controller) {
		$scope.disabledItems = [false, true];
		$scope.disabledItem = $scope.disabledItems[0];
		$scope.disabledChange = function(){
			$scope.meta.disabled = $scope.disabledItem;
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("textareaController", Controller);
});