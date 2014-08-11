define(['jquery', 'can', 'controls/app'], function($, can, App) {
	// Controller for the Full Screen Background Images/Videos.
	// Catchall controller for functions do not need their own conroller, yet.
	App.Controls.BG = can.Control.extend({

		init : function(el) {
			var self = this;
			if (el.attr('data-video') == 'on') self.setupVideo();
			else $('#theme-video').hide();
			setTimeout(function() {
				self.sizeBigImages($('#theme-image').find('img'));
			},1);
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

		// Determine the best way to size an image while maintaining aspect ratios across any screen size.
		sizeBigImages : function(images) {
			images = (typeof(images) == "Array") ? [images] : images; 
			$.each(images, function(i, image) {
				var sizes = {};
				sizes.ih = image[0].naturalHeight;
				sizes.iw = image[0].naturalWidth;
				var iRatio = sizes.iw/sizes.ih;  // >1 is landscape; <=1 is portrait
				sizes.ww = $(window).width();
				sizes.wh = $(window).height();
				var winRatio = sizes.ww/sizes.wh;
				if ((sizes.ww-sizes.iw) < (sizes.wh-sizes.ih)) sizes = this.scaleUp('height', sizes);
				if ((sizes.ww-sizes.iw) >= (sizes.wh-sizes.ih)) sizes = this.scaleUp('width', sizes);
				var niRatio = sizes.niw/sizes.nih;  // >1 is landscape; <=1 is portrait
				image.css({ height: sizes.nih, width: sizes.niw});
			});
		}, 

		// Helper function to above. Takes an object containing image and window heights and 
		// adds new image height and width (nih/niw) to it based on the type of sizing needed to cover the screen
		// Portrait and landscape screens require opposing scalingUp.  
		scaleUp :function(type, sizes) {
			if (type == 'height') {
				ratio = (sizes.wh/sizes.ih)
				sizes.nih = sizes.wh
				sizes.niw = sizes.iw * ratio;
			}
			else {
				ratio = (sizes.ww/sizes.iw)
				sizes.niw = sizes.ww
				sizes.nih = sizes.ih * ratio;
			}
			return sizes
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
		},

		// Resizes full screen video. TODO: Make as sexy as full screen images.  Not optimized for portrait/landscape scenarios.
		doResize : function() {
			var w = $(window).width();
			var h = $(window).height();
			$('#bigScreen').css({height: h, width: w});
		},

			// Event to resize images on window resize.  Unused for now.
			// 	'{window} resize' : function() {
			//		this.doResize($('#theme-image').find('img'));
			// 	}

	});

});
