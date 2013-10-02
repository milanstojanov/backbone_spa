define(['backbone', 'text!../../../templates/tools.html'], function(Backbone, toolsTpl) {
	var ToolsView = Backbone.View.extend({
		
		events: {
			'click .howmany a': 'changeCount',
			'click button.sortAsc': 'sortByAscending',
			'click button.sortDsc': 'sortByDescending',
			'click button.filter': 'filter'
		}, 

		tagName: 'aside',

		toolsTemplate: _.template(toolsTpl),

		initialize: function () {
			this.render();
			this.collection.on('reset', this.render, this);
			this.$el.appendTo('#tools');

		},
		render: function () {			
			var html = this.toolsTemplate(this.collection.info());
			this.$el.html(html);
		},
		sortByAscending: function (e) {
			e.preventDefault();
			var currentSort = this.getSortOption();
			this.collection.setSort(currentSort, 'asc');
			this.collection.pager();
			this.preserveSortOption(currentSort);
		},

		getSortOption: function () {
			return $('#sortByOption').val();
		},

		preserveSortOption: function (option) {
			$('#sortByOption').val(option);
		},

		sortByDescending: function (e) {
			e.preventDefault();
			var currentSort = this.getSortOption();
			this.collection.setSort(currentSort, 'desc');
			this.collection.pager();
			this.preserveSortOption(currentSort);
		},
        
		getFilterField: function () {
			return ['title', 'description'];
		},

		getFilterValue: function () {
			return $('#filterString').val();
		},

		preserveFilterField: function (field) {
			$('#filterByOption').val(field);
		},

		preserveFilterValue: function (value) {
			$('#filterString').val(value);
		},

		filter: function (e) {
			e.preventDefault();

			var fields = this.getFilterField();
			

			var filter = this.getFilterValue();
			this.collection.setFilter(fields, filter);
			this.collection.pager();

			this.preserveFilterField(fields);
			this.preserveFilterValue(filter);
		}
		
	});

	return ToolsView;
});