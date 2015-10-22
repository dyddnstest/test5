define([
"app",
"./serviceError.js"
], function(app){
	function SuccessDelegate(result, resolve, reject, serviceError){
		if(result.header.code === 20000){
			resolve(result);
			return;
		}
		
		serviceError.appErrorThrowing(result.code);
		
		reject()
	}

	var Service = function($http, $q, REST_URL, serviceError){
		this.getComponents = function(){
			return $q(function(resolve, reject){
				$http.get(REST_URL + "/mockData/getComponents.json").success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});
			});
		};

		this.createApplication = function(){
			return $q(function(resolve, reject){
				$http.get(REST_URL + "/mockData/createApplication.json").success(function(result){
				//$http.post(REST_URL + "/AppMain").success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});
			});
		};

		this.getApplication = function(){
			return $q(function(resolve, reject){
				$http.get(REST_URL + "/mockData/getApplication.json").success(function(result){
				//$http.post(REST_URL + "/AppMain").success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});
			});
		};
	};

	Service.$inject = ["$http", "$q", "REST_URL", "serviceError"];
	app.getApp().register.service("applicationService", Service);
});