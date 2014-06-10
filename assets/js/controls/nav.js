App.Controls.Nav = can.Control.extend({

	init : function() {
		this.doorState = 'closed';
		FastClick.attach(document.body);
		can.route.ready();
		this.autoOpen();
	},

	autoOpen :function() {
		var b = this.element;
		if (b.hasClass('supl')) {
			var section = b.find('.half').attr('data-section');
			this.navSection('supl', section);
		}
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

  '.next click' :function() {
    this.scrollNext();
  },

  scrollNext :function() {
  	scroller.iScroll.next()
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

	':half/:section route' : function(data) {
		var s = data.section
		var h = data.half
		this.navSection(h, s);
	},

	':half route' : function(data) {
		var h = data.half
		this.navSection(h);
	},

	navSection :function(half, section, page) {
		if (this.doorState == 'closed')
			this.openDoors(half, section);
		else
			presenter.revealSection(half, section);
		this.chooseHalf(half);
    presenter.setSection(section);
	},

	chooseHalf :function(half) {
    presenter.setHalf(half);
		$('.nav').removeClass('film').removeClass('web').addClass(half)
	},

	openDoors :function(half, section) {
		console.log(arguments)
		t = presenter.play('front', 'doors', 'open').revealSection(half, section, 0);
		this.doorState = 'open';
	}

});
var nav = new App.Controls.Nav('body');
