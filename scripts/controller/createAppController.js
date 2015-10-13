define([
"app",
"../service/applicationService.js",
"../service/applicationConfig.js"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$location", "applicationService", "applicationConfig"];
	var Controller = function ($scope, $location, applicationService, applicationConfig) {
		$scope.theme = "light";
		$scope.icon = "";

		$scope.submit = function(){
			applicationService.createApplication().then(function(result){
				applicationConfig.setTheme(result.theme);

				$location.path("/application/" + result.id);
			}, function(){

			});
		};

		$scope.themeSelect = function($event, theme){
			$(".theme-select li").removeClass("fa fa-check");
			$($event.target).addClass("fa fa-check");

			$scope.theme = theme;
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("createAppController", Controller);
});