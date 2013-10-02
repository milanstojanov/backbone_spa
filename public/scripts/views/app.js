define([
	'backbone',
	'../router',
	'views/ideas',
	'views/idea',
	'views/comments',
	'views/helpers/pagination', 
	'views/helpers/tools'], 
	function(Backbone, Router, IdeasView, IdeaView, CommentsView, PaginationView, ToolsView) {
	
	var appView = Backbone.View.extend({
		el: '#content',

		initialize: function() {
		
			App.Vent.on( 'init', this.renderIdeas, this );
			App.Vent.on( 'showIdea', this.showIdea, this );

			new Router();
			Backbone.history.start();
		},

		renderIdeas: function() {
			
			this.$el.empty();			
			this.$el.append( new ToolsView({ collection: this.collection }).el );			
			this.$el.append( new IdeasView({ collection: this.collection }).el );
			this.$el.append( new PaginationView({ collection: this.collection }).el );
		},

		showIdea: function(id) {

			this.$el.empty();

			var singleIdea = this.collection.get( id );
			this.$el.append( new IdeaView({ model: singleIdea }).render().el );
			this.$el.append( new CommentsView({ model: singleIdea }).render().el );			
		}
	});

	return appView;
});