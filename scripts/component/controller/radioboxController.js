define([
"app"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$controller"];
	var Controller = function ($scope, $controller) {
		$scope.checkeds = [false, true];
		$scope.checked = $scope.checkeds[0];
		$scope.checkedChange = function(){
			$scope.meta.checked = $scope.checked;
		};

		$scope.disabledItems = [false, true];
		$scope.disabledItem = $scope.disabledItems[0];
		$scope.disabledChange = function(){
			$scope.meta.disabled = $scope.disabledItem;
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("radioboxController", Controller);
});