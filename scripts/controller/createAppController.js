define([
"app",
"../service/applicationService.js"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$location", "applicationService"];
	var Controller = function ($scope, $location, applicationService) {
		$scope.theme = "light";
		$scope.icon = "";

		$scope.submit = function(){
			applicationService.createApplication().then(function(result){
				$location.path("/application/" + result.body.appId);
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