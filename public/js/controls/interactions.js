define(['jquery', 'can', 'controls/app', 'greensock'], function($, can, App, TimelineMax) {
  App.Controls.Interactions = can.Control({

    init :function() {
      var self = this;
      // $(window).on('load', function() {self.fadeIn()});
    },

    // play :function() {
    //   var args = Array.prototype.slice.call(arguments);
    //   var animation = arguments;
    //   console.log("Playing: ", animation.join(" | "));
    //   var f = this[arguments[0]];
    //   var args = args[1] ? args.slice(1) : null;
    //   console.log(arguments);
    //   if (typeof(f) == 'function') f(args)
    //   return this
    // },

    doorFilm : function() {
      var wh = $(window).height();
      var hh = $('.header').height();
      return new TimelineMax()
        .to('.header', 1, {top: (wh-hh), marginTop: 0, ease: Bounce.easeOut}, 'header')
        .to('.front', 0.5, {top: 0, bottom: hh, opacity: 1, display: 'block'}, 'open')
        .to('.web-header-iso', 1, {opacity: 0, display: 'none'}, 'open')
        .to('.header', 1, {top: 'auto', bottom: 0}, 'open')
        .to('.door', 0, {display: 'none'}, 'open')
        .to('.mobile-menu', 0.5, {opacity: 1}, 'open')
        .to('.contact', 1, {opacity: 1}, 'open')
        .to('.contact i', 0.2, {rotation: '0deg'}, 'open')
        .to('.film-header-iso', 0.4, {display: 'block', opacity: 1, onComplete :function() {
          filmHeaderScroller.iScroll.refresh();
        }})
      return tl
    },
    doorMiddle : function() {
      var tl = new TimelineMax()
        .to('.style', 1, {opacity: 0}, 'style')
        .to('.header-iso', 0, {opacity: 0, display: 'none'})
        .to('.door', 0, {display: 'block'}, 'close')
        .to('.contact', 1, {opacity: 0}, 'close')
        .to('.contact i', 0.2, {rotation: '45deg'}, 'close')
        .to('.mobile-menu', 0.5, {opacity: 0}, 'close')
        .to('.topDoor', 0.5, {bottom: "50%"}, 'close')      
        .to('.bottomDoor', 0.5, {top: "0%"}, 'close')
        .to('.header', 0.5, {top: "50%", marginTop: -25}, 'close')
        .to('.front', 0.5, {top: 0, bottom: 0, opacity: 1}, 'close')
      return tl
    },
    doorWeb : function() {
      var hh = $('.header').height();
      var tl = new TimelineMax()
        .to('.topDoor', 0.5, {bottom: 0}, 'open')      
        .to('.bottomDoor', 0.5, {top: 0}, 'open')
        .to('.header', 1, {top: 0, marginTop: 0, ease: Bounce.easeOut}, 'open')
        .to('.front', 0.5, {top: hh, bottom: 0, display: 'block', opacity: 1}, 'open')
        .to('.film-header-iso', 1, {opacity: 0, display: 'block'})
        .to('.mobile-menu', 0.5, {opacity: 1}, 'open')
        .to('.contact', 1, {opacity: 1}, 'open')
        .to('.contact i', 0.2, {rotation: '0deg'}, 'open')
        .to('.door', 0, {display: 'none'}, 'open')
        .to('.web-header-iso', 1, {display: 'block', opacity: 1, onComplete :function() {
          webHeaderScroller.iScroll.refresh();
        }})
      return tl
    },
    doorSupl : function() {
      var hh = $('.header').height();
      var tl = new TimelineMax()
        .to('.topDoor', 0.5, {bottom: 0}, 'open')      
        .to('.bottomDoor', 0.5, {top: 0}, 'open')
        .to('.header', 1, {top: 0, marginTop: 0, ease: Bounce.easeOut}, 'open')
        .to('.front', 0.5, {top: hh, bottom: 0, display: 'block', opacity: 1}, 'open')
        .to('.mobile-menu', 0.5, {opacity: 1}, 'open')
        .to('.contact', 1, {opacity: 1}, 'open')
        .to('.contact i', 0.2, {rotation: '0deg'}, 'open')
        .to('.door', 0, {display: 'none'}, 'open')
      return tl
    },
    frontDoorsFadeIn :function() {
      var tl = new TimelineMax()
        .staggerTo('.web-header-scroll .frame', 1, {opacity: 1}, 0.4, 'fades')
        .staggerTo('.film-header-scroll .frame', 1, {opacity: 1}, 0.4, 'fades');
      return tl
    },
    setLabel :function(half) {
      if (half == 'film') {
        var tl = new TimelineMax()
          .to('.film-label', 1, {top: 124, ease: Elastic.easeOut}, 'labels')
          .to('.web-label', 1, {top: 15, ease: Elastic.easeOut}, 'labels')                  
      }
      else if (half == 'web') {
        var tl = new TimelineMax()
          .to('.film-label', 1, {top: 15, ease: Elastic.easeOut}, 'labels')
          .to('.web-label', 1, {top: 124, ease: Elastic.easeOut}, 'labels')
      }
      else {
        var tl = new TimelineMax()
          .to('.film-label, .web-label', 1, {opacity: 0})        
      }
      return tl
    },
    contactCloseThank : function() { 
      var tl = new TimelineMax()
        .to('.thankYou', 0, {display: 'block'})
        .to('.contactForm', 0, {display: 'none'})
      return tl
    },
    contactCloseReset : function() { 
      var tl = new TimelineMax()
        .to('.thankYou', 0, {display: 'none'})
        .to('.contactForm', 0, {display: 'block'})
      return tl
    },
    revealSection : function(half, section) {
      console.log('revealSection:', half, section)
      var tl = new TimelineMax()
        .to('.front', 1, {opacity: 0}, 'one')
        .to('.main', 0, {display: 'block'}, 'one')
        .to('.front', 0, {display: 'none'})
        .to('.style.'+half, 0, {opacity: 1}, 'reveal')
        .to('.half.'+half, 0, {zIndex: 1, opacity: 1, display: 'block', height: '100%'}, 'reveal')
        .to('.section'+section, 0, {display: 'block', zIndex: 2}, 'reveal')
        .to('.section'+section, 1, {opacity: 1}, 'reveal')
        .to('.section.'+section, 1, {opacity: 1}, 'reveal')
        .to('.section.'+section, 0, {display: 'block'}, 'reveal')
        .to('.'+half+' .callToAction', 0, {display: 'block', opacity: 1, onComplete: function() {
          var ws = window[half+'Scroller'];
          if (ws) {
            ws.iScroll.refresh();
            ws.iScroll.scrollTo(0,0);
          }
        }}, 'reveal')
        .to('.'+section+' .rotation', 1.9, {rotationY: -180, ease: Elastic.easeOut})
      return tl
    },
    resetSections : function() {
      var tl = new TimelineMax()
        // .to('.front', 0, {display: 'block'}, 'style')
        .to('.style', 1, {opacity: 0}, 'style')
        .to('.section', 0, {zIndex: 1, opacity: 0, display: 'none'}, 'style')
      return tl
    },
    scrollButtonShow : function() {
      if ($('.next-icon i').hasClass('ion-chevron-up')) {            
        tl = new TimelineMax()
          .to('.next-icon', 1, {bottom: 10, ease: Elastic.easeOut}, 'one')
          .to('i.ion-chevron-up', 0, {opacity: 1}, 'one')
      }
      else {            
        tl = new TimelineMax()
          .to('.next-icon', 1, {bottom: 10, ease: Elastic.easeOut, delay: 2}, 'one')
          .to('i.ion-chevron-down', 0, {opacity: 0}, 'one')
          .to('label.scrollIndicator', 0.7, {opacity: 1}, 'one')
          .to('label.scrollIndicator', 0.7, {opacity: 0}, 'two')
          .to('i.ion-chevron-down', 1, {opacity: 1}, 'two')
      }
      return tl
    },
    scrollButtonHide : function() {
      var tl = new TimelineMax().to('.next-icon', 0.7, {bottom: -100})
      return tl
    }

  });
});
