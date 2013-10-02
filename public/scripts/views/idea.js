define(['backbone', 'text!../../templates/idea.html'], function(Backbone, IdeaTpl) {

	var IdeaView = Backbone.View.extend({
		className: 'idea',

		events: {
			'click .voteUp': 'voteUp' 
		},

		template: _.template(IdeaTpl),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		voteUp: function() {
			var self = this;
			var currentVotes = this.model.get('votes');
			this.model.set('votes', ~~currentVotes + 1);

			$.ajax({
				async: false,
				type: 'PUT',
				data: this.model.toJSON(),
				url: '/v1/ideas/' + this.model.get('id'),
				success: function(response) {
					if( !response.error ) {
						self.render();
					}
					
					self.$('.voteUp').attr('disabled', true);
				}
			});
		}
	});

	return IdeaView;
});