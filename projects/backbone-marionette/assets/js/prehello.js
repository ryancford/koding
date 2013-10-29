(function($) {
	var listModel = Backbone.Model.extend({
		defaults: { title: 'Homepage' }
	});

	var listCollection = Backbone.Collection.extend({
		model: listModel
	});

	var ItemView = Backbone.View.extend({
		tagName: 'li', // name of (orphan) root tag in this.el
		initialize: function(){
		  _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
	},
	render: function(){
	  $(this.el).html('<span>'+this.model.get('title')+'</span>');
	  return this; // for chainable calls, like .render().el
	}
	});

	var listView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button': 'addSubtitle'
		},
		initialize: function() {
			this.currentModel = 0;
			this.collection = new listCollection();
			this.collection.bind('add', this.log);
			var m = new listModel();
			m.set({title: 'subpage' + this.currentModel});
			this.collection.add(m);
			this.render();
			this.log(this.el);
		},
		render: function() {
			$(this.el).append('<h1>Homepage</h1><button>Add subtitle</button>');
		},
		addSubtitle: function() {
			//$('h1').append('<h3>' + this.collection.models[this.currentModel].attributes.title + '</h3>');
			this.log(this.collection.models);
			this.addItem();
		},
		log: function(o) { console.log(o); },
		addItem: function() {
			var m = new listModel();
			m.set({title: 'subpage' + (++this.currentModel)});
			//this.collection.add(m);
			var itemView = new ItemView({
		        model: m
      		});
			//this.log(itemView.render().el);
			$('ul', this.el).append(itemView.render().el);
			// this.currentModel 1;
			m.destroy();
		}
	});

	var homeView = new listView();
})(jQuery);