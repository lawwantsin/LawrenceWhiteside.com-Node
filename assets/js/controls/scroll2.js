App.Controls.Scroll = can.Control.extend({

  defaults : {
    wrapEl : '.scrollContainer'
  }

},{

  init :function() {
    this.initScrollMagic();
  },

  initScrollMagic :function() {
    // init the this.scrollController
    // this.scrollController = new ScrollMagic({
    //   container: this.options.wrapEl
    // });
    var t = (Modernizr.touch);
    var iScrollOptions = {
      scrollX: false, scrollY: true, scrollbars: false, 
      useTransform: true, useTransition: true, probeType: 2,
      bounce: true, momentum: true, bindToWrapper: true
    }
    if (!t) $.extend(iScrollOptions, {touch: false});
    this.iScroll = new IScroll(this.options.wrapEl, iScrollOptions);
    this.initTouchScroll();
  },

  '{document} scroll' :function(el, ev) {
    console.log(ev.target)
  },

  '{window} resize' :function() {
    var self = this;
    self.iScroll.refresh();
  },

  initTouchScroll :function() {
    var self = this;

    // update container on scroll
    this.iScroll.on("scroll", function () {
      console.log('scrollin')
    });

    // overwrite scroll position calculation to use child's offset instead of parents scrollTop();
    // this.scrollController.scrollPos(function () {
    //   var s = self.iScroll.y;
    //   $('.scrollPos').text(s);
    //   return s;
    // });

    // $(this.options.wrapEl).on("touchend", "a", function (e) {
    //   // a bit dirty workaround for links not working in iscroll for some reason...
    //   e.preventDefault();
    //   window.location.href = $(this).attr("href");
    // });

    // // manual set hight (so height 100% is available within scroll container)
    // $(document).on("orientationchange", function () {
    //   $("section")
    //     .css("min-height", $(window).height())
    //     .parent(".scrollmagic-pin-spacer").css("min-height", $(window).height());
    // });
    // $(document).trigger("orientationchange"); // trigger to init
  }

});
scroller = new App.Controls.Scroll('body', {wrapEl: '.scrollContainer'});
