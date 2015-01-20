define([
  'ng',
  'angular-route',
  'angular/controllers/routes',
  'angular/controllers/mainCtrl',
  'angular/controllers/folioCtrl',
  'angular/controllers/projectCtrl'
], function(ng) {
  return ng.module('app', [
     'app.services',
     'app.controllers',
     'app.filters',
     'app.directives'
  ]);
});
