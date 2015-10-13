"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/textareaController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compTextarea", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<textarea class="comp-body" placeholder="{{meta.placeholder}}" disabled>{{meta.value}}</textarea>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = {
					compId: compId,
					compType: "textarea",
					value: "",
					placeholder: "입력하세요",
					disabled: false
				};

				$scope.removeComp = function(){
					elem.remove();
					applicationMeta.removeItem(parentId, compId);

					$scope.$emit("removeComp");
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					$scope.$emit("selectedComp", "Textarea");

					require(["text!component/views/textarea.html"], function (template) {
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