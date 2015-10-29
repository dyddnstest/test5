"use strict";

require.config({
	baseUrl: "apps/test5/scripts",
	paths: {
		'text': 'vendor/text'
	}
});

require([
"app"
], function(app){
	app.initialize();
});
