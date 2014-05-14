App.NavControl = can.Control({

	init : function() {
		var self = this;
		FastClick.attach(document.body);
		this.currentSection = 'front';
		this.navSection('web', 'fantrotter')
	},

  '.main click' :function() {
    this.toggleMenu('close');
  },

	'.mobile-menu click' : function() {
		this.toggleMenu();
	},

	toggleMenu :function(action) {
		if (this.element.hasClass("navOpen") || action == 'close')
			this.element.removeClass("navOpen");
		else
			this.element.addClass("navOpen");
	},

	'.topDoor click' : function() {
		this.navSection('film', 'morning')
	},

	'.bottomDoor click' : function() {
		this.navSection('web', 'csf')
	},

	navSection :function(section, page) {
		if (this.currentSection == 'front') {
	    presenter.setSection(section);
	    presenter.setPage(page);
			this.openDoors(section, page);
			this.chooseNav(section)
		}
	},

	chooseNav :function(section) {
		$('.nav').removeClass('film').removeClass('web').addClass(section)
	},

	openDoors :function(section, page) {
		presenter.front.open(section, page);
	}

});
var nav = new App.NavControl('body');
