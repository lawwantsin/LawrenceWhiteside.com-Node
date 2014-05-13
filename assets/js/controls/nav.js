App.NavControl = can.Control({

	init : function() {
		var self = this;
		FastClick.attach(document.body);
		this.currentSection = 'front';
		this.navSection('web');
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
		if (this.currentSection == 'front') {
			this.openDoors(section);
			this.chooseNav(section)
		}
    presenter.resetPage(section);
	  presenter.playCue();
	},

	chooseNav :function(section) {
		$('.nav').removeClass('film').removeClass('web').addClass(section)
	},

	openDoors :function(section) {
		var tl = new TimelineMax()
			.to('.topDoor', 0.5, {top: "-50%"}, 'open')			
			.to('.bottomDoor', 0.5, {top: "100%"}, 'open')
			.to('.door', 0, {display: 'none'})
			.to('.knob', 0.5, {marginTop: 0, marginLeft: 0, top: 0, left: 0, width: 110, height: 50, borderRadius: 0}, 'tl')
			.to('.initials', 0.5, {marginTop: 0, marginLeft: 0, top: 0, width: 80, left: 0, height: 50, textAlign: 'left'}, 'tl')
			.to('.initials', 0.5, {fontSize: '30px', lineHeight: '50px'}, 'tl')
			.to('.nameW', 0.5, {width: 30}, 'tl')
			.to('.nameL', 0.5, {width: 19}, 'tl')
			.to('.mobile-menu', 0.5, {opacity: 1}, 'windup')
			.to('.initials', 0.5, {left: 52}, 'windup')
			.to('.knob', 0.5, {width: '100%'}, 'pitch')
			.to('.front', 0.5, {height: 50}, 'pitch')
			.to('.initials', 0.7, {width: '100%'}, 'pitch')
			.to('.nameL', 0.3, {width: 180}, 'across')
			.to('.nameW', 0.2, {width: 180}, 'across')
			.to('.contact', 2, {opacity: 1, right: 0, ease: Bounce.easeOut}, 'across')
			.to('.reachOut', 0.4, {opacity: 1}, 'contact')
			.to('.contact i', 0.4, {rotation: '0deg', ease: Elastic.easeIn}, 'contact')
			.to('.next-icon', 1, {bottom: 10, ease: Elastic.easeOut, delay: '+=1000'})
		tl.to('.'+section, 1, {autoAlpha: true, opacity: 1}, 'web')
		tl.to('.page:first', 1, {display: 'block'}, 'web');
		tl.seek('web')
	}

});
var nav = new App.NavControl('body');
