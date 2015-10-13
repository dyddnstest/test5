"use strict";
define([], function () {
	var routeResolver = function () {
		this.$get = function () {
			return this;
		};
		
		var routeConfig = function () {
			var viewsDirectory = "/views/",
				controllersDirectory = "/scripts/controller/",

			setBaseDirectories = function (viewsDir, controllersDir) {
				viewsDirectory = viewsDir;
				controllersDirectory = controllersDir;
			},

			getViewsDirectory = function () {
				return viewsDirectory;
			},

			getControllersDirectory = function () {
				return controllersDirectory;
			};

			return {
				setBaseDirectories: setBaseDirectories,
				getControllersDirectory: getControllersDirectory,
				getViewsDirectory: getViewsDirectory
			};
		}();

		this.route = function (routeConfig) {
			var resolve = function (baseName) {
				var routeDef = {};
				var baseFileName = baseName.charAt(0).toLowerCase() + baseName.substr(1);
				routeDef.templateUrl = routeConfig.getViewsDirectory() + baseFileName + ".html";
				routeDef.controller = baseName + "Controller";

				routeDef.resolve = {
					load: ["$q", "$rootScope", function ($q, $rootScope) {
						var dependencies = [routeConfig.getControllersDirectory() + baseFileName + "Controller.js"];
						return resolveDependencies($q, $rootScope, dependencies);
					}]
				};

				return routeDef;
			},
			resolveDependencies = function ($q, $rootScope, dependencies) {
				var defer = $q.defer();
				require(dependencies, function () {
					defer.resolve();
					$rootScope.$apply()
				});

				return defer.promise;
			};

			return {
				resolve: resolve
			}
		}(routeConfig);
	};


	var servicesApp = angular.module("routeResolverServices", []);
	servicesApp.provider("routeResolver", routeResolver);
});
