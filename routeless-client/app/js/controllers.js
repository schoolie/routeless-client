'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

phonecatControllers.controller('UserListCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
    $scope.orderProp = 'age';
  }]);
  

phonecatControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    $scope.user = User.get({username: $routeParams.username}, function(user) {
    });
  }]);

phonecatControllers.controller('CourseListCtrl', ['$scope', 'Course',
  function($scope, Course) {
    $scope.courses = Course.query();
    $scope.orderProp = 'id';  }]);
  

phonecatControllers.controller('CourseDetailCtrl', ['$scope', '$routeParams', 'Course',
  function($scope, $routeParams, Course) {
    $scope.course = Course.get({id: $routeParams.id}, function(course) {
    });
  }]);

phonecatControllers.controller('CourseCreateCtrl', ['$scope', '$routeParams', 'Course',
  function($scope, $routeParams, Course) {
    $scope.courseForm = {};
    $scope.courseForm.centerlat = 42.1;
    $scope.courseForm.centerlon = 50.1;
    $scope.courseForm.map_layer = 'satellite'; 
    $scope.courseForm.submit = function(item, event) {
       console.log("--> Submitting form");
       var dataObject = {
          center_lat: $scope.courseForm.centerlat,
          center_lon: $scope.courseForm.centerlon,
          map_layer: $scope.courseForm.map_layer
       };
       
       Course.save({data: dataObject});
   };
}]);