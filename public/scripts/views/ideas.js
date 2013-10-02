define(['backbone', 'views/idea'], function( Backbone, IdeaView) {

	var IdeasView = Backbone.View.extend({

		id: '#ideas',

		initialize: function() {
			this.renderAll();
			this.collection.on('reset', this.renderAll, this);
		},

		renderAll : function () {
			this.$el.empty();
			this.collection.each (this.addOne, this);
		},
		
		addOne : function (idea) {
			var ideaView = new IdeaView({ model:idea });
			this.$el.append(ideaView.render().el);
		},
	});

	return IdeasView;
});