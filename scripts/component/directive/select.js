"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/selectController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compSelect", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<select class="comp-body"><option ng-repeat="item in meta.items" value="{{item.value}}">{{item.value}}</option></select>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = {
					compId: compId,
					compType: "select",
					items: []
				};

				$scope.removeComp = function(){
					elem.remove();
					applicationMeta.removeItem(parentId, compId);
					
					$scope.$emit("removeComp");
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					$scope.$emit("selectedComp", "Select");

					require(["text!component/views/select.html"], function (template) {
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