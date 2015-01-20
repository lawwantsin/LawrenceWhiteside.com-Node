define(['jquery', 'can', 'canjs/controls/app', 'imagesLoaded', 'isotope'], function($, can, App, imagesLoaded, Isotope, Draggable) {
  // Controller for the Full Screen Background Images/Videos.
  // Catchall controller for functions do not need their own conroller, yet.
  App.Controls.Grid = can.Control.extend({

    defaults: {
    }

  }, {

    init : function(el) {
      if (!$('body').hasClass('supl')) this.initIsotope();
      this.doorState == 'middle';
    },

    initIsotope :function() {
      var self = this;
      var container = $(this.options.wrapper+" .iContent");
      this.iso = new Isotope(container[0], {
        // options
        itemSelector: '.frame',
        layoutMode: 'masonry'
      });
      imagesLoaded(container, function() {
        self.iso.layout();
      });
    }

  });

});
