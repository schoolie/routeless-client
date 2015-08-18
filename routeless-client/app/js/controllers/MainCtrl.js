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

routelessControllers.controller('UserListCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
    $scope.orderProp = 'id';  
  }]);

routelessControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    $scope.user = User.query({id: $routeParams.id});
  }]);

routelessControllers.controller('UserCreateCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.user = new User({username:'schoolie', email:'brian.p.schoolcraft@gmail.com'});
    
    $scope.submit = function() {
      $scope.user.$save($scope.user, function(response) {
        console.log(response);
      });
    };
  }]);

routelessControllers.controller('CourseCreateCtrl', ['$scope', '$routeParams', '$location', 'Course',
  function($scope, $routeParams, $location, Course) {
    $scope.course = new Course({lat: 40, lng: -86, zoom:10, map_layer:'roadmap'});
  }]);
