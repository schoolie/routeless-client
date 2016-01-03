'use strict';

/* Controller for course detail/edit page */

routelessControllers.controller('CourseDetailCtrl', 
  ['$scope', 
   '$routeParams', 
   '$window', 
   'Course', 
   'CheckPoint', 
   'leafletData',
  function($scope, $routeParams, $window, Course, CheckPoint, leafletData) {
    $scope.course = Course.query({id: $routeParams.id});
    console.log($scope);
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
            },
            osm: {
              name: 'OpenStreetMap',
              url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              type: 'xyz'
            },
            caltopo: {
              name: 'CalTopo',
              url: "http://s3-us-west-1.amazonaws.com/caltopo/topo/{z}/{x}/{y}.png?v=1",
              type: 'xyz'
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
    
    $scope.$on("leafletDirectiveMap.baselayerchange", function(event, args){
      console.log(args.leafletEvent.name);
      $scope.course.map_layer = args.leafletEvent.name;
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
            description: cp.description,
            near_distance: cp.near_distance,
            found_distance: cp.found_distance
          });
          console.log(check_point);
          check_point.$save(); //Save to Server
        }
      });
      $scope.course.$update(function(){
        //sends PUT request to backend, saving course and checkpoints
      });   
    };
    
    //Pass changes in title to infobox object
    $scope.deleteCP = function(cp){
      var i = $scope.course.check_points.indexOf(cp);
      if(i !== -1) {
        $scope.course.check_points.splice(i, 1);
      }
    };

  }]);
