App.Controls.Contact = can.Control.extend({

  init :function() {
    this.obfuscate("4dC@Y5A3sdQ3U7l33.YDs", "RFK4LEmxqwZa3XoUJ0hMY2zrvfNsnTCudPGDpOi1bS8Ilk7HQAWB9eyVtj65gc", ".email", 'mailto');
    this.obfuscate("PTD-gvD-DKAz", "M985DrTKnmuNZPvABw0ekWIx4UjCdhEFGYbfc6QsLyialVJ2pzRqtH7S13OgoX", ".phone", 'tel');
  },

  '.contactForm form submit' :function(el, ev) {
    ev.preventDefault();
    var params = el.formParams();
    params.payment = $('body').data('ccInfo');
    contact = new App.Models.Contact(params);
    contact.save(function(res) {
      console.log(res);
    }, 
    function(res) {
      console.log(res);
    })
  },

  '{document} showPaymentInfo' : function() {
    this.showPaymentInfo();
  },

  '.payment click' :function(el, ev) {
    this.showPaymentForm();
  },

  '.cancel click' :function(el, ev) {
    this.showContactForm();
  },

  showPaymentInfo :function() {
    $('.payment').hide();
    $('.amountNum').text($('body').data('ccInfo').amount);
    $('.last4Num').text($('body').data('ccInfo').last4);
    $('.paymentMade').show();
    this.showContactForm();
  },

  showPaymentForm :function() {
    $('.paymentForm').show();
    $('.contactForm').hide();
  },

  showContactForm :function() {
    $('.paymentForm').hide();
    $('.contactForm').show();
  },

  // Email obfuscator script 2.1 by Tim Williams, University of Arizona
  // Random encryption key feature by Andrew Moulden, Site Engineering Ltd
  // This code is freeware provided these four comment lines remain intact
  // A wizard to generate this code is at http://www.jottings.com/obfuscator/

  obfuscate :function(coded, key, selector, linkType) {
    var shift=coded.length;
    var link="";
    for (i=0; i<coded.length; i++) {
      if (key.indexOf(coded.charAt(i))==-1) {
        ltr = coded.charAt(i)
        link += (ltr)
      }
      else {     
        ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
        link += (key.charAt(ltr))
      }
    }
    $(selector).html("<a href='"+linkType+":"+link+"'>"+link+"</a>")
  }

});
contact = new App.Controls.Contact('body')
