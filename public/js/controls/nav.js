define(['jquery', 'can', 'controls/app'], function($, can, App) {
	// Controller for the Navigation menu.
	// Also where the can.Route functionality is defined.
	App.Controls.Nav = can.Control.extend({

		init : function() {
			this.doorState = 'middle';
			this.autoOpen();
		},

		// Should the site be open from the start?  If it's a supplimental page, the answer is yes.  
		// Otherwise, let the user click to open. 
		autoOpen :function() {
			var b = this.element;
			if (b.hasClass('supl')) {
				var section = b.find('.half').attr('data-section');
				this.navigate('supl', section);
				play.setLabel('');
			}
			else {
				can.route.ready();
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
		// 	this.navigate('film', 'morning')
		// },

		// // Sets the section we're going to be scopeed to if the bottom (web) door is clicked.
		// '.bottomDoor click' : function() {
		// 	this.navigate('web', 'csf')
		// },

		// Sets the page scope on a logo click.  E.G. each company in web and each project in film.
		// TODO: Resolve the section/page taxonomy inconsistency.
		'.web .logo click' : function(el, ev){
			var p = el.attr('data-page');
		},

		// Routing events sets the half without specifying which project.
		'route' : function(data) {
			var sup = $('body').hasClass('supl');
			if (location.hash == '#!' && !sup) this.moveDoors(this.doorState);
			else if (sup) this.moveDoors('web')
		},

		// Routing events.  Sets the half (web/film) and the 
		':half route' : function(data) {
			console.log('Route: '+data);
			var h = data.half
			if (this.doorState == h) {
				this.moveDoors('middle');
			}
			else {
				this.navigate(h);
			}
		},

		':half/:section route' : function(data) {
			console.log('Route: ', data);
			var s = data.section
			var h = data.half
			this.navigate(h, s);
		},

		// Helper function: Opens the door if needsbe.  Sets half and section.
		navigate :function(half, section, page) {
			if (this.doorState == half && section) {
				play.revealSection(half, section);
			}
			else {
				this.moveDoors(half, section);
				this.showNavHalf(half);
			}
		},

		// Half is web or film.  2 halves of the portfolio.  TODO: Film is not yet written.
		showNavHalf :function(half) {
			$('.nav').removeClass('film').removeClass('web').addClass(half)
		},

		// Helper funcion: open the doors in the front of the site.
		moveDoors: function(half, section) {
			console.log('move Doors: '+half+"|"+section)
      if (this.doorState != half) {
      	var halfUpper = half.slice(0,1).toUpperCase() + half.slice(1);
        var tl = play.resetSections().add(play['door'+halfUpper]());
        if (section) tl.add(play.revealSection(half, section)).add(play.scrollButtonShow());
        this.doorState == half;
        $('.film-label').attr('href', '#!');
        $('.web-label').attr('href', '#!');
				// play.setLabel(half);
      }
      else {
        play.doorMiddle().add(play.resetSections());
        this.doorState == 'Middle';
        $('.film-label').attr('href', '#!film');
        $('.web-label').attr('href', '#!web');
				play.setLabel();
      }
		}

	});
});
