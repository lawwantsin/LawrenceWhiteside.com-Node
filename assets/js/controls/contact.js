var Contact = can.Control({

  init :function() {
    this.obfuscate("4dC@Y5A3sdQ3U7l33.YDs", "RFK4LEmxqwZa3XoUJ0hMY2zrvfNsnTCudPGDpOi1bS8Ilk7HQAWB9eyVtj65gc", ".email", 'mailto');
    this.obfuscate("PTD-gvD-DKAz", "M985DrTKnmuNZPvABw0ekWIx4UjCdhEFGYbfc6QsLyialVJ2pzRqtH7S13OgoX", ".phone", 'tel');
  },

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
contact = new Contact('body')
