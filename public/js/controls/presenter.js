define(['jquery', 'can', 'controls/app', 'greensock'], function($, can, App, TimelineMax) {
  App.Controls.Presenter = can.Control({

    init :function() {
      this.page = 0;
      this.section = null;
      this.half = this.element.attr('class');
      this.okToProceed = true;
      this.front.flyin();
    },

    scrolled :function() {
      var self = this;
      if (self.okToProceed) self.swiped();
      setTimeout(function() {
        self.okToProceed = true;
      }, 1000);
    },

    swiped :function() {
      this.okToProceed = false
      this[this.section][this.page].place++;
      cue = 'rotateCardWScreen'
      this.playCue(this.section, this.page, cue);
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

    revealSection : function(half, section, page) {
      this.setHalf(half);
      this.setSection(section);
      this.setPage(page);
      $('.section').css({zIndex: 1, opacity: 0, display: 'none'});
      var tl = new TimelineMax()
        .to('.half.'+half, 0, {zIndex: 1, opacity: 1, display: 'block'})
        .to('.section.'+section, 0, {display: 'block', zIndex: 2})
        .to('.'+section, 0, {opacity: 1})
        .to('.half', 1, {zIndex: 2})
        .to('.knob', 0, {display: 'none'})
        .to('.'+section+' .rotation', 1.9, {rotationY: -180, ease: Elastic.easeOut})
        .to('.section.'+section, 0, {display: 'block'})
        .to('.section.'+section, 0.5, {opacity: 1});
      return this
    },

    play :function(half, section, page, addCue) {
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
        open : function() {
          var tl = new TimelineMax()
            .to('.topDoor', 0.5, {top: "-50%"}, 'open')      
            .to('.bottomDoor', 0.5, {top: "100%"}, 'open')
            .to('.door', 0, {display: 'none'})
            .to('.front', 0, {display: 'none'})
            .to('.header', 0.7, {top: 0, marginTop: 0}, 'across')
            .to('.full-name', 0.3, {left: 60, textAlign: 'left'}, 'across')
            .to('.mobile-menu', 0.5, {opacity: 1}, 'windup')
            .to('.contact', 1, {opacity: 1}, 'contact')
            .to('.contact i', 0.2, {rotation: '0deg'}, 'contact')
          return tl
        }
      },
      flyin : function() {
        // var tl = new TimelineMax().to('.web-slider .slide2', 0, {xPercent: 0}).to('.web-slider .slide2', 2, {xPercent: 100})        
        // var tr = new TimelineMax().to('.film-slider .slide2', 0, {xPercent: 100}).to('.film-slider .slide2', 2, {xPercent: 0})      
      }
    },


    contact : {
      close : {
        thank : function() { 
          tl = new TimelineMax()
            .to('#contactModal', 1, {opacity: 0})
          return tl
        }
      }
    },

    supl : {
      section : {
        open : function() { 
          var section = presenter.getSection();
          tl = new TimelineMax()
            .to('.'+section+' .imac', 1, {opacity: 1})
            .to('.'+section+' .iphone', 1, {opacity: 1})
            .to('.'+section+' .poster', 1, {opacity: 1})
          return tl
        }
      }
    },
    
    web : {
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
      },
      section : {
        open : function() { 
          var section = presenter.getSection();
          tl = new TimelineMax()
            .to('.'+section+' .imac', 1, {opacity: 1})
            .to('.'+section+' .iphone', 1, {opacity: 1})
            .to('.'+section+' .poster', 1, {opacity: 1})
          return tl
        }
      }
    }

  });
});
