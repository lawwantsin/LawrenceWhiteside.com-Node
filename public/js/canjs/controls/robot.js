// Controller for those little robots (as I like to call them).  Unused.
App.Robot = can.Control({

	init : function() {
		var self = this;
		setTimeout(function() {
			self.centerOnScreen();
			self.setStyles();
		},1);
	},

	// Event hander for window resize
	"{window} resize" :function() {
		this.centerOnScreen();
	},

	// Sets the image container to the bext height/width of the naturalImage.
	setStyles :function() {
		var images = this.element.find('.image img');
		var css = this.determineMaxes(images);
		this.element.css({width: width});
		var imageCont = this.element.find('.feature2');
		imageCont.css(css);
	},

	// figures out what's the biggest image in the bunch and returns an object.
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

	// centers the robot horizontally
	centerOnScreen : function() {
		var w = this.element.width();
		var h = this.element.height();
		this.element.css({marginLeft: -(w/2)});
	}

});
//var robot = new App.RobotControl('.robot');
