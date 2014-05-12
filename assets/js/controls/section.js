App.SectionControl = can.Control({

	init : function() {
		var self = this;
		this.sizeToScreen();
	},

	"{window} resize" :function() {
		this.sizeToScreen();
	},

	sizeToScreen : function() {
		this.element.css({width: $(window).width(), height: $(window).height()})
	}

});
//var sections = new App.SectionControl('section');
