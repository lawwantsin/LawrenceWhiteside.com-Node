define(['angular/app'], function(app) {
  app
    .controller(['folioCtrl', function($scope, $route) {
      console.log($route.folio, $route.project);
    }]);
})
