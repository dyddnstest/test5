define([
"app"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$controller"];
	var Controller = function ($scope, $controller) {
		$scope.themes = [
			"light",
			"stable",
			"positive",
			"calm",
			"balanced",
			"energized",
			"assertive",
			"royal",
			"dark"
		];

		$scope.selectedTheme = $scope.meta.theme;

		$scope.themeChange = function(){
			$scope.meta.theme = $scope.selectedTheme;
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("headerController", Controller);
});

