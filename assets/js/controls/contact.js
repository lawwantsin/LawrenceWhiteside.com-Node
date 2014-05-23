var Contact = can.Control({

  'form submit' :function(el, ev) {
    ev.preventDefault();
  },

  '.payment click' :function(el, ev) {
    $('.paymentForm').show();
    $('.contactForm').hide();
  },

  '.cancel click' :function(el, ev) {
    $('.paymentForm').hide();
    $('.contactForm').show();
  }

});
contaxt = new Contact('#contactModal')
