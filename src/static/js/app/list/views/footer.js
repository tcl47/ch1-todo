define(function(require, exports, module) {

	var marionette     = require('marionette');

	var templateFooter = require('hbs!app/list/templates/footer');

	// footer with options and info
	var FooterView = marionette.ItemView.extend({

		template: templateFooter,

		ui: {
			'count': '.count'
		},

		events: {
			'click .clear': 'removeCompleted'
		},

		serializeData: function() {
			return {
				count: this.collection.getActive().length
			}
		},

		initialize: function(options) {
			this.collection = options.collection;

			// whenever collection is updated, update the count of total active tasks
			this.listenTo(this.collection, 'all', this.countActiveTasks);
		},

		countActiveTasks: function() {
			this.ui.count.html(this.collection.getActive().length);
		},

		// remove - not just hide - all completed tasks
		removeCompleted: function() {
			this.collection.getCompleted().forEach(function(task){
				task.destroy();
			});
		}

	});

	return FooterView;

});
