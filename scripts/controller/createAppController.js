define([
"app",
"../service/applicationService.js"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$location", "applicationService"];
	var Controller = function ($scope, $location, applicationService) {
		$scope.data = {
			name: "",
			theme: "light",
			icon: ""
		};

		$scope.appList = [];
		applicationService.getApplications().then(function(result){
			$scope.appList = result.body.list;
		}, function(){

		});

		$scope.submit = function(){
			applicationService.createApplication($scope.data).then(function(result){
				$location.path("/application/" + result.body.appId);
			}, function(){

			});
		};

		$scope.themeSelect = function($event, theme){
			$(".theme-select li").removeClass("fa fa-check");
			$($event.target).addClass("fa fa-check");

			$scope.data.theme = theme;
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("createAppController", Controller);
});