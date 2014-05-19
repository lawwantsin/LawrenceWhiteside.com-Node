App.SectionControl = can.Control({

	init : function() {
		var self = this;
		self.sizeToScreen();
		$(window).on('resize', function() {
			self.sizeToScreen();
		})
	},

	sizeToScreen : function() {
		this.element.css({height: $(window).height()})
		setTimeout(function() {
	    scroller.iScroll.refresh();
		}, 0)
	}

});
var sections = new App.SectionControl('.page');
