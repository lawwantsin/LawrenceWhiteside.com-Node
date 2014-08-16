require.config({
  shim: {
    can: [
      'jquery',
      '../js/lib/jquerypp.custom'
    ],
    greensock: [
      // '../js/lib/ThrowPropsPlugin.min',
      '../components/greensock/src/minified/TweenMax.min',
      '../components/greensock/src/minified/TweenLite.min',
      '../components/greensock/src/minified/easing/EasePack.min'
    ]
  },
  paths: {
    angular: '../components/angular/angular',
    backbone: '../components/backbone/backbone',
    can: '../components/canjs/amd/can',
    famous: '../components/famous/dist/famous',
    'famous-angular': '../components/famous-angular/dist/famous-angular',
    greensock: '../components/greensock/src/uncompressed/TimelineMax',
    jquery: '../components/jquery/dist/jquery',
    requirejs: '../components/requirejs/require',
    underscore: '../components/underscore/underscore',
    canjs: '../components/canjs/can.jquery'
  },
  options: {
    baseUrl: '../components'
  },
  packages: [

  ]
});

require([
  'controls/app',
	'jquery',
  '../components/canjs/amd/can/map/validations',
	'lib/fastclick',
	'lib/modernizr',
  'lib/iscroll',
  'lib/video.dev',
  'models/contact',
  'models/payment',
  'controls/bg',
  'controls/contact',
  'controls/payment',
  'controls/modals',
  'controls/presenter',
  'controls/scroll3',
  'controls/section',
  'controls/nav'
], function() {
  // Initialize
  presenter = new App.Controls.Presenter(document)
  contact = new App.Controls.Contact('body')
  payment = new App.Controls.Payment('body')
  bg = new App.Controls.BG('.site');
  modals = new App.Controls.Modals(document)
  filmScroller = new App.Controls.Scroll(document, {wrapper: '.film-scroll'});
  webScroller = new App.Controls.Scroll(document, {wrapper: '.web-scroll'});
  filmNavScroller = new App.Controls.Scroll(document, {wrapper: '.film-nav-scroll'});
  webNavScroller = new App.Controls.Scroll(document, {wrapper: '.web-nav-scroll'});
  filmHeaderScroller = new App.Controls.Scroll(document, {wrapper: '.film-header-scroll', horizontal: true, initialMove: 100});
  webHeaderScroller = new App.Controls.Scroll(document, {wrapper: '.web-header-scroll', horizontal: true, initialMove: -100});
  sections = new App.Controls.Section('.intro');
  nav = new App.Controls.Nav('body');
	console.log ("App Started");
})
