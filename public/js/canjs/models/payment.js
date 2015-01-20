define(['can', 'canjs/controls/app'], function(can, App) {

  App.Maps.Payment  = can.Map.extend({

    init :function() {
      this.validatePresenceOf('amount', {message: 'Please include an amount in dollars and cents'});
      this.validateFormatOf('number', /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/ , {message: 'Card Number is required'});
      this.validateFormatOf('exp-month', /\d{2}/, {message: 'Expiration Month is required'});
      this.validateFormatOf('exp-year', /\d{4}/, {message: 'Expiration Year is required'});
      this.validateFormatOf('csv', /\d{3,4}/, {message: 'CVC is required'});
    },

    // define: {
    //   amount: {
    //     set: function (newVal) {
    //       console.log(newVal);
    //       this.amount(newVal.gsub('.', '').gsub('$', ''))
    //       return this.amount;
    //     }
    //   },
    //   number: {
    //     set: function (newVal) {
    //       console.log(newVal);
    //       return newVal.gsub('.', '').gsub('-', ' ')
    //     }
    //   }
    // }

  }, {});
  
  App.Models.Payment = can.Model.extend({

    create : 'POST /payment',
    pubKey : {
      test: "pk_kjqcHs7Gsyjj0ub0KOHJgcr18dER3",
      live: "pk_aFoVUVRnmz3gZtYQBywTp59KmJAIC"
    },

    stripe : function(form, response) { var self = this;
      var ENV = 'test';
      var params = form.formParams();
      this.contactForm = form.parent().siblings('.contactForm').find('form');
      Stripe.setPublishableKey(this.pubKey[ENV]);
      Stripe.card.createToken(params, function(s,r) {response(params.amount, s,r)});
    }

  }, {});
});
