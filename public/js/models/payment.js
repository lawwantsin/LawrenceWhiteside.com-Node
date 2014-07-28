define(['can', 'controls/app'], function(can, App) {
  
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
