define(['angular/app'], function(app) {  
  app.config(['$locationProvider', function($locationProvider) {
    // Configure existing providers
    $locationProvider.hashPrefix('!').html5Mode(false);
  }]);

  app.config(['$routeProvider',
    function($routeProvider) {
      
      $routeProvider.
        when('/:folio', {
          controller: 'folioCtrl',
          templateName: 'folio'
        }).
        when('/:folio/:project', {
          controller: 'projectCtrl',
          templateName: 'project'
        });

  }]);

});
