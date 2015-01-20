define(['angular/app'], function(app) {
  app
    .controller(['projectCtrl', function($scope, $route) {
      console.log($route.folio, $route.project);
    }]);
})
