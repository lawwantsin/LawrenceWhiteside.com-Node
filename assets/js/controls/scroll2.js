App.Scroll = can.Control({

  defaults : {
    wrapEl : '#scroll-wrapper'
  }

},{

  init :function() {
    this.initScrollMagic();
  },

  initScrollMagic :function() {
    // init the this.scrollController
    this.scrollController = new ScrollMagic({
      container: this.options.wrapEl
    });
    var t = (Modernizr.touch);
    var iScrollOptions = {
      scrollX: false, scrollY: true, scrollbars: false, 
      useTransform: true, useTransition: true, probeType: 3,
      bounce: false, momentum: false
    }
    if (!t) $.extend(iScrollOptions, {touch: false});
    this.iScroll = new IScroll(this.options.wrapEl, iScrollOptions);
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
      console.log(scrolling)
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

    $(this.options.wrapEl).on("touchend", "a", function (e) {
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
    this.presentSite();
  },

  presentSite :function() {
    var tl = new TimelineMax()
      tl.staggerTo('.infoBox', 1, {backgroundColor: 'red'})

    var csf1 = new ScrollScene({duration: 2100, offset: 400})
      .setTween(tl)
      .addTo(self.scrollController)

  }

});
scroll = new App.Scroll(document, {wrapEl: '.csf .scroller'});
