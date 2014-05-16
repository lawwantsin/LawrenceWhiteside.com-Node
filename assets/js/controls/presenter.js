App.Presenter = can.Control({

  init :function() {
    var iScrollOptions = {
      scrollX: false, scrollY: true, scrollbars: false, 
      useTransform: false, useTransition: true, probeType: 3,
      bounce: false, momentum: false
    }
    this.page = 'csf';
    this.section = 'front';
    this.cue = 'open';
    this.okToProceed = true;
    $(window).setBreakpoints({breakpoints: [1024]});
  },

  scrolled :function() {
    var self = this;
    if (self.okToProceed) self.swiped();
    setTimeout(function() {
      self.okToProceed = true;
    }, 1000);
  },

  '{window} extBreakpoint1024' :function(el, ev) {
    console.log('small');
    this.setSize('small');
  },

  '{window} enterBreakpoint1024' :function(el, ev) {
    console.log(ev);
    this.setSize('large');
  },

  '.next click' :function() {
    this.scrolled();
  },

  swiped :function() {
    this.okToProceed = false
    this[this.section][this.page].place++;
    cue = 'rotateCardWScreen'
    this.playCue(this.section, this.page, cue);
  },

  getCue :function() {
    return this.cue
  },

  getPage :function() {
    return this.page;
  },

  getSection :function() {
    return this.section;
  },

  setCue :function(cue) {
    return this.cue = cue
  },

  resetCue :function() {
    return this.cue = 'open';
  },

  setPage :function(page) {
    this.resetCue();
    return this.page = page;
  },

  resetPage :function(page) {
    this.resetCue();
    return this.setPage(page);
  },

  resetSection :function(section) {
    this.resetPage();
    this.resetCue();
    return this.setSection(section);
  },

  setSection :function(section) {
    return this.section = section;
  },

  revealPage : function(section, page) {
    this.setSection(section);
    this.setPage(page);
    $('.page').css({zIndex: 1, opacity: 0});
    var tl = new TimelineMax()
      .to('.page.'+section, 0, {display: 'block', zIndex: 2})
      .to('section.'+section, 1, {opacity: 1})
      .to('.page.'+page, 0, {display: 'block'})
      .to('.page.'+page, 0.5, {opacity: 1});
    tl.add(this[section].page.open())
    return tl
  },

  playCue :function(section, page, cue, addCue) {
    var f = this[section][page][cue];
    if (typeof(f) == 'function') {
      this.setSection(section);
      this.setPage(page);
      this.setCue(cue);
      if (addCue) {
        f().add(addTL)
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
          .to('.knob', 0.5, {marginTop: 0, marginLeft: 0, top: 0, left: 0, width: 110, height: 50, borderRadius: 0}, 'tl')
          .to('.initials', 0.5, {marginTop: 0, marginLeft: 0, top: 0, width: 80, left: 0, height: 50, textAlign: 'left'}, 'tl')
          .to('.initials', 0.5, {fontSize: '30px', lineHeight: '50px'}, 'tl')
          .to('.nameW', 0.5, {width: 30}, 'tl')
          .to('.nameL', 0.5, {width: 19}, 'tl')
          .to('.mobile-menu', 0.5, {opacity: 1}, 'windup')
          .to('.initials', 0.5, {left: 52}, 'windup')
          .to('.knob', 0.5, {width: '100%'}, 'pitch')
          .to('.front', 0.5, {height: 50, zIndex: 3}, 'pitch')
          .to('.initials', 0.7, {width: '100%'}, 'pitch')
          .to('.nameL', 0.3, {width: 180}, 'across')
          .to('.nameW', 0.2, {width: 180}, 'across')
          .to('.contact', 2, {opacity: 1, right: 0}, 'across')
          .staggerTo('.brands .logo', 0.5, {opacity: 1}, 0.1, 'across+=0.25')
          .to('.reachOut', 0.4, {opacity: 1}, 'contact')
          .to('.contact i', 0.2, {rotation: '0deg'}, 'contact')
          .to('.next-icon', 1, {bottom: 10, ease: Elastic.easeOut, delay: '-=1000'}, 'end')
         //tl.seek('end')
         return tl
      }
    }
  },
  web : {
    page : {
      open : function() { 
        var page = presenter.getPage();
        tl = new TimelineMax()
          .to('.'+page+' .imac', 1, {opacity: 1})
          .to('.'+page+' .iphone', 1, {opacity: 1, onComplete: function() { $('.'+page+' .cards').addClass('openCards')}})
          .staggerTo('.'+page+' .screen img', 0.5, {opacity: 1}, 3, '1')
          .staggerTo('.'+page+' .infoBox', 0.5, {opacity: 1}, 3, '1');
        return tl
      },
      close : function() { 

      },
      iphone : {
        open : function() {
          var page = presenter.getPage();
          return new TimelineMax()
          .to('.'+page+' .iphone', 1, {marginTop: -590, rotationZ: 0, width: 280, marginLeft: -155})
        },
        close : function() {
          var page = presenter.getPage(); 
          return new TimelineMax()
          .to('.'+page+' .iphone', 1, {marginTop: -80, rotationZ: -90, width: 120, marginLeft: -60})
        }
      }
    }
  }

});
var presenter = new App.Presenter(document)

