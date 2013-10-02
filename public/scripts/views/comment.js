define(['backbone', 'text!../../templates/comments.html'], function(Backbone, CommentTpl) {

	var CommentView = Backbone.View.extend({
		className: 'idea',

		template: _.template(CommentTpl),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return CommentView;
});