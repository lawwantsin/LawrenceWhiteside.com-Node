App.SectionControl = can.Control({

	init : function() {
		var self = this;
//		this.sizeToScreen();
	},

	// "{window} resize" :function() {
	// 	this.sizeToScreen();
	// },

	sizeToScreen : function() {
		this.element.css({width: $(window).width(), height: $(window).height()})
	},

	presentPage :function(page) {
		new Timeline().to('.'+page, 1, {opacity: 1});
	}

});
var sections = new App.SectionControl('.page');
