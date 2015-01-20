define(['jquery', 'can', 'canjs/controls/app', 'imagesLoaded'], function($, can, App, imagesLoaded) {
  // Controller for the Full Screen Background Images/Videos.
  // Catchall controller for functions do not need their own conroller, yet.
  App.Controls.Slideshow = can.Control.extend({

    defaults: {
      selector: ''
    }

  }, {

    init : function(el) {
      var self = this;
      var images = el.find('img');
      this.rotate(images);
    },

    rotate : function(images) {
      var tl = new TimelineMax().staggerTo(images, 2, {opacity: 1, zIndex: 2});
    }

  });

});
