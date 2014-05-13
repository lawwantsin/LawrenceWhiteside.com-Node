var Cues = {
  web : [
    (function() {
      new TimelineMax()
        .staggerFromTo('.csf .screen img', 0.5, {opacity: 0, yoyo: true, autoAlpha: true, repeat: -1}, {opacity: 1, yoyo: true, autoAlpha: true, repeat: -1}, 1, 'page1')
        .staggerTo('.csf .infoBox', 0.5, {opacity: 1}, .5, 'page1');
    })
  ,
    (function() {
      new TimelineMax()
        .staggerFromTo('.fantrotter .screen img', 0.5, {opacity: 0}, {opacity: 1, yoyo: true, autoAlpha: true, reverse: true}, 1, 'page1')
        .staggerTo('.fantrotter .infoBox', 0.5, {opacity: 1}, 2, 'page1');
    })
  ]
}

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

  playCue :function() {
    if (Cues[this.page][this.cue]) {
      Cues[this.page][this.cue]();
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

  resetPage :function(section) {
    this.setPage(section)
    this.resetCue();
  }

});
var presenter = new App.Presenter(document)

