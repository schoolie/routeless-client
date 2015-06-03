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

routelessControllers.controller('UserCreateCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.user = new User({username:'schoolie', email:'brian.p.schoolcraft@gmail.com'});
    
    $scope.submit = function() {
      $scope.user.$save($scope.user, function(response) {
        console.log(response);
      });
    };
  }]);

routelessControllers.controller('CourseDetailCtrl', ['$scope', '$routeParams', '$window', 'Course', 'CheckPoint',
  function($scope, $routeParams, $window, Course, CheckPoint) {
    $scope.course = Course.query({id: $routeParams.id});
    
    $scope.submit = function() {
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
      }).then(function() {
        $window.location.reload(); //Refresh page to get transient data rebuilt
      });   
    };
    
    //Pass changes in title to infobox object
    $scope.updateTitle = function(cp){
      cp.transient.infobox.setContent(cp.title);
    };
    //Pass changes in title to infobox object
    $scope.deleteCP = function(cp){
      cp.transient.marker.setMap(null);
      cp.transient.infobox.close();
//      CheckPoint.delete({id: cp.id});
      var i = $scope.course.check_points.indexOf(cp);
      if(i !== -1) {
        $scope.course.check_points.splice(i, 1);
      }
//      var check_point = new CheckPoint(cp);
//      check_point.$delete(function(){});
    };

  }]);

routelessControllers.controller('CourseCreateCtrl', ['$scope', '$routeParams', '$location', 'Course',
  function($scope, $routeParams, $location, Course) {
    $scope.course = new Course({centerlat: 40, centerlon:-86, zoom:10, map_layer:'roadmap'});
  }]);
