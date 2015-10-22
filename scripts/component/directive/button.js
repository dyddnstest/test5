"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/buttonController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compButton", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<button class="comp-body button button-{{meta.theme}}">{{meta.value}}</button>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = elem.data("meta") ? JSON.parse(elem.data("meta")) : {
					compId: compId,
					compType: "button",
					theme: applicationMeta.getTheme(),
					value: "버튼"
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

					$scope.$emit("selectedComp", "Button");

					require(["text!component/views/button.html"], function (template) {
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