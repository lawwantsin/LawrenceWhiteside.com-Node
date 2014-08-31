define(['jquery', 'can', 'controls/app'], function($, can, App) {
  
  // Controller for the various actions that occur from scrolling.
  App.Controls.Scroll = can.Control.extend({

    defaults : {
      horizontal: false
    }

  },{

    init :function() {
      this.initIScroll();
    },

    initIScroll :function() {
      var iScrollOptions = {
        scrollbars: false,// useTransform: false, useTransition: true,
        bounce: true, momentum: true, mouseWheel: true, click: true
      }
      var hor = this.options.horizontal ? {scrollX: true, scrollY: false} : {scrollX: false, scrollY: true};
      $.extend(iScrollOptions, hor);
      if (!Modernizr.touch) $.extend(iScrollOptions, {touch: false});
      this.recalcContentSize();
      var sw = this.options.wrapper;
      if ($(sw).length > 0) {
        this.iScroll = new IScroll(sw, iScrollOptions);
        this.iScroll.on('scrollEnd', function() {
          self.scrolledToBottom(this.scrollTop);
  //        self.checkVisiblity();
        });
        var self = this;      
        this.iScroll.on('scrollStart', function() {      
          // self.hideScrollButton();
        });
      }
    },

    '{window} resize' : function() {
      this.recalcContentSize();
    },

    recalcContentSize :function() {
      var sw = this.options.wrapper;
      var w = 0;
      if (this.options.horizontal) {
        $(sw).children().first().children().each(function(i,e) { w = w + $(e).width() });
        $(sw).children().first().css('width', w);
      }
    },

    // Scroll to the next page in the portfolio on click.
    '.next click' :function() {
      this.scrollNext();
    },

    '.next-icon .ion-chevron-up click' :function(el, ev) {
      this.iScroll.scrollTo(0, 0);
    },

    // Helper function: Use iScroll to scroll more natively on interior (non-body) divs.  
    // Prevents that nasty (safari) elastic bouncey effect on my rock solid page.
    scrollNext :function() {
      var wh = -($(window).height()-100);
      this.iScroll.scrollBy(0, wh, 1200, IScroll.utils.ease.swing);
    },

    // Checks if the scrollContainer is at the bottom.  Turns the arrow up if so.
    scrolledToBottom : function(scrollTop) {
      scrollTop = scrollTop + $(window).height();
      var bottom = $(this.child).height() - 100;
      scrollTop > bottom ? this.yesAtBottom() : this.noAtBottom();
    },

    // Helper: Turns arrow around.
    yesAtBottom :function() {
      $('.next-icon i').removeClass('ion-chevron-down').addClass('ion-chevron-up');
    },

    // Helper: Turns arrow right.
    noAtBottom :function() {
      $('.next-icon i').removeClass('ion-chevron-up').addClass('ion-chevron-down');
    },

    // hideScrollButton : function() {
    //   play.hideScrollButton();
    //   clearTimeout(this.hsbTimeout);
    //   this.hsbTimeout = setTimeout(function() {
    //     play.showScrollButton();
    //   }, 2000);
    // },

    // Checks if the videos are visible.  If so, plays them, if not, pauses them.  
    // CPU mostly but also, don't want anyone to miss the fun.  It's not an animated GIF. 
    checkVisiblity : function() {
      clearTimeout(this.visiblityTimeout);
      this.visiblityTimeout = setTimeout(function() {
        var vs = $('video').each(function() {
          $(this).visible() ? this.player.play() : this.player.pause();
        });
      }, 1000);
    }

  });
});
