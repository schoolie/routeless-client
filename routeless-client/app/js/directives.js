'use strict';

/* Directives */
var routelessDirectives = angular.module('routelessDirectives', []);

routelessDirectives.directive('helloMaps', function() {
  return function (scope, elem, attrs) {
    var mapOptions,
      latitude = attrs.latitude,
      longitude = attrs.longitude,
      map;
      
    console.log(attrs);
    console.log(attrs.latitude);
    console.log(longitude);
    
    latitude = latitude && parseFloat(latitude, 10) || 43.074688;
    longitude = longitude && parseFloat(longitude, 10) || -89.384294;
    
    console.log(latitude);
    console.log(longitude);
    
    mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(latitude, longitude)
    };

    map = new google.maps.Map(elem[0], mapOptions);
  };
});

routelessDirectives.directive('rlMap', function () {
  return {
    restrict: 'AEC',
    controller: function($scope) {         
      var map;
      
      this.registerMap = function (myMap) {
        var center = myMap.getCenter(),
          latitude = center.lat(),
          longitude = center.lng();
        map = myMap;
        $scope.course.centerlat = latitude;
        $scope.course.centerlon = longitude;
      };
      
      $scope.$watch('course.centerlat + course.centerlon', function (newValue, oldValue) {
        if (newValue !== oldValue) { 
          var center = map.getCenter(),
            latitude = center.lat(),
            longitude = center.lng();
          if ($scope.course.centerlat !== latitude || $scope.course.centerlon !== longitude)
            map.setCenter(new google.maps.LatLng($scope.course.centerlat, $scope.course.centerlon));
        }
      });
    },
    link: function (scope, elem, attrs, ctrl) {
      var mapOptions,
          latitude = scope.course.centerlat,
          longitude = scope.course.centerlon,
          map;
      
      console.log(scope);
      console.log(scope.course.centerlon);
      
      latitude = latitude && parseFloat(latitude, 10) || 43.074688;
      longitude = longitude && parseFloat(longitude, 10) || -89.384294;
  
      mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(latitude, longitude)
      };
      
      map = new google.maps.Map(elem[0], mapOptions);  

      ctrl.registerMap(map);

      function centerChangedCallback (scope, map) {
        return function () {
            var center = map.getCenter();
            scope.course.centerlat = center.lat();
            scope.course.centerlon = center.lng();
            if(!scope.$$phase) scope.$apply();
          };
        }
        google.maps.event.addListener(map, 'center_changed', centerChangedCallback(scope, map));
    }
  };
});    