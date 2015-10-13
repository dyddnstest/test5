"use strict";

require.config({
	baseUrl: "scripts",
	paths: {
		'text': 'vendor/text'
	}
});

require([
"app"
], function(app){
	app.initialize();
});
