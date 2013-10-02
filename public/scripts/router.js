define(['backbone'], function(Backbone) {
	var Router = Backbone.Router.extend({
		
		routes: {
			'': 'home',
			'show/:id': 'showIdea'
		},

		home: function() {
			App.Vent.trigger('init');
		},

		showIdea: function(id) {
			App.Vent.trigger('showIdea', id);
		}
	});

	return Router;
});