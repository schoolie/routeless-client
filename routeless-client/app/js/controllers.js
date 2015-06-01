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
  

routelessControllers.controller('CourseDetailCtrl', ['$scope', '$routeParams', 'Course', 'CheckPoint',
  function($scope, $routeParams, Course, CheckPoint) {
    $scope.course = Course.query({id: $routeParams.id});
    
    $scope.submit = function(item, event) {
      $scope.course.check_points.forEach(function(cp){
        //if CP doesn't have an id, it was just created, so needs to be stored in db
        if (typeof cp.id === 'undefined') {
          var check_point = new CheckPoint({
            course_id: $scope.course.id,
            lat: cp.lat,
            lon: cp.lon,
            title: cp.title,
            description: cp.description
          });
          check_point.$save();
        }
      });
      
      $scope.course.$update(function(){
        //sends PUT request to backend, saving course and checkpoints
      });
    };
    
    //Pass changes in title to infobox object
    $scope.updateTitle = function(cp){
      cp.transient.infobox.setContent(cp.title);
    };

  }]);

routelessControllers.controller('CourseCreateCtrl', ['$scope', '$routeParams', '$location', 'Course',
  function($scope, $routeParams, $location, Course) {
    $scope.course = new Course({centerlat: 40, centerlon:-86, zoom:10, map_layer:'roadmap'});
  }]);