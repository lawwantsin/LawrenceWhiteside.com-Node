App.NavControl = can.Control({

	init : function() {
		var self = this;
	},

  '.main-overlay click' :function() {
    this.toggleMenu();
  },

	'.mobile-menu click' : function() {
		this.toggleMenu();
	},

	toggleMenu :function() {
		if (this.element.hasClass("navOpen"))
			this.element.removeClass("navOpen");
		else
			this.element.addClass("navOpen");
	}

});
var nav = new App.NavControl('.site');
