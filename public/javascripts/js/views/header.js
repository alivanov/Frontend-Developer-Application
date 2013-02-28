window.HeaderView = Backbone.View.extend({
	
	initialize: function(){
		this.template = _.template( tpl.get('header') );
	},

	render: function(){
		$(this.el).html(this.template);
		return this.el;
	},

	events: {
		"click .new" : "newProduct"
	},

	newProduct: function(){
		app.navigate("products/new", true);
		return false;
	}
});