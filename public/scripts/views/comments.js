define([
	'backbone',
	'../collections/comments',
	'views/form',
	'views/comment'], function(Backbone, CommentsCollection, CommentFormView, CommentView) {

	var CommentsView = Backbone.View.extend({
		id: 'comments',		
		commentsCollection: null,

		initialize: function() {
			
			var self = this, 
				ideaId = this.model.get('id');
			
			$.ajax({
				async: false,
				type: 'GET',
				url: '/v1/ideas/' + ideaId + '/comments',
				success: function( response ) {
					self.commentsCollection = new CommentsCollection(response, ideaId);					
					self.renderAll();
				}
			});

			this.commentsCollection.on('add', this.renderAll, this);
			
		},	

		renderAll: function() {
			this.$el.empty();

			this.$el.append( 
				new CommentFormView({ collection:this.commentsCollection }).render().el 
			);

			this.commentsCollection.each (this.addOne, this);
		},

		addOne: function(comment) {
			var commentView = new CommentView({ model:comment });
			this.$el.append(commentView.render().el);
		}
	});

	return CommentsView;
})