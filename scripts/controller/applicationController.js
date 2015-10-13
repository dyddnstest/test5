define([
"app",
"../service/applicationService.js",
"../service/applicationConfig.js",
"../service/applicationMeta.js",
"../component/directive/view.js",
"../component/directive/header.js"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$location", "$compile", "applicationService", "applicationMeta"];
	var Controller = function ($scope, $location, $compile, applicationService, applicationMeta) {
		window.onresize = function(){
			$("#comp-list").height(window.innerHeight - 50);
			$("#design-area .panel-body").height(window.innerHeight - 120);
			$("#editProperty").height(window.innerHeight - 120);
		};
		$("#comp-list").height(window.innerHeight - 50);
		$("#design-area .panel-body").height(window.innerHeight - 120);
		$("#editProperty").height(window.innerHeight - 120);

		$scope.components = [];
		applicationService.getComponents().then(function(result){
			$scope.components = result;
		}, function(){ });

		$scope.onDragStart = function (e, drag) {
			drag.helper.addClass("draggable-helper");
		};

		$scope.onDragDrop = function(e, drop){
			var el = drop.draggable;

			if(el.data("compType") === "header"){
				comp = $compile("<comp-header></comp-header>")($scope.$new(true));
				angular.element(e.target).prepend(comp);

				angular.element(".content").addClass("has-header");
				return;
			}

			if(el.data("compType") !== "view"){
				return;
			}

			var comp = $compile('<comp-view class="comp comp-view comp-block"></comp-view>')($scope.$new(false));
			angular.element(".content").append(comp);
		};

		$scope.$on("removeComp", function(){
			$("#editProperty").empty();
		});

		$scope.seletedComp = "";
		$scope.$on("selectedComp", function(o, compName){
			$scope.seletedComp = compName;
		});

		$scope.saveApp = function(){
			console.log(applicationMeta.getMeta());
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("applicationController", Controller);
});