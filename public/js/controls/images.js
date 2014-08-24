define(['jquery', 'can', 'controls/app', 'imagesLoaded'], function($, can, App, imagesLoaded) {
  // Controller for the Full Screen Background Images/Videos.
  // Catchall controller for functions do not need their own conroller, yet.
  App.Controls.Images = can.Control.extend({

    defaults: {
      selector: '#theme-image img'
    }

  }, {

    init : function(el) {
      var self = this;
      var imgs = $(this.options.selector);
      imagesLoaded(imgs, function() {
//        self.sizeBigImages(imgs);
      });
    },

    '{window} resize' :function() {
      this.init();
    },

    // Determine the best way to size an image while maintaining aspect ratios across any screen size.
    sizeBigImages : function(images) {
      var self = this;
      images = (typeof(images) == "Array") ? [images] : images; 
      $.each(images, function(i, image) {
        var sizes = {};
        sizes.ih = image.naturalHeight;
        sizes.iw = image.naturalWidth;
        var iRatio = sizes.iw/sizes.ih;  // >1 is landscape; <=1 is portrait
        var parent = $(image).parent();
        sizes.ww = parent.width();
        sizes.wh = parent.height();
        var winRatio = sizes.ww/sizes.wh;
        if ((sizes.ww-sizes.iw) < (sizes.wh-sizes.ih)) sizes = self.scaleUp('height', sizes);
        if ((sizes.ww-sizes.iw) >= (sizes.wh-sizes.ih)) sizes = self.scaleUp('width', sizes);
        var niRatio = sizes.niw/sizes.nih;  // >1 is landscape; <=1 is portrait
        $(image).css({ height: sizes.nih, width: sizes.niw, marginLeft: -(sizes.niw/2)});
      });
    }, 

    // Helper function to above. Takes an object containing image and window heights and 
    // adds new image height and width (nih/niw) to it based on the type of sizing needed to cover the screen
    // Portrait and landscape screens require opposing scalingUp.  
    scaleUp :function(type, sizes) {
      if (type == 'height') {
        ratio = (sizes.wh/sizes.ih)
        sizes.nih = sizes.wh
        sizes.niw = sizes.iw * ratio;
      }
      else {
        ratio = (sizes.ww/sizes.iw)
        sizes.niw = sizes.ww
        sizes.nih = sizes.ih * ratio;
      }
      return sizes
    }

  });

});
