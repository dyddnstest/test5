"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/checkboxGroupController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compCheckboxgroup", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<ul class="list">' +
				'<li class="item item-checkbox" ng-repeat="item in meta.items">' +
					'<label class="checkbox"><input type="checkbox" value="{{item.value}}"></label>{{item.value}}' +
				'</li>' +
			'</ul>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = {
					compId: compId,
					compType: "checkboxgroup",
					items: []
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					$scope.$emit("selectedComp", "Checkbox Group");

					require(["text!component/views/checkboxgroup.html"], function (template) {
						var ctrl = $("#editProperty").html(template);

						$compile(ctrl)($scope);
						$scope.$apply();
					});

					return false;
				});			
			}
		};
	}]);
});