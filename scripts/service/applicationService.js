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

	var Service = function($http, $q, REST_URL, $httpParamSerializerJQLike, serviceError){
		this.getComponents = function(){
			return $q(function(resolve, reject){
				$http.get(window.location.origin + "/mockData/getComponents.json").success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});
			});
		};

		this.createApplication = function(data){
			return $q(function(resolve, reject){
				$http({
					method: "post",
					url: REST_URL + "/AppMain",
					data: data/*,
					headers : {"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}*/
				}).success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});
			});
		};

		this.saveApplication = function(data){
			return $q(function(resolve, reject){
				$http({
					method: "put",
					url: REST_URL + "/AppMain/" + data.appId,
					data: data
				}).success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});


			});
		};

		this.getApplications = function(){
			return $q(function(resolve, reject){
				$http.get(REST_URL + "/AppMain").success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});
			});
		};

		this.getApplication = function(id){
			return $q(function(resolve, reject){
				//$http.get(REST_URL + "/mockData/getApplication.json").success(function(result){
				$http.get(REST_URL + "/AppMain/" + id).success(function(result){
					SuccessDelegate(result, resolve, reject, serviceError);
				}).error(function(result, httpCode){
					serviceError.httpErrorThrowing(httpCode);
					
					reject();
				});
			});
		};
	};

	Service.$inject = ["$http", "$q", "REST_URL", "$httpParamSerializerJQLike", "serviceError"];
	app.getApp().register.service("applicationService", Service);
});