App.Controls.Section = can.Control.extend({

	init : function() {
		var self = this;
		this.oHeight = this.element.height();
		self.sizeToScreen();
		$(window).on('resize', function() {
			self.sizeToScreen();
		})
	},

	sizeToScreen : function() {
		this.element.css({height: $(window).height()-50})
		// setTimeout(function() {
	 //    scroller.iScroll.refresh();
		// }, 0)
	}

});
var sections = new App.Controls.Section('.intro');
