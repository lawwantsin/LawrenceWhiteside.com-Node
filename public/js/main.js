require.config({
  name: 'main',
  preserveLicenseComments: false,
  include: 'requireLib',
  shim: {
    can: [
      'jquery',
      'lib/jquerypp.custom'
    ]
  },
  paths: {
    angular: 'components/angular/angular',
    backbone: 'components/backbone/backbone',
    can: 'components/canjs/amd/can',
    famous: 'components/famous/dist/famous',
    'famous-angular': 'components/famous-angular/dist/famous-angular',
    jquery: 'components/jquery/dist/jquery',
    requireLib: 'components/requirejs/require',
    underscore: 'components/underscore/underscore',
    canjs: 'components/canjs/can.jquery',
    isotope: 'components/isotope/dist/isotope.pkgd',
    greensock: 'components/greensock/src/uncompressed/TimelineMax',
    TweenLite: 'components/greensock/src/uncompressed/TweenMax',
//    throwProps: 'lib/ThrowPropsPlugin.min',
    draggable: 'components/greensock/src/uncompressed/utils/Draggable',
    imagesLoaded: 'components/imagesloaded/imagesloaded.pkgd'
  },
  options: {
    baseUrl: ''
  },
  packages: [

  ]
});

require([
  'controls/app',
	'jquery',
  'components/canjs/amd/can/map/validations',
  'isotope',
  // 'throwProps',
  'imagesLoaded',
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
  'controls/interactions',
  'controls/scroll3',
  'controls/images',
  'controls/grid',
  'controls/section',
  'controls/nav'
], function() {
  // Initialize
  FastClick.attach(document.body);
  play = new App.Controls.Interactions(document)
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
  nav = new App.Controls.Nav('body');
	console.log ("App Started");
})
