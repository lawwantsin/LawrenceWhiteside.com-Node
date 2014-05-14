App.Presenter = can.Control({

  init :function() {
    var iScrollOptions = {
      scrollX: false, scrollY: true, scrollbars: false, 
      useTransform: false, useTransition: true, probeType: 3,
      bounce: false, momentum: false
    }
    this.iScroll = new IScroll('.scrollContainer', iScrollOptions);
    this.iScroll.on("scroll", function () {
      console.log('scrolling');
    });
    this.page = 'csf';
    this.section = 'front';
    this.cue = 'open';
  },

  '{document} scroll' :function(el, ev) {
    var self = this;
    ev.preventDefault();
    if (self.okToSwipe) self.swiped();
    setTimeout(function() {
      self.okToSwipe = true;
    }, 1000);
  },

  swiped :function() {
    this.okToSwipe = false
    this.playCue(this.page, this.cue);
  },

  playCue :function(page, cue) {
    page = page || this.page
    cue = cue || this.cue
    if (typeof(this[this.section][page][cue]) == 'function') {
      this[this.section][page][cue]();
      this.okToSwipe = true;
    }
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

  front : {
    open : function(section, page) {
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
        .to('.front', 0.5, {height: 50}, 'pitch')
        .to('.initials', 0.7, {width: '100%'}, 'pitch')
        .to('.nameL', 0.3, {width: 180}, 'across')
        .to('.nameW', 0.2, {width: 180}, 'across')
        .to('.contact', 2, {opacity: 1, right: 0}, 'across')
        .staggerTo('.brands .logo', 0.5, {opacity: 1}, 0.1, 'across+=0.25')
        .to('.reachOut', 0.4, {opacity: 1}, 'contact')
        .to('.contact i', 0.2, {rotation: '0deg'}, 'contact')
        .to('.next-icon', 1, {bottom: 10, ease: Elastic.easeOut, delay: '+=1000'})
        .to('.'+section, 0, {display: 'block'})
        .to('.'+section, 1, {opacity: 1})
        .to('.'+page, 0, {display: 'block'})
        .to('.'+page, 0.5, {opacity: 1, onComplete : function() {
          presenter.playCue(page, 'open');
        }}, section);
    }
  },
  web : {
    csf : {
      open : function() { 
        var tl = new TimelineMax()
        .to('.csf .imac', 1, {opacity: 1})
        .to('.csf .iphone', 1, {opacity: 1})
        .staggerTo('.csf .screen img', 0.5, {opacity: 1, yoyo: true, autoAlpha: true, repeat: -1}, 4, 'csf1')
        .staggerTo('.csf .infoBox', 0.5, {opacity: 1}, 4, 'csf1');
      },
      close : function() { 
      },
      iphone : {
        open : function() { 
          var tl = new TimelineMax()
          .to('.csf .iphone', 1, {marginTop: -590, rotationZ: 0, width: 280, marginLeft: -155})
        },
        close : function() { 
          var tl = new TimelineMax()
          .to('.csf .iphone', 1, {marginTop: -80, rotationZ: -90, width: 120, marginLeft: -60})
        }
      }
    },
    fantrotter : {
      open : function() { 
        var tl = new TimelineMax()
        .to('.fantrotter .imac', 1, {opacity: 1})
        .to('.fantrotter .iphone', 1, {opacity: 1})
        .staggerTo('.fantrotter .screen img', 0.5, {opacity: 1, yoyo: true, autoAlpha: true, repeat: -1}, 4, 'fan')
        .staggerTo('.fantrotter .infoBox', 0.5, {opacity: 1}, 4, 'fan');
      },
      close : function() { 
      },
      iphone : {
        open : function() { 
          var tl = new TimelineMax()
          .to('.fantrotter .iphone', 1, {marginTop: -590, rotationZ: 0, width: 280, marginLeft: -155})
        },
        close : function() { 
          var tl = new TimelineMax()
          .to('.fantrotter .iphone', 1, {marginTop: -80, rotationZ: -90, width: 120, marginLeft: -60})
        }
      }
    }
  }

});
var presenter = new App.Presenter(document)

