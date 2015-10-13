define([
"app"
], function(app){
	var Service = function($http, $q){
		this.createApplication = function(){
			return $q(function(resolve, reject){
				$http.get("/mockData/createApplication.json").success(function(result){
					resolve(result);
				}).error(function(e){
					reject();
				});
			});
		};

		this.getComponents = function(){
			return $q(function(resolve, reject){
				$http.get("/mockData/components.json").success(function(result){
					resolve(result);
				}).error(function(e){
					reject();
				});
			});
		};
	};

	Service.$inject = ["$http", "$q"];
	app.getApp().register.service("applicationService", Service);
});