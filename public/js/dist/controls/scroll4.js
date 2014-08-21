define(['jquery', 'can', 'controls/app', 'greensock'], function($, can, App) {
  
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
      var direction = this.options.horizontal ? "scrollLeft"  : "scrollTop"; 
      Draggable.create(this.options.wrapper, {type: direction, edgeResistance:0.1, throwProps:true, lockAxis:true});
      // var iScrollOptions = {
      //   scrollbars: false, useTransform: false, useTransition: true,
      //   bounce: true, momentum: true, mouseWheel: true
      // }
      // var hor = this.options.horizontal ? {scrollX: true, scrollY: false} : {scrollX: false, scrollY: true};
      // $.extend(iScrollOptions, hor);
      // if (!Modernizr.touch) $.extend(iScrollOptions, {touch: false});
      // var sw = this.options.wrapper;
      // var w = ($(sw).find('.frame').length * $(sw).find('.frame').width()) + 30;
      // if (this.options.horizontal) $(sw).children().first().css('width', w);
      // this.iScroll = new IScroll(sw, iScrollOptions);
      // this.iScroll.on('scrollEnd', function() {
      //   console.log(this);
      // });
      // var self = this;      
      // this.iScroll.on('scrollStart', function() {      
      //   self.scrolledToBottom(this.scrollTop);
      //   self.checkVisiblity();
      //   self.hideScrollButton();
      // });
    },

    // Scroll to the next page in the portfolio on click.
    '.next click' :function() {
      this.scrollNext();
    },

    '.next-icon .ion-chevron-up click' :function(el, ev) {
      $('.scrollContainer').scrollTo(0, 500);
    },

    // Helper function: Use iScroll to scroll more natively on interior (non-body) divs.  
    // Prevents that nasty (safari) elastic bouncey effect on my rock solid page.
    scrollNext :function() {
      var wh = -($(window).height()-100);
      // this.iScroll.scrollBy(0, wh, 1200, IScroll.utils.ease.swing);
      // setTimeout(function () {
      //   this.iScroll.refresh();
      // }, 0);
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

    hideScrollButton : function() {
      presenter.play('web', 'scrollButton', 'hide');
      clearTimeout(this.hsbTimeout);
      this.hsbTimeout = setTimeout(function() {
        presenter.play('web', 'scrollButton', 'show');
      }, 2000);
    },

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
