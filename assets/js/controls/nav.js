App.NavControl = can.Control({

	init : function() {
		var self = this;
		FastClick.attach(document.body);
		this.currentSection = 'front';
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
		this.navSection('film')
	},

	'.bottomDoor click' : function() {
		this.navSection('web')
	},

	navSection :function(section) {
		new TimelineMax()
			.to('.'+section, 1, {autoAlpha: true, opacity: 1})
		if (this.currentSection == 'front') this.openDoors();
	},

	openDoors :function() {
		new TimelineMax()
			.to('.topDoor', 0.5, {top: "-50%"}, 'open')			
			.to('.bottomDoor', 0.5, {top: "100%"}, 'open')
			.to('.centerKnob', 0.5, {marginTop: 0, marginLeft: 0, top: 0, left: 0, width: 50, height: 50, borderRadius: 0})
			.to('.centerKnob', 0.5, {width: '100%'})
	}

});
var nav = new App.NavControl('body');
