App.RobotControl = can.Control({

	init : function() {
		var self = this;
		setTimeout(function() {
			self.centerOnScreen();
		},1);
	},

	"{window} resize" :function() {
		this.centerOnScreen();
	},

	centerOnScreen : function() {
		var w = this.element.width();
		var h = this.element.height();
		this.element.css({marginLeft: -(w/2), marginTop: -(h/2)});
	}

});
var robot = new App.RobotControl('.robot');
