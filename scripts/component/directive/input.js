"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/inputController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compInput", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<input class="comp-body" type="{{meta.type}}" value="{{meta.value}}" placeholder="{{meta.placeholder}}" disabled />',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = elem.data("meta") ? JSON.parse(elem.data("meta")) : {
					compId: compId,
					compType: "input",
					type: "text",
					value: "",
					placeholder: "입력하세요",
					disabled: false
				};
				elem.attr("id", $scope.meta.compId);

				applicationMeta.addItem(parentId, $scope.meta);

				$scope.removeComp = function(){
					elem.remove();
					applicationMeta.removeItem(parentId, compId);

					$scope.$emit("removeComp");
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					$scope.$emit("selectedComp", "Input");

					require(["text!component/views/input.html"], function (template) {
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