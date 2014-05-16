App.NavControl = can.Control({

	init : function() {
		var self = this;
		FastClick.attach(document.body);
		this.currentSection = 'front';
		can.route.ready();
	},

  '.main click' :function() {
    this.toggleMenu('close');
  },

	'.mobile-menu click' : function() {
		this.toggleMenu();
	},

	'.nav-items a click' : function(el, ev) {
		this.toggleMenu('close');
	},

	'.contact click' :function() {
		modals.open('#contactModal')
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

	'.web .logo click' : function(el, ev){
		var p = el.attr('data-page');
	},

	':section/:page route' : function(data) {
		var p = data.page
		var s = data.section
		this.navSection(s, p);
	},

	navSection :function(section, page) {
		if (presenter.getSection() == 'front') {
			this.openDoors(section, page);
		}
		else {
			presenter.revealPage(section, page);
		}
		this.chooseNav(section);
    presenter.setSection(section);
    presenter.setPage(page);
	},

	chooseNav :function(section) {
		$('.nav').removeClass('film').removeClass('web').addClass(section)
	},

	openDoors :function(section, page) {
		t = presenter.playCue('front', 'doors', 'open').revealPage(section, page)
	}

});
var nav = new App.NavControl('body');
