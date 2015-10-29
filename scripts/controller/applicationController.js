define([
"app",
"../service/applicationService.js",
"../service/applicationMeta.js",
"../component/directive/view.js",
"../component/directive/header.js"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$routeParams", "$location", "$compile", "applicationService", "applicationMeta"];
	var Controller = function ($scope, $routeParams, $location, $compile, applicationService, applicationMeta) {
		window.onresize = function(){
			$("#comp-list").height(window.innerHeight - 50);
			$("#design-area .panel-body").height(window.innerHeight - 120);
			$("#editProperty").height(window.innerHeight - 120);
		};
		$("#comp-list").height(window.innerHeight - 50);
		$("#design-area .panel-body").height(window.innerHeight - 120);
		$("#editProperty").height(window.innerHeight - 120);

		applicationMeta.clear();

		$scope.components = [];
		applicationService.getComponents().then(function(result){
			$scope.components = result.body;
		}, function(){ });

		applicationService.getApplication($routeParams.appId).then(function(result){
			applicationMeta.setAppId(result.body.appId);
			applicationMeta.setIcon(result.body.icon);
			applicationMeta.setTheme(result.body.theme);
			var views = result.body.views;
			var view = null;
			var column = null;
			var item = null;
			for(var i=0; i<views.length; i++){
				view = views[i];
				var viewComp = $compile('<comp-view class="comp comp-view comp-block"></comp-view>')($scope.$new(false), function(el){
					el.data("meta", JSON.stringify(view));
				});
				angular.element(".content").append(viewComp);

				for(var j=0; j<views[i].columns.length; j++){
					column = views[i].columns[j];
					for(var k=0; k<column.items.length; k++){
						item = column.items[k];

						var cls = "";
						if(item.compType === "checkboxGroup" || item.compType === "radioboxGroup"){
							cls = "comp-block";
						}
						else{
							cls = "comp-inline";
						}

						var itemComp = $compile('<comp-' + item.compType + ' parent="' + view.compId + '" class="comp ' + cls + '"></' + item.compType + '>')($scope.$new(false), function(el){
							el.data("meta", JSON.stringify(item));
						});
						viewComp.find(".row > .col").append(itemComp);
					}
				}
			}
		}, function(){ });

		$scope.onDragStart = function (e, drag) {
			drag.helper.addClass("draggable-helper");
		};

		$scope.onDragDrop = function(e, drop){
			var el = drop.draggable;

			if(el.data("compType") === "header"){
				comp = $compile("<comp-header></comp-header>")($scope.$new(false));
				angular.element(e.target).prepend(comp);

				angular.element(".contenapplicationMeta.addt").addClass("has-header");
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
			applicationService.saveApplication(applicationMeta.getMeta()).then(function(){
				//저장 성공
				alert("저장 되었습니다.");
			}, function(){
				//저장 실패
				alert("저장에 실패 했습니다.");
			});
		};

		//view 의 순서가 바뀔경우
		$scope.viewSortUpdate = function(){
			var array = $("#mainSortable").sortable("toArray");
			applicationMeta.updateViews(array);
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("applicationController", Controller);
});