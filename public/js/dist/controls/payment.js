define(['jquery', 'can', '../controls/app'], function($, can, App) {
  // Controller for the Pay me Form.  Handles the Stripe response. 
  App.Controls.Payment = can.Control.extend({

    init :function() {
    },

    // Submits the form using the Payment model.
    '.paymentForm form submit' :function(el, ev) {
      ev.preventDefault();
      var params = el.formParams();
      this.formSubmit(params, el);
    },

    formSubmit :function(params, el) {
      if (!this.validate(params)) return;
      App.Models.Payment.stripe(el, this.response);
    },

    validate :function(params) {
      var payment = new App.Maps.Payment(params);
      var errors = payment.errors();
      if (errors) {
        $('.error').removeClass('error').removeClass('wobble');
        for(x in errors) {
          this.displayError(x, errors[x]);
        }
        return false;
      }
      else return true;
    },

    saveSuccess : function(res) {
      presenter.play('contact', 'close', 'thank');
    },

    'input, textarea keydown' :function(el, ev) {
      if(el.val() != '') el.removeClass('error').removeClass('wobble');
    },

    displayError :function(element, message) {
      $('.paymentForm').find('[name='+element+']').addClass('error').addClass('wobble');
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
});
