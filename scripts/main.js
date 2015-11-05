"use strict";

require.config({
	paths: {
		'text': 'vendor/text'
	}
});

require([
"app"
], function(app){
	app.initialize();
});
