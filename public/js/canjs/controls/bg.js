define(['jquery', 'can', 'canjs/controls/app'], function($, can, App) {
	// Controller for the Full Screen Background Images/Videos.
	// Catchall controller for functions do not need their own conroller, yet.
	App.Controls.BG = can.Control.extend({

		defaults: {
		}

	}, {

		init : function(el) {
			var self = this;
			if (el.attr('data-video') == 'on') self.setupVideo();
			else $('#theme-video').hide();
		},

		// Pauses the fullscreen video player, if playing on click anywhere on Stage.
		'.main-stage .click' :function(el, ev) {
			if (this.bigPlayer && $(e.target).hasClass('stage-width')) 
				(this.bigPlayer.paused()) ? this.bigPlayer.play() : this.bigPlayer.pause();
		},

		// Set the volume off or on.
		'.volume .click' :function(el, ev) {
			(this.bigPlayer.volume() == 0) ? this.bigPlayer.volume(1) : this.bigPlayer.volume(0)
		},

		// VideoJS initializer for full screen background video that loops.
		// On init it calls a resize function and mutes the volume. 
		setupVideo :function() {
			var self = this;
			videojs('#bigScreen', {
				autoplay: true,
				controls: false,
				loop: true
			}, function() {
				self.doResize();
			}).volume(0).ready(function(){
				self.bigPlayer = this;
			});
		}

	});

});
