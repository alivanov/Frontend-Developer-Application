window.Product = Backbone.Model.extend ({
	defaults: {
		"id": null,
		"name": "n/a",
		"type": "n/a",
		"price": "0"
	},

	urlRoot: "products/"
});

window.ProductCollection = Backbone.Collection.extend({
	model: Product,
	localStorage: new Store("Products-storage") /*replace this with storage url. For example: url: "products/"*/
});