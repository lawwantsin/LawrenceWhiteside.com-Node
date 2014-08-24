define(['jquery', 'can', 'controls/app'], function($, can, App) {
	// Controller for the Navigation menu.
	// Also where the can.Route functionality is defined.
	App.Controls.Nav = can.Control.extend({

		init : function() {
			this.doorState = 'middle';
			FastClick.attach(document.body);
			can.route.ready();
			this.autoOpen();
		},

		// Should the site be open from the start?  If it's a supplimental page, the answer is yes.  
		// Otherwise, let the user click to open. 
		autoOpen :function() {
			var b = this.element;
			if (b.hasClass('supl')) {
				var section = b.find('.half').attr('data-section');
				this.navSection('supl', section);
			}
		},

		// Close navigation if the main stage is clicked.
	  '.main click' :function() {
	    this.toggleMenu('close');
	  },

	  // Open and close the navigation side menu on a click.
		'.mobile-menu click' : function() {
			this.toggleMenu();
		},

		// Close the menu anytime a naviation item is clicked.  
		// This closes the menu only.  Navigation is handled by can.Routes by listening to the location hash change.
		'.nav-items a click' : function(el, ev) {
			this.toggleMenu('close');
		},

		// Open the contact dialog if the "contact me" button in the header is clicked.
		'.contact-click click' :function(el, ev) {
			ev.preventDefault();
			modals.open('#contactModal')
		},

	  // Helper function for opening and closing the menu using CSS3.
		toggleMenu :function(action) {
			if (this.element.hasClass("navOpen") || action == 'close')
				this.element.removeClass("navOpen");
			else
				this.element.addClass("navOpen");
		},

		// Sets the section we're going to be scoped to if the top (film) door is clicked.
		// '.topDoor click' : function() {
		// 	this.navSection('film', 'morning')
		// },

		// // Sets the section we're going to be scopeed to if the bottom (web) door is clicked.
		// '.bottomDoor click' : function() {
		// 	this.navSection('web', 'csf')
		// },

		// Sets the page scope on a logo click.  E.G. each company in web and each project in film.
		// TODO: Resolve the section/page taxonomy inconsistency.
		'.web .logo click' : function(el, ev){
			var p = el.attr('data-page');
		},



		// Routing events.  Sets the half (web/film) and the 
		':half/:section route' : function(data) {
			var s = data.section
			var h = data.half
			this.navSection(h, s);
		},

		':half route' : function(data) {
			var h = data.half
			if (this.doorState == h) {
				this.moveDoors('middle');
			}
			else {
				this.navSection(h);
			}
		},

		// Routing events sets the half without specifying which project.
		'route' : function(data) {
			var sup = $('body').hasClass('supl');
			if (location.hash == '#!' && !sup) this.moveDoors(this.doorState);
			else if (sup) this.moveDoors('web')
		},

		// Helper function: Opens the door if needsbe.  Sets half and section.
		navSection :function(half, section, page) {
			this.chooseHalf(half);
			if (this.doorState == half) {
				presenter.revealSection(half, section);
	      setTimeout(function () {
	        window[half+'Scroller'].iScroll.refresh();
	      }, 0);
		    presenter.setSection(section);
			}
			else {
				this.moveDoors(half, section);
			}
		},

		// Half is web or film.  2 halves of the portfolio.  TODO: Film is not yet written.
		chooseHalf :function(half) {
	    presenter.setHalf(half);
			$('.nav').removeClass('film').removeClass('web').addClass(half)
			this.moveDoors(half);
		},

		// Helper funcion: open the doors in the front of the site.
		moveDoors: function(half, section) {
      if (this.doorState != half) {
        presenter.play('front', 'doors', half)
	      var tl = new TimelineMax().to('.section, .half', 0, {zIndex: 1, opacity: 0, display: 'none'}, 'style')
        if (section) presenter.revealSection(half, section, 1000).play('shared', 'scrollButton', 'show');
        this.doorState == half;
        $('.film-label').attr('href', '#!');
        $('.web-label').attr('href', '#!');
				// presenter.setLabel(half);
      }
      else {
        presenter.play('front', 'doors', 'middle');
        this.doorState == 'middle';
        $('.film-label').attr('href', '#!film');
        $('.web-label').attr('href', '#!web');
	      var tl = new TimelineMax().to('.section, .half', 0, {zIndex: 1, opacity: 0, display: 'none'}, 'style')
				presenter.setLabel('front');
      }
		}

	});
});
