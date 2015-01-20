angular.module('famousApp', ['famous.angular'])
  .controller('mainController', function($scope) {
    $scope.gridOptions = {
      dimensions: [2, 3]
    }
    $scope.list = [
      {content:"hello", bgColor: "#b58900", video: 'wall'},
      {content:"world", bgColor: "#cb4b16", video: 'trike'},
      {content: "famous", bgColor: "#dc322f", video: 'train'},
      {content: "angular", bgColor: "#d33682", video: 'kitchen'},
      {content: "is", bgColor: "#6c71c4", video: 'hammock'},
      {content: "cool!", bgColor: "#268bd2", video: 'sleeping'}
    ]
  })
