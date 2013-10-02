require.config({

	// prevent RequireJS caching
	urlArgs: "bust=" + (new Date()).getTime(),

	shim: {
		"backbone": {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		"paginator": {
			deps: ['backbone'],
			exports: 'Backbone.Paginator'
		},
		"text": {
			deps: ['backbone'],
			exports: 'Text'
		}
	}, 

	paths: {
		backbone: 'lib/backbone',
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		paginator: 'lib/paginator',
		text: 'lib/text'
	}
});

require(['views/app', 'paginator'], function(AppView, Paginator) {
	window.App = {
		Vent: _.extend({}, Backbone.Events)
	};

	$.ajax({
		async: false,
		type: 'GET',
		url: '/v1/ideas',
		success: function( response ) {

			var IdeasCollection = Paginator.clientPager.extend({
				paginator_ui: {
					perPage: 4
				}
			});
			
			var ideasCollection = new IdeasCollection( response );
			
			ideasCollection.bootstrap();
			new AppView({ collection: ideasCollection });
		}
	});
	
}); 