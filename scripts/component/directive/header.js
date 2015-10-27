"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/headerController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compHeader", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<div class="comp-body bar bar-header bar-{{meta.theme}}"><h1 class="title">{{meta.value}}</h1></div>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = {
					compId: compId,
					compType: "header",
					theme: applicationMeta.getTheme(),
					value: "헤더"
				};
				elem.attr("id", $scope.meta.compId);

				applicationMeta.addHeader($scope.meta);

				$scope.removeComp = function(){
					elem.remove();
					applicationMeta.removeItem(parentId, compId);
					
					$scope.$emit("removeComp");
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					$scope.$emit("selectedComp", "Header");

					require(["text!component/views/header.html"], function (template) {
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