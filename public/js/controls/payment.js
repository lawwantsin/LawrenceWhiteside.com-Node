define(['can', '../controls/app'], function(can, App) {
  // Controller for the Pay me Form.  Handles the Stripe response. 
  App.Controls.Payment = can.Control.extend({

    init :function() {
    },

    // Submits the form using the Payment model.
    '.paymentForm form submit' :function(el, ev) {
      ev.preventDefault();
      App.Models.Payment.stripe(el, this.response);
    },

    // Callback: Handles the response from the Payment model.
    response :function(amount, status, response) {
      var params = {
        amount : amount,
        currency: 'usd',
        card: response.id,
        last4: response.card.last4,
        type: response.card.type
      }
      $('body').data('ccInfo', params);
      $('body').trigger('showPaymentInfo');
    },

    // Clears the payment on click
    '.removePayment click' :function(el, ev) {
      ev.preventDefault();
      $('body').data('ccInfo', null);
      $('body').trigger('hidePaymentInfo');
    }


  });
  payment = new App.Controls.Payment('body')
});
