"use strict";
define([
"app",
"../../service/applicationMeta.js",
"../controller/viewController.js",
"../../component/directive/label.js",
"../../component/directive/input.js",
"../../component/directive/textarea.js",
"../../component/directive/webEditor.js",
"../../component/directive/select.js",
"../../component/directive/button.js",
"../../component/directive/checkbox.js",
"../../component/directive/radiobox.js",
"../../component/directive/checkboxGroup.js",
"../../component/directive/radioboxGroup.js"
], function (app) {
	var directive = app.getApp().register.directive;
	directive("compView", ["$compile", "applicationMeta", function($compile, applicationMeta){
		return {
			restrict: "E",
			template: '<div class="row">'
				+ '<div class="col" ui-sortable="{connectWith: \'.col\'}" data-drop="true" jqyoui-droppable="{onDrop: \'onDragDrop\'}" data-jqyoui-options="{accept: \'.dragItem\'}"></div>'
				+ '</div>',
			link: function($scope, elem, attrs, ctrl){
				$scope.meta = elem.data("meta") ? JSON.parse(elem.data("meta")) : {
					compId: applicationMeta.getUniqeId(),
					compType: "view",
					type: ""
				};

				$scope.meta.columns = [{ items: [] }];

				applicationMeta.addView($scope.meta);
				$scope.onDragDrop = function(e, drop){
					var el = drop.draggable;
					var cls = "";
					if(el.data("compType") === "header" || el.data("compType") === "view"){
						return;
					}

					if(el.data("compType") === "checkboxGroup" || el.data("compType") === "radioboxGroup"){
						cls = "comp-block";
					}
					else{
						cls = "comp-inline";
					}

					var compType = "comp-" + el.data("compType");
					var comp = $compile('<' + compType + ' parent="' + $scope.meta.compId + '" class="comp ' + cls + '"></' + compType + '>')($scope.$new(false));
					elem.find(".row > .col").append(comp);
				};

				elem.on("click", function(){
					$(".selection").removeClass("selection");
					$(this).addClass("selection");

					$scope.$emit("selectedComp", "View");

					require(["text!component/views/view.html"], function (template) {
						var ctrl = $("#editProperty").html(template);

						$compile(ctrl)($scope);
						$scope.$apply();
					});

					return false;
				});

				$scope.removeComp = function(){
					elem.remove();
					applicationMeta.removeView($scope.meta.compId);

					$scope.$emit("removeComp");
				};
			}
		};
	}]);
});