window.ProductView = Backbone.View.extend({

	initialize: function(){
			this.template=_.template( tpl.get('product-details') );
			this.model.bind ('change', this.render, this);
	},

	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this.el;
	},

	events: {
		"click .save" : "saveProduct",
		"click .delete" : "deleteProduct",
	},

	saveProduct: function(){
		this.model.set({
			name: $('#name').val(),
			type: $('#type').val(),
			price: $('#price').val()
		});

		if (this.model.isNew()){
			var self = this;
			app.productList.create(this.model, {
				success: function() {
					app.navigate('products/' + self.model.id, false);
				}
			});
		} else {
			this.model.save();
		}

		return false;
	},

	deleteProduct: function(){
		this.model.destroy({
			success: function(){
				alert("Product was deleted!");
				window.history.back();
			}
		});

		return false;
	}
});