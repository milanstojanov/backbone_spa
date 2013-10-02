define(['backbone', 'text!../../../templates/pagination.html'], function(Backbone, paginationTpl) {
	var PaginationView = Backbone.View.extend({

		events: {
			'click a.first': 'gotoFirst',
			'click a.prev': 'gotoPrev',
			'click a.next': 'gotoNext',
			'click a.last': 'gotoLast',
			'click a.page': 'gotoPage',
			'click .howmany a': 'changeCount'
		},

		tagName: 'aside',

		pagingTemplate: _.template(paginationTpl),

		initialize: function () {
			this.render();
			this.collection.on('reset', this.render, this);
			this.$el.appendTo('#pagination');

		},
		render: function () {			
			var html = this.pagingTemplate(this.collection.info());
			this.$el.html(html);
		},

		gotoFirst: function (e) {
			e.preventDefault();
			this.collection.goTo(1);
		},

		gotoPrev: function (e) {
			e.preventDefault();
			this.collection.previousPage();
		},

		gotoNext: function (e) {
			e.preventDefault();
			this.collection.nextPage();
		},

		gotoLast: function (e) {
			e.preventDefault();
			this.collection.goTo(this.collection.information.lastPage);
		},

		gotoPage: function (e) {
			e.preventDefault();
			var page = $(e.target).text();
			this.collection.goTo(page);
		},

		changeCount: function (e) {
			e.preventDefault();
			var per = $(e.target).text();
			this.collection.howManyPer(per);
		}
	});

	return PaginationView;
});