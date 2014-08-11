define(['jquery', 'can', 'controls/app'], function($, can, App) {
	// Controller to handle actions on each section.
	// Used to center the intro bubble in all devices for now.
	App.Controls.Section = can.Control.extend({

		init : function() {
			var self = this;
			this.oHeight = this.element.height();
			self.sizeToScreen();
			$(window).on('resize', function() {
				self.sizeToScreen();
			})
		},

		// Centers vertically the section on the stage, minus the header height.
		sizeToScreen : function() {
			this.element.css({height: $(window).height()-50})
			// setTimeout(function() {
		 //    scroller.iScroll.refresh();
			// }, 0)
		}

	});
});
