'use strict';

/* Controllers */

var routelessControllers = angular.module('routelessControllers', []);

routelessControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

routelessControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

routelessControllers.controller('CourseListCtrl', ['$scope', 'Course',
  function($scope, Course) {
    $scope.courses = Course.query();
    $scope.orderProp = 'id';  
  }]);

routelessControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    $scope.user = User.query({id: $routeParams.id});
  }]);

routelessControllers.controller('SplashCtrl', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
//    $scope.user = User.query({id: $routeParams.id});
  }]);
