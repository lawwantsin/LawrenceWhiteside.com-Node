require.config({
  shim: {
  	'can' : ['jquery'],
    'greensock' : ['../components/greensock/src/uncompressed/TweenMax', '../components/greensock/src/uncompressed/easing/EasePack']
  },
  paths: {
    angular: "../components/angular/angular",
    backbone: "../components/backbone/backbone",
    can: "../components/canjs/amd/can",
    famous: "../components/famous/dist/famous",
    "famous-angular": "../components/famous-angular/dist/famous-angular",
    greensock: "../components/greensock/src/uncompressed/TimelineMax",
    jquery: "../components/jquery/dist/jquery",
    requirejs: "../components/requirejs/require",
    underscore: "../components/underscore/underscore"
  },
  options : {
  	baseUrl: '../components'
  }
});

define([
	'jquery',
	'can',
	'lib/fastclick',
	'lib/modernizr',
  'models/contact',
  'models/payment',
  'controls/bg',
  'controls/contact',
  'controls/modals',
  'controls/presenter',
  'controls/scroll3',
  'controls/section',
  'controls/nav'
], function() {
	console.log ("App Started");
})
