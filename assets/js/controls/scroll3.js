App.Controls.Scroll = can.Control.extend({

  defaults : {
  }

},{

  init :function() {
    var self = this;
    $('.scrollContainer').scroll(function() {      
      self.scrolledToBottom(this.scrollTop);
    })
  },

  scrolledToBottom : function(scrollTop) {
    scrollTop = scrollTop + $(window).height();
    var bottom = $('.scrollContent').height() - 100;
    console.log(scrollTop, bottom);
    if(scrollTop > bottom) {
      this.yesAtBottom();
    }
    else {
      this.noAtBottom();
    }
  },

  yesAtBottom :function() {
    $('.next-icon i').removeClass('ion-chevron-down').addClass('ion-chevron-up');
  },

  noAtBottom :function() {
    $('.next-icon i').removeClass('ion-chevron-up').addClass('ion-chevron-down');
  },

  '.next-icon .ion-chevron-up click' :function(el, ev) {
    $('.scrollContainer').scrollTop(0);
  }


});
scroller = new App.Controls.Scroll('body');
