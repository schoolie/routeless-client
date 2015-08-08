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
    
    angular.extend($scope, {events: {},
      layers: {
        baselayers: {
            googleTerrain: {
                name: 'Google Terrain',
                layerType: 'TERRAIN',
                type: 'google'
            },
            googleHybrid: {
                    name: 'Google Hybrid',
                    layerType: 'HYBRID',
                    type: 'google'
                },
            googleRoadmap: {
                name: 'Google Streets',
                layerType: 'ROADMAP',
                type: 'google'
            }
        }
        }
      });
    
    $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
      for (var i=0; i < $scope.course.check_points.length; i++) {
        if (args.model.id === $scope.course.check_points[i].id){
          var idx = i;
        }
      }
      var cp = $scope.course.check_points[idx];
      console.log(cp);
      cp.lat = args.model.lat;
      cp.lng = args.model.lng;
    });
    
    $scope.add_check_point = function() {
      $scope.course.check_points.push({
        lat: $scope.course.lat,
        lng: $scope.course.lng,
        draggable: true
      });
    };
    
    console.log($scope.center);
    console.log($scope.course);
    $scope.submit = function() {
      $scope.course.check_points.forEach(function(cp){
        //if CP doesn't have an id, it was just created, so needs to be stored in db
        if (typeof cp.id === 'undefined') {
          var check_point = new CheckPoint({
            course_id: $scope.course.id,
            lat: cp.lat,
            lng: cp.lng,
            title: cp.title,
            description: cp.description
          });
          check_point.$save();
        }
      });
      $scope.course.$update(function(){
        //sends PUT request to backend, saving course and checkpoints
      }).then(function() {
//        $window.location.reload(); //Refresh page to get transient data rebuilt
      });   
    };
    
    //Pass changes in title to infobox object
    $scope.deleteCP = function(cp){
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
    $scope.course = new Course({lat: 40, lng: -86, zoom:10, map_layer:'roadmap'});
  }]);
