define(['backbone', '../models/comment'], function(Backbone, CommentModel) {

	var CommentsCollection = Backbone.Collection.extend({
		
		model: CommentModel,

		initialize: function(comments, ideaId) {
			this.url = 'v1/ideas/' + ideaId + '/comments'
		}
	});

	return CommentsCollection;
})