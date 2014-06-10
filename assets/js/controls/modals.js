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
modals = new App.Controls.Modals(document)
