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
    this.page = null
    this.section = 'front'
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
    this.playCue();
  },

  playCue :function(page) {
    if (typeof(this[this.section].cues[page]) == 'function') {
      this[this.section].cues[page]();
      this.nextCue();
    }
  },

  setCue :function(num) {
    this.cue = num
  },

  nextCue :function() {
    this.cue = this.cue + 1;
  },

  resetCue :function() {
    this.cue = 0;
  },

  setPage :function(page) {
    this.page = page;
    this.resetCue();
  },

  resetPage :function(page) {
    this.setPage(page)
    this.resetCue();
  },

  resetSection :function(section) {
    this.setSection(section)
    this.resetPage()
    this.resetCue();
  },

  web : {
    cues : {
      csf : function() { new TimelineMax()
        .from('.csf .iphone', 0.5, {marginTop: -1000}, 1)
        .staggerFromTo('.csf .screen img', 0.5, {opacity: 0, yoyo: true, autoAlpha: true, repeat: -1}, {opacity: 1, yoyo: true, autoAlpha: true, repeat: -1}, 1, 'page1')
        .staggerTo('.csf .infoBox', 0.5, {opacity: 1}, .5);
      },
      fantrotter : function() { new TimelineMax()
        .from('.fantrotter .iphone', 0.5, {marginTop: -400}, 1)
        .staggerFromTo('.fantrotter .screen img', 0.5, {opacity: 0}, {opacity: 1, yoyo: true, autoAlpha: true, reverse: true}, 1)
        .staggerTo('.fantrotter .infoBox', 0.5, {opacity: 1}, 2);
      }
    }
  }

});
var presenter = new App.Presenter(document)

