"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/webEditorController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compWebEditor", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<div class="comp-wrapper">'
				+ '<span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>'
				+ '<div ckeditor="options" ng-model="meta.value"></div>'
				+ '</div>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = {
					compId: compId,
					compType: "webEditor",
					value: "타이틀을 입력하세요."
				};

				$scope.removeComp = function(){
					elem.remove();
					applicationMeta.removeItem(parentId, compId);

					$scope.$emit("removeComp");
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					require(["text!component/views/webEditor.html"], function (template) {
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