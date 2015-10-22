"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/radioboxController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compRadiobox", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<input type="radio" ng-checked="meta.checked" ng-disabled="meta.disabled" />',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = elem.data("meta") ? JSON.parse(elem.data("meta")) : {
					compId: compId,
					compType: "radiobox",
					checked: false,
					disabled: false
				};

				applicationMeta.addItem(parentId, $scope.meta);

				$scope.removeComp = function(){
					elem.remove();
					applicationMeta.removeItem(parentId, compId);

					$scope.$emit("removeComp");
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					$scope.$emit("selectedComp", "Radiobox");

					require(["text!component/views/radiobox.html"], function (template) {
						var ctrl = $("#editProperty").html(template);

						$compile(ctrl)($scope);
						$scope.$apply();
					});

					return false;
				});

				elem.hover(function(){
					elem.addClass("comp-hover");
				}, function(){
					$(".comp-hover").removeClass("comp-hover");
				});
			}
		};
	}]);
});