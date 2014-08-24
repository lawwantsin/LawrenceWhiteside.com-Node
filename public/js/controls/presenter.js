define(['jquery', 'can', 'controls/app', 'greensock'], function($, can, App, TimelineMax) {
  App.Controls.Presenter = can.Control({

    init :function() {
      this.page = 0;
      this.section = null;
      this.half = this.element.attr('class');
      this.okToProceed = true;
      var self = this;
      $(window).on('load', function() {self.fadeIn()});
    },

    fadeIn : function(){
      presenter.play('front', 'doors', 'fadeIn');
    }, 

    flyin :function() {
      
    },

    getPage :function() {
      return this.page
    },

    getSection : function() {
      return this.section;
    },

    getHalf : function() {
      return this.half;
    },

    setPage :function(page) {
      return this.page = page
    },

    setSection :function(section) {
      this.resetPage();
      return this.section = section;
    },

    setHalf :function(half) {
      this.resetSection();
      return this.half = half;
    },

    resetPage :function() {
      return this.setPage(0);
    },

    resetSection :function(section) {
      return this.setSection(null);
    },

    resetSite :function(section) {
      return this.setHalf('front');
    },

    setLabel :function(half) {
      if (half == 'film') {
        var tl = new TimelineMax()
          .to('.film-label', 1, {top: 124, ease: Elastic.easeOut}, 'labels')
          .to('.web-label', 1, {top: 15, ease: Elastic.easeOut}, 'labels')                  
      }
      else {
        var tl = new TimelineMax()
          .to('.film-label', 1, {top: 15, ease: Elastic.easeOut}, 'labels')
          .to('.web-label', 1, {top: 124, ease: Elastic.easeOut}, 'labels')
      }
    },

    revealSection : function(half, section, page) {
      this.setHalf(half);
      this.setSection(section);
      this.setPage(page);
      var tl = new TimelineMax()
        .to('.main', 0, {display: 'block'}, 'style')
        .to('.front', 0, {display: 'none'}, 'style')
        .to('.style', 1, {opacity: 0}, 'style')
        .to('.style.'+half, 1, {opacity: 1}, 'style')
        .to('.section', 0, {zIndex: 1, opacity: 0, display: 'none'}, 'style')

        .to('.half', 0, {zIndex: 2, height: 0})        
        .to('.half.'+half, 0, {zIndex: 1, opacity: 1, display: 'block', height: '100%'}, 'reveal')
        .to('.section.'+section, 0, {display: 'block', zIndex: 2}, 'reveal')
        .to('.'+section, 1, {opacity: 1}, 'reveal')
        .to('.section.'+section, 0, {display: 'block'}, 'reveal')
        .to('.section.'+section, 1, {opacity: 1}, 'reveal')
        .to('.'+half+' .callToAction', 0, {display: 'block', opacity: 1, onComplete: function() {
          if (window[half+'Scroller']) window[half+'Scroller'].iScroll.refresh();
          if (window[half+'NavScroller']) window[half+'NavScroller'].iScroll.refresh();          
        }}, 'reveal')
        .to('.'+section+' .rotation', 1.9, {rotationY: -180, ease: Elastic.easeOut})
      return this
    },

    play :function(half, section, page, addCue) {
      // console.log("Playing: "+half+'|'+section+'|'+page);
      var f = this[half][section][page];
      if (typeof(f) == 'function') {
        this.setHalf(half);
        this.setSection(section);
        if (addCue) {
          f().add(addCue)
        }
        else { f() }
        this.okToProceed = true;
        return this
      }
    },

    front : {
      doors : {
        film : function() {
          var wh = $(window).height();
          var hh = $('.header').height();
          var tl = new TimelineMax()
            .to('.topDoor', 0.5, {bottom: 0}, 'open')      
            .to('.bottomDoor', 0.5, {top: 0}, 'open')
            .to('.header', 0.5, {top: (wh-hh), marginTop: 0}, 'open')
            .to('.front', 0.5, {top: 0, bottom: hh}, 'open')
            .to('.web-header-iso', 1, {height: 0})
            .to('.header', 0, {top: 'auto', bottom: 0})
            .to('.door', 0, {display: 'none'})
            .to('.mobile-menu', 0.5, {opacity: 1}, 'windup')
            .to('.contact', 1, {opacity: 1}, 'contact')
            .to('.contact i', 0.2, {rotation: '0deg'}, 'contact')
            .to('.film-header-iso', 1, {height: '100%'}, 'finish')
          return tl
        },
        middle : function() {
          var tl = new TimelineMax()
            .to('.door', 0, {display: 'block'})
            .to('.contact', 1, {opacity: 0}, 'contact')
            .to('.contact i', 0.2, {rotation: '45deg'}, 'contact')
            .to('.mobile-menu', 0.5, {opacity: 0}, 'windup')
            .to('.topDoor', 0.5, {bottom: "50%"}, 'close')      
            .to('.bottomDoor', 0.5, {top: "0%"}, 'close')
            .to('.header', 0.5, {top: "50%", marginTop: -25}, 'close')
            .to('.front', 0.5, {top: 0, bottom: 0}, 'close')
            .to('.header-iso', 1, {height: 0})
          return tl
        },
        web : function() {
          var hh = $('.header').height();
          var tl = new TimelineMax()
            .to('.topDoor', 0.5, {bottom: 0}, 'open')      
            .to('.bottomDoor', 0.5, {top: 0}, 'open')
            .to('.header', 0.5, {top: 0, marginTop: 0}, 'open')
            .to('.front', 0.5, {top: hh, bottom: 0}, 'open')
            .to('.film-header-iso', 1, {height: 0})
            .to('.door', 0, {display: 'none'})
            .to('.mobile-menu', 0.5, {opacity: 1}, 'windup')
            .to('.contact', 1, {opacity: 1}, 'contact')
            .to('.contact i', 0.2, {rotation: '0deg'}, 'contact')
            .to('.web-header-iso', 1, {height: '100%'}, 'finish')
          return tl
        },
        fadeIn :function() {
          var tl = new TimelineMax()
            .staggerTo('.web-header-scroll .frame', 1, {opacity: 1}, 0.4, 'fades')
            .staggerTo('.film-header-scroll .frame', 1, {opacity: 1}, 0.4, 'fades');
        }
      }
    },


    contact : {
      close : {
        thank : function() { 
           var tl = new TimelineMax()
             .to('.thankYou', 0, {display: 'block'})
             .to('.contactForm', 0, {display: 'none'})
        },
        reset : function() { 
           var tl = new TimelineMax()
             .to('.thankYou', 0, {display: 'none'})
             .to('.contactForm', 0, {display: 'block'})
        },        
      }
    },
    
    shared : {
      scrollButton : {
        show : function() {
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
        },
        hide : function() {
          tl = new TimelineMax().to('.next-icon', 0.7, {bottom: -100})
        }
      }
    }

  });
});
