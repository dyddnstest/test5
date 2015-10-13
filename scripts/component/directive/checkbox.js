"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/checkboxController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compCheckbox", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<input type="checkbox" ng-checked="meta.checked" ng-disabled="meta.disabled" />',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = {
					compId: compId,
					compType: "checkbox",
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

					$scope.$emit("selectedComp", "Checkbox");

					require(["text!component/views/checkbox.html"], function (template) {
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