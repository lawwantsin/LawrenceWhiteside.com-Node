define(['jquery', 'can', 'controls/app'], function($, can, App) {
  // Controller to encapsulate interaction functionality for any Modals from the POV of a document overload.
  // Used to reveal and hide them.  CloseAll being the reason it's on the document and not each modal.
  App.Controls.Modals = can.Control.extend({

    '.overlay click' : function() {
      this.closeAll();
    },

    '.close-x click' :function() {
      this.closeAll();
    },
    
    closeAll :function() {
      $('.overlay').removeClass('on');
      $('.modal').removeClass('revealled');
    },

    close : function(el) {
      if (el) {
        $(el).removeClass('revealled');
        $('.overlay').removeClass('on');
      }
    },

    open :function(el) {
      this.closeAll();
      $('.overlay').addClass('on');
      $(el).addClass('revealled');
    }

  });

});
