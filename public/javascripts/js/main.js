Backbone.View.prototype.close = function () {
	console.log('Closing view' + this);
	
	if ( this.beforeClose ){
		this.beforeClose();
	}

	this.remove();
	this.unbind();
}

var AppRouter = Backbone.Router.extend({

	initialize: function(){
		$('#header').html(new HeaderView().render());
	},

	routes: {
		"": "list",
		"products/new": "newProduct",
		"products/:id": "productDetails"
	},

	list: function(){
		this.before( function(){
			this.showView('#content', new StartView());
		});
	},

	productDetails: function(id) {
		this.before(function(){
			var product = this.productList.get(id);
			this.showView('#content', new ProductView({
				model: product
			}));
		});
	},

	newProduct: function(){
		this.before(function(){
			this.showView('#content', new ProductView({
				model: new Product()
			}));
		});
	},

	showView: function(selector, view) {
		if (this.currentView) this.currentView.close();
		$(selector).html(view.render());
		this.currentView = view;
		return view;
	},

	before: function(callback) {
		if (this.productList){
			if (callback) callback.call(this);
		} else {
			this.productList = new ProductCollection();
			var self = this;
			this.productList.fetch({
				success: function() {
					var productList = new ProductListView ({
						model: self.productList
					}).render();
					$('#sidebar').html(productList);
					if (callback) callback.call(self);
				}			
			});
		}
	}

});

tpl.loadTemplates(['header', 'product-details', 'product-list', 'start'], function() {
	app = new AppRouter();
	Backbone.history.start();
});