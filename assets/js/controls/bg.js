App.BGControl = can.Control({

	init : function(el) {
		var self = this;
		if (el.attr('data-video') == 'on') self.setupVideo();
		else $('#theme-video').hide();
		setTimeout(function() {
			self.sizeBigImages($('#theme-image').find('img'));
		},1);
	},

  '.main-stage .click' :function(el, ev) {
    if (this.bigPlayer && $(e.target).hasClass('stage-width')) 
      (this.bigPlayer.paused()) ? this.bigPlayer.play() : this.bigPlayer.pause();
  },

  '.volume .click' :function(el, ev) {
    (this.bigPlayer.volume() == 0) ? this.bigPlayer.volume(1) : this.bigPlayer.volume(0)
  },

  sizeBigImages : function(images) {
    images = (typeof(images) == "Array") ? [images] : images; 
    $.each(images, function(i, image) {
    	var sizes = {};
    	sizes.ih = image[0].naturalHeight;
    	sizes.iw = image[0].naturalWidth;
    	var iRatio = sizes.iw/sizes.ih;  // >1 is landscape; <=1 is portrait
  	  sizes.ww = $(window).width();
  	  sizes.wh = $(window).height();
  	  var winRatio = sizes.ww/sizes.wh;
    	if ((sizes.ww-sizes.iw) < (sizes.wh-sizes.ih)) sizes = this.scaleUp('height', sizes);
    	if ((sizes.ww-sizes.iw) >= (sizes.wh-sizes.ih)) sizes = this.scaleUp('width', sizes);
    	var niRatio = sizes.niw/sizes.nih;  // >1 is landscape; <=1 is portrait
    	image.css({ height: sizes.nih, width: sizes.niw});
    });
  }, 

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
  },

  setupVideo :function() {
  	var self = this;
	  videojs('#bigScreen', {
	    autoplay: true,
	    controls: false,
	    loop: true
	  }, function() {
	    self.doResize();
	  }).volume(0).ready(function(){
	    self.bigPlayer = this;
	  });
  },

	doResize : function() {
	  var w = $(window).width();
	  var h = $(window).height();
		this.sizeBigImage();
	  $('#bigScreen').css({height: h, width: w});
	},

	'{window} resize' : function() {
		this.doResize($('#theme-image').find('img'));
	}

});

var bg = new App.BGControl('.site');
