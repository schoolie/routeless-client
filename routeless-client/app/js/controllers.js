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

routelessControllers.controller('UserListCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
    $scope.orderProp = 'age';
  }]);
  

routelessControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    $scope.user = User.get({username: $routeParams.username}, function(user) {
    });
  }]);

routelessControllers.controller('CourseListCtrl', ['$scope', 'Course',
  function($scope, Course) {
    $scope.courses = Course.query();
    $scope.orderProp = 'id';  }]);
  

routelessControllers.controller('CourseDetailCtrl', ['$scope', '$routeParams', 'Course',
  function($scope, $routeParams, Course) {
    $scope.course = Course.query({id: $routeParams.id});   
//    $scope.course = {
//      centerlat: '42',
//      centerlon: '-90',
//      map_layer: 'topo'
//    };
    $scope.submit = function(item, event) {
      $scope.course.$update(function(){
        //sends PUT request to backend
      });
    };
}]);

routelessControllers.controller('CourseCreateCtrl', ['$scope', '$routeParams', 'Course',
  function($scope, $routeParams, Course) {
    $scope.courseForm = {};
    $scope.courseForm.centerlat = 42.1;
    $scope.courseForm.centerlon = 50.1;
    $scope.courseForm.map_layer = 'satellite'; 
    $scope.courseForm.submit = function(item, event) {
       console.log("--> Submitting form");
       var data = {
          centerlat: $scope.courseForm.centerlat,
          centerlon: $scope.courseForm.centerlon,
          map_layer: $scope.courseForm.map_layer
       };
       
       Course.save(data);
   };
}]);