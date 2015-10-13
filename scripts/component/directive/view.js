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
				var compId = applicationMeta.getUniqeId();
				$scope.meta = {
					compId: compId,
					compType: "view",
					type: "",
					columns: [{ items: [] }]
				};

				applicationMeta.addView($scope.meta);

				$scope.onDragDrop = function(e, drop){
					var el = drop.draggable;
					if(el.data("compType") === "header" || el.data("compType") === "footer" || el.data("compType") === "view"){
						return;
					}

					var compType = "comp-" + el.data("compType");
					var comp = $compile('<' + compType + ' parent="' + compId + '" class="comp comp-inline"></' + compType + '>')($scope.$new(true));
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
					applicationMeta.removeView(compId);

					$scope.$emit("removeComp");
				};
			}
		};
	}]);
});