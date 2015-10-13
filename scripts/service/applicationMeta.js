define([
"app"
], function(app){
	var Factory = function($http, $q){
		var meta = {
			appId: "",
			views: []
		};
		return {
			clear: function(){
				meta = {
					appId: "",
					views: []
				};
			},
			addHeader: function(header){
				meta.header = header;
			},
			addView: function(view){
				meta.views.push(view);
			},
			removeView: function(viewId){
				var view = null;
				for (var i=0; i<meta.views.length; i++) {
					if(meta.views[i].compId === viewId){
						meta.views.splice(i, 1);
						break;
					}
				};
			},
			addItem: function(viewId, item){
				var view = null;
				for (var i=0; i<meta.views.length; i++) {
					if(meta.views[i].compId === viewId){
						view = meta.views[i];
						break;
					}
				};

				if(view){
					view.columns[0].items.push(item);
				}
			},
			removeItem: function(viewId, itemId){
				var view = null;
				for (var i=0; i<meta.views.length; i++) {
					if(meta.views[i].compId === viewId){
						view = meta.views[i];
						break;
					}
				};

				if(view){
					var columns = view.columns;
					for(var i=0; i<columns.length; i++){
						for(var j=0; j<columns[i].items.length; j++){
							if(columns[i].items[j].compId === itemId){
								columns[i].items.splice(j, 1);
								break;
							}
						}
					}
				}
			},
			getMeta: function(){
				return meta;
			},
			getUniqeId: function(){
				return (Math.random() * new Date().getTime()).toString();
			}
		};
	};

	Factory.$inject = [];
	app.getApp().register.factory("applicationMeta", Factory);
});

/*
{
	"projectId": "",
	"name": "",
	"desc": "",
	"theme": "",
	"icon": "",
	"header": {
		"theme": "aaa",
		"value": "adafd"
	},
	"views": [{
		"id": "",
		"type": "horizontal",
		"columns": [{
			"items": [{
				"type": "input",
				"value": "test",
				"placeholder": "asdfasdf"
			}, {
				"type": "label",
				"value": "aa"
			}]
		}]
	}]
}
*/