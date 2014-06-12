App.Controls.Payment = can.Control.extend({

  init :function() {
  },

  '.paymentForm form submit' :function(el, ev) {
    ev.preventDefault();
    App.Models.Payment.stripe(el, this.response);
  },

  response :function(amount, status, response) {
    var params = {
      amount : amount,
      currency: 'usd',
      card: response.id,
      last4: response.card.last4
    }
    $('body').data('ccInfo', params);
    $('body').trigger('showPaymentInfo');
  }


});
payment = new App.Controls.Payment('body')
