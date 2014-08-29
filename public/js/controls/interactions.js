define(['jquery', 'can', 'controls/app', 'greensock'], function($, can, App, TimelineMax) {
  App.Controls.Interactions = can.Control({

    init :function() {
      this.currentState = 'start';
    },
    /*
  
    VALID STATES
    
    start
    webFolio
    filmFolio
    webProject
    filmProject

    */

    seek :function(newState, project) {
      var animation = this.currentState + "2" + newState;
      console.log("Playing: "+animation+ " : " + project)
      if (typeof this[animation] == 'function') {
        this.currentAnimation = this[animation](project)
          .add(this.setState(newState));
      }
    },

    setState :function(newState) { var self = this;
      return new TimelineMax().to('body', 0, {
        onComplete: function() { 
          self.currentState = newState;
        }
      });
    },

    // StateChangers
    start2webProject : function(project) {
      return this.leftHex()
        .add(this.hideFront())
        .add(this.setLabel('web'))
        .add(this.openProject('web', project))
        .add(this.showScrollButton());
    },

    start2suplProject :function(project) {
      return this.leftHex()
        .add(this.hideFront())      
        .add(this.openProject('supl', project))
        .add(this.showScrollButton());
    },

    start2filmProject : function(project) {
      return this.leftHex()
        .add(this.hideFront())
        .add(this.setLabel('film'))
        .add(this.openProject('film', project))
        .add(this.showScrollButton());
    },

    start2filmFolio : function(){
      return this.leftHex()
        .add(this.showFront())
        .add(this.setLabel('film'))
        .add(this.openFolio('film'))
        .add(this.folioPrestige('film'))
        .add(this.showScrollButton());        
    },

    start2webFolio : function(){
      return this.leftHex()
        .add(this.setLabel('web'))
        .add(this.openFolio('web'))
        .add(this.folioPrestige('web'));
    },

    webProject2start : function() {
      return this.resetProjects()
        .add(this.setLabel('web'))
        .add(this.resetFolios())
        .add(this.resetCover());
    },

    filmProject2start : function() {
      return this.webProject2start();
    },

    filmFolio2start : function(){
      return this.webProject2start();
    },

    webFolio2start : function(){
      return this.webProject2start();
    },

    webFolio2filmFolio : function(){
      return this.webFolio2start()
        .add(this.setLabel('film'))
        .add(this.start2filmFolio())
        .add(this.showScrollButton());
    },    

    filmFolio2webFolio : function(){
      return this.filmFolio2start()
        .add(this.showFront())
        .add(this.setLabel('web'))
        .add(this.start2webFolio())
        .add(this.showScrollButton());
    },    

    webProject2webFolio : function() {
      return this.resetProjects()
        .add(this.showFront())
        .add(this.openFolio('web'))
        .add(this.showScrollButton());
    },

    webProject2filmFolio : function() {
      return this.resetProjects()
        .add(this.leftHex())
        .add(this.setLabel('film'))
        .add(this.openFolio('film'))
        .add(this.showScrollButton());
    },

    filmProject2webFolio : function() {
      return this.resetProjects()
        .add(this.raiseCover())
        .add(this.setLabel('web'))
        .add(this.openFolio('web'))
        .add(this.showScrollButton());      
    },

    filmProject2filmFolio : function() {
      return this.resetProjects()
        .add(this.showFront())
        .add(this.openFolio('film'))
        .add(this.showScrollButton());
    },

    filmFolio2filmProject : function(project) {
      return this.closeFolio('web')
        .add(this.hideFront())
        .add(this.openProject('film', project))
        .add(this.showScrollButton());
    },

    webFolio2webProject : function(project) {
      return this.closeFolio('web')
        .add(this.hideFront())
        .add(this.openProject('web', project))
        .add(this.showScrollButton());
    },

    // Actions
    lowerCover : function() {
      var wh = $(window).height();
      var hh = $('.header').height();
      return new TimelineMax()
        .to('.header', 1, {top: (wh-hh), marginTop: 0}, 'header')
        .to('.front', 0.5, {top: 0, bottom: hh, opacity: 1, display: 'block'}, 'open')
        .to('.header', 1, {top: 'auto', bottom: 0}, 'open')
        .to('.door', 0, {display: 'none'}, 'open')
        .to('.mobile-menu', 0.5, {opacity: 1}, 'open')
        .to('.contact', 1, {opacity: 1}, 'open')
        .to('.contact i', 0.2, {rotation: '0deg'}, 'open')
        .to('.door', 0, {display: 'none'})
    },
    resetCover : function() {
      return new TimelineMax()
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
    },
    raiseCover : function() {
      var hh = $('.header').height();
      return new TimelineMax()
        .to('.header', 1, {top: 0, marginTop: 0}, 'open')
        .to('.front', 0.5, {top: hh, bottom: 0, display: 'block', opacity: 1}, 'open')
        .to('.mobile-menu', 0.5, {opacity: 1}, 'open')
        .to('.contact', 1, {opacity: 1}, 'open')
        .to('.contact i', 0.2, {rotation: '0deg'}, 'open')
        .to('.door', 0, {display: 'none'})
    },

    leftHex : function() {
      var hh = $('.header').height();
      return new TimelineMax()
        .to('.header', 0.6, {top: 0, marginTop: 0}, 'open')
        .to('.hexagon', 0.8, {left: 0, marginLeft: -0, top: -28}, 'open')
        .to('.front', 0.5, {top: hh, bottom: 0, display: 'block', opacity: 1}, 'open')
        .to('.mobile-menu', 0.5, {opacity: 1}, 'open')
        .to('.contact', 1, {opacity: 1}, 'open')
        .to('.contact i', 0.2, {rotation: '0deg'}, 'open')
        .to('.door', 0, {display: 'none'})
    },

    hideFront :function() {
      return new TimelineMax()
        .to('.front', 1, {opacity: 0})
        .to('.front', 0, {display: 'none'})
    },

    showFront :function() {
      return new TimelineMax()
        .to('.front', 1, {opacity: 1})
        .to('.front', 0, {display: 'block'})
    },

    showMain :function(folio) {
      return new TimelineMax()
        .to('.main', 0, {display: 'block'})
        .to('.style.'+folio, 0.5, {opacity: 1}, 'open')
        .to('.half.'+folio, 0, {zIndex: 1, opacity: 1, display: 'block', height: '100%'}, 'open')
        .to('.half.'+folio+' .iContent', 0, {height: h}, 'open')
    },

    hideMain :function(folio) {
      return new TimelineMax()
        .to('.half.'+folio, 0, {zIndex: 1, opacity: 0, display: 'none', height: '100%'}, 'open')
        .to('.half.'+folio+' .iContent', 0, {height: h}, 'open')      
        .to('.style.'+folio, 0.5, {opacity: 0 }, 'open')
        .to('.main', 0, {display: 'none'})
    },

    // Folio Actions
    openFolio :function(folio) {
      var h = 1000;
      return new TimelineMax()
        .to('.'+folio+'-header-iso', 0.4, {display: 'block', opacity: 1, onComplete :function() {
          window[folio+'HeaderGrid'].iso.resize();
          setTimeout(function() { window[folio+'HeaderScroller'].iScroll.refresh() },0);
        }
      });
    },
    folioPrestige :function(folio) {
      return new TimelineMax()
        .staggerTo('.'+folio+'-header-iso .frame', 1, {opacity: 1}, 0.4)
    },
    closeFolio :function(folio) {
      return new TimelineMax()
        .to('.'+folio+'-header-iso', 0.4, {opacity: 0}, 'close')
        .to('.'+folio+'-header-iso', 0, {display: 'none'}, 'close')
        .to('.style', 1, {opacity: 0}, 'close')
    },

    resetFolios :function() {
      return new TimelineMax()
        .to('.front', 1, {opacity: 0})
        .to('.front', 0, {display: 'none'})
        .to('.header-iso', 0, {opacity: 0, display: 'none'}, 'reset')
        .to('.style', 0, {opacity: 0}, 'reset')      
    },

    openProject : function(folio, project) {
      return new TimelineMax()
        .to('.main', 0, {display: 'block'})
        .to('.style.'+folio, 1, {opacity: 1}, 'open')
        .to('.half.'+folio, 0, {zIndex: 1, opacity: 1, display: 'block', height: '100%'}, 'open')
        .to('.section.'+project, 0, {display: 'block', zIndex: 2}, 'reveal')
        .to('.section.'+project, 1, {opacity: 1}, 'reveal')
        .to('.'+folio+' .callToAction', 0, {display: 'block', opacity: 1, onComplete: function() {
          var ws = window[folio+'Scroller'];
          if (ws) {
            ws.iScroll.refresh();
            ws.iScroll.scrollTo(0,0);
          }
        }})
        .from('.'+project+' .rotation', 2, {top: -600, ease: Elastic.easeOut}, 'reveal')
        .to('.'+project+' .rotation', 2, {rotationY: -180, ease: Elastic.easeOut, delay: 1}, 'reveal')
    },

    resetProjects : function() {
      return new TimelineMax()
        .to('.section, .callToAction', 1, {zIndex: 1, opacity: 0, display: 'none'}, 'style')
        .to('.callToAction', 0, {display: 'none', opacity: 0})
    },

    // Front Hex Actions
    setLabel :function(folio) {
      if (folio == 'film') {
        return new TimelineMax()
          .to('.film-label', 1, {top: 124, ease: Elastic.easeOut}, 'open')
          .to('.web-label', 1, {top: 15, ease: Elastic.easeOut}, 'open')                  
      }
      else if (folio == 'web') {
        return new TimelineMax()
          .to('.film-label', 1, {top: 15, ease: Elastic.easeOut}, 'open')
          .to('.web-label', 1, {top: 124, ease: Elastic.easeOut}, 'open')
      }
      else if (folio == 'supl') {
        return new TimelineMax()
          .to('.film-label, .web-label', 1, {opacity: 0})        
      }
    },

    // Contact Form Actions
    closeContactThankYou : function() { 
      return new TimelineMax()
        .to('.thankYou', 0, {display: 'block'})
        .to('.contactForm', 0, {display: 'none'})
    },
    resetContactForm : function() { 
      return new TimelineMax()
        .to('.thankYou', 0, {display: 'none'})
        .to('.contactForm', 0, {display: 'block'})
    },

    // Scroll Actions
    showScrollButton : function() {
      if ($('.next-icon i').hasClass('ion-chevron-up')) {            
        return new TimelineMax()
          .to('.next-icon', 1, {bottom: 40, ease: Elastic.easeOut}, 'one')
          .to('i.ion-chevron-up', 0, {opacity: 1}, 'one')
      }
      else {            
        return new TimelineMax()
          .to('.next-icon', 1, {bottom: 30, ease: Elastic.easeOut}, 'one')
          .to('i.ion-chevron-down', 0, {opacity: 0}, 'one')
          .to('label.scrollIndicator', 0.7, {opacity: 1}, 'one')
          .to('label.scrollIndicator', 0.7, {opacity: 0}, 'two')
          .to('i.ion-chevron-down', 1, {opacity: 1}, 'two')
      }
    },
    hideScrollButton : function() {
      return new TimelineMax().to('.next-icon', 0.7, {bottom: -100})
    }

  });
});
