window.ProductListView = Backbone.View.extend({
	tagname: 'ul',
	
	initialize: function(){
		var self = this;
		this.model.bind('reset', this.render, this);
		this.model.bind('add', this.appendProduct, this);
	},
	
	render: function() {
		_.each(this.model.models, function (product){
			$(this.el).append (new ProductListItemView({model: product}).render());
		}, this);
		return this.el;
	},

	appendProduct: function(product) {
		$(this.el).append(new ProductListItemView({model: product}).render());
	}

});

window.ProductListItemView = Backbone.View.extend({
	tagname: 'li',
	
	initialize: function(){
		this.template = _.template ( tpl.get('product-list') );
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.close, this);
	},

	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this.el;
	}
});