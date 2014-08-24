define(['jquery', 'can', 'controls/app', 'imagesLoaded', 'isotope', 'draggable'], function($, can, App, imagesLoaded, Isotope, Draggable) {
  // Controller for the Full Screen Background Images/Videos.
  // Catchall controller for functions do not need their own conroller, yet.
  App.Controls.Grid = can.Control.extend({

    defaults: {
    }

  }, {

    init : function(el) {
      if (!$('body').hasClass('supl')) this.initIsotope();
      this.doorState == 'middle';
      // this.initDraggable();
    },

    // initDraggable:function() {
    //   var wh = $(window).height();
    //   var t = (wh/2)-25;
    //   $('.header').css({top: t});
    //   Draggable.create('.header', {type: 'y', container: '.front', onDrag: function() {
    //     var top = t+this.y;
    //     var bottom = wh-top
    //     $('.topDoor').css({bottom: bottom});
    //     $('.bottomDoor').css({top: top});
    //   }, snap: {
    //     y: [0, wh/2, wh]
    //   }});
    // },

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
