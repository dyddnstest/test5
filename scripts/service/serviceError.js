"use strict";
define([
"app"
], function(app){
	var HTTP_ERR_MSG = {
		0: "서버가 일시 중지되었습니다.",
		404: "서버가 일시 중지되었습니다.",
		400: "잘못된 요청을 보냈습니다.",
		500: "서버에서 처리 중에 에러가 발생했습니다.",
		"unknown": "알수 없는 에러가 발생했습니다."
	};

	var SERVER_ERR_MSG = {
		50000: "실패",
		50010: "요청 파라미터가 잘 못 되었습니다.",
		"unknown": "알수 없는 에러가 발생했습니다."
	};

	app.getApp().register.factory("serviceError", [function(){
		function httpErrorThrowing(httpCode){
			if(HTTP_ERR_MSG[httpCode]){
				alert(HTTP_ERR_MSG[httpCode]);
			}
			else{
				alert(HTTP_ERR_MSG["unknown"]);
			}
		};

		function appErrorThrowing(errorCode){
			if(SERVER_ERR_MSG[httpCode]){
				alert(SERVER_ERR_MSG[httpCode]);
			}
			else{
				alert(SERVER_ERR_MSG["unknown"]);
			}
		}

		return {
			httpErrorThrowing: httpErrorThrowing,
			appErrorThrowing: appErrorThrowing
		};
	}]);
});