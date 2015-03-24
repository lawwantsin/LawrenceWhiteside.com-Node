require.config({
  preserveLicenseComments: false,
  include: 'requireLib',
  shim: {
    can: [
      'jquery',
      'lib/jquerypp.custom'
    ]
  },
  paths: {
    can: 'components/canjs/amd/can',
    jquery: 'components/jquery/dist/jquery',
    requireLib: 'components/requirejs/require',
    isotope: 'components/isotope/dist/isotope.pkgd',
    greensock: 'components/greensock/src/uncompressed/TimelineMax',
    TweenLite: 'components/greensock/src/uncompressed/TweenMax',
    imagesLoaded: 'components/imagesloaded/imagesloaded.pkgd'
  },
  options: {
    baseUrl: ''
  },
  packages: [

  ]
});

require([
  'canjs/controls/app',
	'jquery',
  'components/canjs/amd/can/map/validations',
  'isotope',
  // 'throwProps',
  'imagesLoaded',
	'lib/fastclick',
	'lib/modernizr',
  'lib/iscroll',
  'lib/video.dev',
  'canjs/models/contact',
  'canjs/models/payment',
  'canjs/controls/bg',
  'canjs/controls/contact',
  'canjs/controls/payment',
  'canjs/controls/modals',
  'canjs/controls/interactions',
  'canjs/controls/scroll3',
  'canjs/controls/images',
  'canjs/controls/slideshow',
  'canjs/controls/grid',
  'canjs/controls/section',
  'canjs/controls/nav'
], function() {
  // Initialize
  FastClick.attach(document.body);
  play = new App.Controls.Interactions('body')
  contact = new App.Controls.Contact('body')
  payment = new App.Controls.Payment('body')
  bg = new App.Controls.BG('.site');
  modals = new App.Controls.Modals(document)
  filmScroller = new App.Controls.Scroll(document, {wrapper: '.film-scroll'});
  webScroller = new App.Controls.Scroll(document, {wrapper: '.web-scroll'});
  suplScroller = new App.Controls.Scroll(document, {wrapper: '.supl-scroll'});
  filmHeaderScroller = new App.Controls.Scroll(document, {wrapper: '.film-header-scroll'});
  webHeaderScroller = new App.Controls.Scroll(document, {wrapper: '.web-header-scroll'});
  filmHeaderGrid = new App.Controls.Grid(document, {wrapper: '.film-header-iso'});
  webHeaderGrid = new App.Controls.Grid(document, {wrapper: '.web-header-iso'});
  sections = new App.Controls.Section('.intro');
  images = new App.Controls.Images('body', {selector: '.frame img'});
  images = new App.Controls.Slideshow('.frame');  
  nav = new App.Controls.Nav('body');
	console.log ("App Started");
})
