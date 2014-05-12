App.RobotControl = can.Control({

	init : function() {
		var self = this;
		setTimeout(function() {
			self.centerOnScreen();
			self.setStyles();
		},1);
	},

	"{window} resize" :function() {
		this.centerOnScreen();
	},

	setStyles :function() {
		var images = this.element.find('.image img');
		var css = this.determineMaxes(images);
		this.element.css({width: width});
		var imageCont = this.element.find('.feature2');
		imageCont.css(css);
	},

	determineMaxes :function(images) {
		var maxHeights = [];
		var maxWidths = [];
		$.each(images, function(i,e) {
			maxHeights.push(e.naturalHeight);
			maxWidths.push(e.naturalWidth);
		});
		var maxH = Math.max.apply(null, maxHeights);
		var maxW = Math.max.apply(null, maxWidths);
		return {maxHeight: maxH, maxWidth: maxW};
	},

	centerOnScreen : function() {
		var w = this.element.width();
		var h = this.element.height();
		//, marginTop: -(h/2)
		this.element.css({marginLeft: -(w/2)});
	}

});
//var robot = new App.RobotControl('.robot');
