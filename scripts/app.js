"use strict";
define([
"./service/routeResolver"
], function(routeResolver){
	var app = angular.module("builder", ["ngRoute", "ngResource", "routeResolverServices", "ngDialog", "ngDragDrop", "ckeditor", "ui.sortable", "colorpicker.module"]);
	app.config(["$routeProvider", "routeResolverProvider", "$controllerProvider",
			"$compileProvider", "$filterProvider", "$provide", "$httpProvider", 
				function($routeProvider, routeResolverProvider, $controllerProvider,
					$compileProvider, $filterProvider, $provide, $httpProvider) {

					app.register = {
						controller: $controllerProvider.register,
						directive: $compileProvider.directive,
						filter: $filterProvider.register,
						factory: $provide.factory,
						service: $provide.service
					};

					$httpProvider.defaults.useXDomain = true;
					$httpProvider.defaults.withCredentials = true;
					delete $httpProvider.defaults.headers.common['X-Requested-With'];

					var route = routeResolverProvider.route;
					$routeProvider
						.when("/", route.resolve("createApp"))
						.when("/application/:appId", route.resolve("application"))
					
					//$urlRouterProvider.otherwise("/application");
				}]);

	app.run(["$rootScope", function($rootScope) {

	}]);

	return {
		initialize: function(){
			angular.bootstrap(document, ["builder"]);
		},
		getApp: function(){
			return app;
		}
	};
});