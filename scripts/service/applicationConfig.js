define([
"app"
], function(app){
	var Factory = function($http, $q){
		var icon = "";
		var theme = "light";
		return {
			clear: function () {
				icon = "";
				theme = "light";
			},
			setIcon: function(i){
				icon = i;
			},
			getIcon: function(){
				return icon;
			},
			setTheme: function(t){
				theme = t;
			},
			getTheme: function(){
				return theme;
			}
		};
	};

	Factory.$inject = [];
	app.getApp().register.factory("applicationConfig", Factory);
});