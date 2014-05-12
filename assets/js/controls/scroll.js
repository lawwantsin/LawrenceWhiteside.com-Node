App.Scroll = can.Control({

	init :function() {
		this.initScrollMagic();
	},

	initScrollMagic :function() {
		// init the this.scrollController
		this.scrollController = new ScrollMagic({
			container: "#scroll-wrapper"
		});
		var t = (Modernizr.touch);
		var iScrollOptions = {
			scrollX: false, scrollY: true, scrollbars: false, 
			useTransform: false, useTransition: true, probeType: 3,
			bounce: false, momentum: false
		}
		if (!t) $.extend(iScrollOptions, {touch: false});
		this.iScroll = new IScroll('#scroll-wrapper', iScrollOptions);
		(t) ? this.initTouchScroll() : this.initNoTouchScroll();
		this.iScroll.on("scroll", function () {
			self.scrollController.update();
		});
		this.sections = $('section');
		this.currentSection = 0;
	},

	'.next click' :function() {
		if (this.sections.eq(this.currentSection+1).length > 0) {
			this.section = this.sections.eq(this.currentSection);
			this.currentSection = this.currentSection+1;
			this.iScroll.scrollTo(0, -this.section.offset().top, 0);
		}
	},

	initTouchScroll :function() {
		var self = this;

		// update container on scroll
		this.iScroll.on("scroll", function () {
			self.scrollController.update();
		});

		// overwrite scroll position calculation to use child's offset instead of parents scrollTop();
		this.scrollController.scrollPos(function () {
			var s = self.iScroll.y;
			$('.scrollPos').text(s);
			return s;
		});

		// refresh height, so all is included.
		setTimeout(function () {
		    self.iScroll.refresh();
		}, 0);

		$("#scroll-wrapper").on("touchend", "a", function (e) {
			// a bit dirty workaround for links not working in iscroll for some reason...
			e.preventDefault();
			window.location.href = $(this).attr("href");
		});

		// manual set hight (so height 100% is available within scroll container)
		$(document).on("orientationchange", function () {
			$("section")
				.css("min-height", $(window).height())
				.parent(".scrollmagic-pin-spacer").css("min-height", $(window).height());
		});
		$(document).trigger("orientationchange"); // trigger to init
		//this.firstTry();
		this.animateOpening();
	},

	initNoTouchScroll :function() {
		this.animateOpening();
	}, 
 
	animateOpening :function() {
		var self = this;

 		// LW grows - 1pg - 1
		var TLOpening = new TimelineMax()
			.to('.initials', 1, {opacity: 1, fontSize: '230px'})
			.from('.position1', 1, {left: '80%', opacity: 0}, 'pos')
			.from('.position2', 1, {right: '80%', opacity: 0}, 'pos');

		var holdInitials = new ScrollScene({duration: 2100})
			.setPin('section#opening')
			.setTween(TLOpening)
			.addTo(self.scrollController)

		var SCInitialsBlack = new ScrollScene({duration: 250})
			.setTween(new TimelineMax().to('.initials', 1, {color: 'black'}))
			.addTo(self.scrollController)
			.on('leave', function() {
				$('.name').addClass('nameIn');
			});

		// Intro Bubble - 4
//		$('#introBubble').css({marginTop: 1500});
		var SCintroBubble = new ScrollScene({duration: 1000, offset: 100})
			.triggerElement('#introBubble')
			.setPin('#introBubble')
			.addTo(self.scrollController)

		$.each(['csf', 'fan', 'spins', 'fads'], function(i,e) {
			self.presentSite(e,i);
		});
	},

	presentSite :function(label, num) {

		var self = this;

		this.oldBG = this.oldBG || '';
		var bgI = $('#bg-'+label);
		var tlBG = new TimelineMax()
			.to(bgI, 1, {opacity: 1, onStart : function() {
				bg.sizeBigImage(bgI)
			}})
			.to(this.oldBG, 1, {opacity: 0});
		this.oldBG = bgI

		var scBG = new ScrollScene({duration: 500})
			.triggerElement('#'+label)
			.setTween(tlBG)
			.addTo(this.scrollController)

		// Screen Shots
		var a = $('#'+label+' .poster');
		$.each(a, function(i,e) {
			self.presentScreenshot(e);
		});

	},

	presentScreenshot :function(el) {

		var tlSkew = new TimelineMax()
			.to($(el).find('img'), 2, {rotationY: '-30deg', width: 600, marginLeft: "+=300"}, 'move');

		var scSkew = new ScrollScene({duration: 250, offset: 200})
			.triggerElement(el)			
			.setTween(tlSkew)
			.addTo(this.scrollController)

		var scPin = new ScrollScene({duration: 500, offset: 200})
			.triggerElement(el)
			.setPin(el)
			.addTo(this.scrollController)

		// Show Caption
		var tlCaption = new TimelineMax()
			.to($(el).find('.caption'), 1, {opacity: 1, right: '52%'});

		var scCaption = new ScrollScene({duration: 250, offset: 200})
			.triggerElement(el)			
			.setTween(tlCaption)
			.addTo(this.scrollController)

	}

});
scroll = new App.Scroll(document);
