var Routes = Backbone.Router.extend({
	routes: {
		'': 'index',
		'testRoute': 'test',
		'product/:id': 'details'
	},
	index: function() {
		console.log('index hit');
	},
	test: function() {
		console.log('test route fired');
	},
	details: function(id) {
		console.log(id);
	}
});

var myRoutes = new Routes;
myRoutes.on('route:index', function() { console.log('index event fired'); });
myRoutes.on('route:test', function() { console.log('route event fired'); });

Backbone.history.start();

var Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest',
		age: 99,
		sex: 'Unknown'
	},
	validate: function(attrs, ops) {
		console.log('validate');
		if (attrs.age < 0) return 'Age must be positive';
		if (!(attrs.sex === 'Male' || attrs.sex === 'Female' || attrs.sex === 'Unknown')) return 'Sex must be Male, Female or Unknown';
		return true;
	},
	info: function() {
		return this.get('name') + ' is ' + this.get('age') + ' years old and is of ' + this.get('sex') + ' gender.';
	}
});

var me = new Person();
me.on("invalid", function(model, error) { console.log(model.get('name'), error); model.destroy(); });
me.set('sex', 'dfgdfsgf', {validate: true});

var personView = Backbone.View.extend({
	tagName: 'li',
	//template: _.template($('#personTemplate').html()),
	template: _.template( $('#personTemplate').html()),
	initialize: function() { console.log('init ' + this.model.attributes.name); this.render(); },
	render: function() {
		console.log('render ' + this.model.attributes.name);
		this.$el.html(this.template(this.model.toJSON()));
		$(document.body).append(this.el);
	}
});

var meView = new Person({ name: 'Ryan', age: 36, sex: 'Male' });
var view = new personView({model: meView});

meView.destroy();
//$('#personTemplate').html()