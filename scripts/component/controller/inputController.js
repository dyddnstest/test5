define([
"app"
], function (app) {
	"use strict";
	var injectParams = ["$scope", "$controller"];
	var Controller = function ($scope, $controller) {
		$scope.selectedItems = [{
			type: "text"
		},{
			type: "password"
		},{
			type: "number"
		},{
			type: "url"
		},{
			type: "email"
		},{
			type: "tel"
		}];
		$scope.selectedItem = $scope.selectedItems[0];

		$scope.disabledItems = [false, true];
		$scope.disabledItem = $scope.disabledItems[0];

		$scope.typeChange = function(){
			$scope.meta.type = $scope.selectedItem.type;
		};

		$scope.disabledChange = function(){
			$scope.meta.disabled = $scope.disabledItem;
		};
	};

	Controller.$inject = injectParams;
	app.getApp().register.controller("inputController", Controller);
});