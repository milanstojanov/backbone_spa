define(['backbone', 'text!../../templates/form.html'], function(Backbone, CommentTpl) {
	var CommentForm = Backbone.View.extend({

		template: _.template(CommentTpl),

		events: {
			submit: 'addComment'
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		addComment: function(e) {
			e.preventDefault();

			this.collection.create({
				username: this.$('#username').val(),
				body: this.$('#body').val(),
				idea_id: this.ideaId
			});
		}
	});

	return CommentForm;
})