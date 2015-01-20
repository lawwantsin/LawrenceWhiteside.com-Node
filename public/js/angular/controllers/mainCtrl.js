define(['angular/app'], function(app) {
  app
    .controller('mainCtrl', [  '$scope', function($scope) {
      $scope.what = function() {
        return "something";
      }
      $scope.what2 = "something2";
    }]);
});

