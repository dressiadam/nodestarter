app.Page.index = Backbone.View.extend({

	el: 'body',

	initialize: function() {
		console.info("It works! Isn't it?");
		$('#jscheck').html('Javascript is running fine <i class="fa fa-check"></i>');
	}

});
