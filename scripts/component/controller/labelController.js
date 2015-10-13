define([
"app"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$controller"];
	var Controller = function ($scope, $controller) {
		$scope.fontWeightItems = ["normal", "bold"];
		$scope.fontWeightItem = $scope.fontWeightItems[0];
		$scope.fontWeightChange = function(){
			$scope.meta.fontWeight = $scope.fontWeightItem;
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("labelController", Controller);
});