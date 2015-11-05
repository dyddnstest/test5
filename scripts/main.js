"use strict";

require.config({
	baseUrl: "apps/test5", 
	paths: {
		'text': 'vendor/text'
	}
});

require([
"app"
], function(app){
	app.initialize();
});
