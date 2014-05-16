App.iPhoneControl = can.Control({

  init : function() {
    var self = this;
    this.state = 'closed'
  },

  'click' :function() {
    this.clicked();
  },

  clicked :function() {
    if (this.state == 'closed') this.open();
    else this.close();
  },

  open :function() {
    presenter.web.page.iphone.open();
    this.state = 'open';
  },

  close :function() {
    presenter.web.page.iphone.close();
    this.state = 'close';
  }

});
var iphone = new App.iPhoneControl('.iphone');
