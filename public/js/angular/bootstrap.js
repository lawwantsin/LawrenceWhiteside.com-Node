define([
  'require',
  'ng',
  'app'
  'angular-route'
], 
function(require, angular) {
  'use strict';
  require(['domReady'], function(document) {
    angular.bootstrap(document, ['app'])
  })
});
