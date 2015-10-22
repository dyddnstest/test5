"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/labelController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compLabel", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<div class="comp-body {{meta.align}}" style="font-size:{{meta.fontSize}}px;font-weight:{{meta.fontWeight}};color:{{meta.color}};">{{meta.value}}</div>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = elem.data("meta") ? JSON.parse(elem.data("meta")) : {
					compId: compId,
					compType: "label",
					value: "타이틀을 입력하세요.",
					fontSize: 12,
					fontWeight: "normal",
					color: "#000"
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

					$scope.$emit("selectedComp", "Label");

					require(["text!component/views/label.html"], function (template) {
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