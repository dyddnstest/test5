"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/radioboxGroupController.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compRadioboxgroup", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<div class="list">' +
				'<label class="item item-radio" ng-repeat="item in meta.items">' + 
					'<input type="radio" name="group" value="{{item.value}}">' +
					'<div class="item-content">{{item.value}}</div>' +
					'<i class="radio-icon ion-checkmark"></i>' +
				'</label>' +
			'</div>',
			link: function($scope, elem, attrs, ctrl){
				var compId = applicationMeta.getUniqeId();
				var parentId = attrs.parent;
				$scope.meta = elem.data("meta") ? JSON.parse(elem.data("meta")) : {
					compId: compId,
					compType: "radioboxgroup",
					items: []
				};

				elem.on("click", function(){
					$(".comp-selection").removeClass("comp-selection");
					elem.addClass("comp-selection");

					$scope.$emit("selectedComp", "Radiobox Group");

					require(["text!component/views/radioboxgroup.html"], function (template) {
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