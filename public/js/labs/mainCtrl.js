angular.module('emailParser', [])
.factory('EmailParser', ['$interpolate', 
  function($interpolate) {
    return {
      parse: function(text, context) {
        var template = $interpolate(text);
        return template(context);
      }
    }
  }
]);


var app = angular.module('kateApp', ['famous.angular'])

app.run(function($rootScope, $timeout) {
  $rootScope.isDisabled = true;
  $timeout(function() {
    $rootScope.isDisabled = false;
  }, 5000)
})

app.controller('myController', ['$scope', '$window', '$parse', '$interpolate', 'EmailParser', '$filter', function($scope, $window, $parse, $interpolate, EmailParser, $filter) {

  angular.element($window).on('resize', function() {
    $scope.$apply();
  });

  $scope.radius = 1
  $scope.grow = function() {
    $scope.radius += 1;
  }  

  $scope.contact = {
    person: null
  }

  $scope.people = [];

  $scope.submit = function() {
    if ($scope.contact.person) {
      $scope.people.push({person: $scope.contact.person});
      $scope.contact.person = '';
    }
  };

  $scope.today = new Date();
  $scope.names = ['jim', 'john', 'nancy', 'bob', 'ken', 'Paige']
  $scope.isCaps = function(s) {
    return s[0] == s[0].toUppercase();
  };

  $scope.$watch('body', function(body) {
    if (body) {
      $scope.preview = EmailParser.parse(body, {
        to: $filter('lowercase')($scope.to)
      });  
    }
  });  

}]);

app.directive('priority', function() {

  function link() {

  }
  return {
    restrict: 'A',
    link: link
  }

});

app.directive('fitImage', ['$window', function($window) {

  function sizeImage(el) {
    var image = el.find('img')
    if (image.length == 0) return {};
    var sizes = {};
    sizes.ih = image[0].naturalHeight;
    sizes.iw = image[0].naturalWidth;
    var iRatio = sizes.iw/sizes.ih;  // >1 is landscape; <=1 is portrait
    var parent = el
    sizes.ww = $window.innerWidth;
    sizes.wh = $window.innerHeight;
    var winRatio = sizes.ww/sizes.wh;
    if ((sizes.ww-sizes.iw) < (sizes.wh-sizes.ih)) sizes = scaleUp('height', sizes);
    if ((sizes.ww-sizes.iw) >= (sizes.wh-sizes.ih)) sizes = scaleUp('width', sizes);
    var niRatio = sizes.niw/sizes.nih;  // >1 is landscape; <=1 is portrait
    return { height: sizes.nih, width: sizes.niw, marginLeft: -(sizes.niw/2)};
  }

  function scaleUp(type, sizes) {
    if (type == 'height') {
      ratio = (sizes.wh/sizes.ih)
      sizes.nih = sizes.nih * ratio;
      sizes.niw = sizes.iw * ratio;
    }
    else {
      ratio = (sizes.ww/sizes.iw)
      sizes.niw = sizes.niw * ratio
      sizes.nih = sizes.ih * ratio;
    }
    return sizes
  }

  function link(scope, el) {
    scope.$watch(function() {
      return $window.innerWidth;
    }, function() {
//      scope.style = function() { return sizeImage(el) }
    })
  }

  return {
    restrict: 'A',
    link : link
  }

}]);

app.directive('ensureUnique', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function(n) {
        if (!n) return;
        $http({
          method: 'POST',
          url: '/api/check/'+attrs.ensureUnique,
          data: {'field': scope.contact[attrs.ensureUnique]}
          }).success(function(data) {
            c.$setValidity('unique', data.isUnique);
          }).error(function(data) {
            c.$setValidity('unique', false);
        });
      });
    }
  }
});

app.directive('myDirective', function() {
  return {
    restrict: 'A',
    replace: true,
    template: '<a href="{{url}}">{{link}}</a>',
    scope: {
      url: '=url',
      link: '=someLink'
    },
    controller: function($scope) {
      console.log($scope.url)
    }
  }
});


app.directive('ngFocus', [function() {
  var FOCUS_CLASS = 'ng-focused';
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$focused = false;
      element.bind('focus', function(evt) {
        element.addClass(FOCUS_CLASS);
        scope.$apply(function() {
          ctrl.$focused = true;
        });
      }).bind('blur', function(evt) {
        element.removeClass(FOCUS_CLASS);
        scope.$apply(function() {
          ctrl.$focused = false;
        })
      })
    }
  }
}]);
