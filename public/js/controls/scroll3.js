define(['jquery', 'can', 'controls/app'], function($, can, App) {
  // Controller for the various actions that occur from scrolling.
  App.Controls.Scroll = can.Control.extend({

    defaults : {
    }

  },{

    init :function() {
      var self = this;
      $('.scrollContainer').scroll(function() {      
        self.scrolledToBottom(this.scrollTop);
        self.checkVisiblity();
      })
    },

    // Checks if the scrollContainer is at the bottom.  Turns the arrow up if so.
    scrolledToBottom : function(scrollTop) {
      scrollTop = scrollTop + $(window).height();
      var bottom = $('.scrollContent').height() - 100;
      if(scrollTop > bottom) {
        this.yesAtBottom();
      }
      else {
        this.noAtBottom();
      }
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
    },

    // Helper: Turns arrow around.
    yesAtBottom :function() {
      $('.next-icon i').removeClass('ion-chevron-down').addClass('ion-chevron-up');
    },

    // Helper: Turns arrow right.
    noAtBottom :function() {
      $('.next-icon i').removeClass('ion-chevron-up').addClass('ion-chevron-down');
    },

    // If icon is up and clicked, scroll to the top
    '.next-icon .ion-chevron-up click' :function(el, ev) {
      $('.scrollContainer').scrollTop(0);
    }


  });
  scroller = new App.Controls.Scroll('body');
});
