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
//    controller: function($scope) {         
//      var map;
//      
//      this.registerMap = function (myMap) {
//        var center = myMap.getCenter(),
//          latitude = center.lat(),
//          longitude = center.lng();
//        map = myMap;
//        $scope.course.centerlat = latitude;
//        $scope.course.centerlon = longitude;
//      };
//      
//      $scope.$watch('course.centerlat + course.centerlon', function (newValue, oldValue) {
//        console.log('watched');
//        if (newValue !== oldValue) { 
//          var center = map.getCenter(),
//            latitude = center.lat(),
//            longitude = center.lng();
//          if ($scope.course.centerlat !== latitude || $scope.course.centerlon !== longitude)
//            map.setCenter(new google.maps.LatLng($scope.course.centerlat, $scope.course.centerlon));
//        }
//      });
//    },
    link: function (scope, elem, attrs, ctrl) {
      var mapOptions,
          latitude, 
          longitude,
          zoom,
          mapType,
          map;
      
      scope.course.$promise.then(function(){
        latitude = parseFloat(scope.course.centerlat, 10) || 43.074688;
        longitude = parseFloat(scope.course.centerlon, 10) || -89.384294;
        zoom = parseFloat(scope.course.zoom, 10) || 8;
        mapType = scope.course.map_layer || 'roadmap';

        mapOptions = {
            zoom: zoom,
            mapTypeId: mapType,
            center: new google.maps.LatLng(latitude, longitude)
        };

        map = new google.maps.Map(elem[0], mapOptions);  

  //      ctrl.registerMap(map);

        function centerChangedCallback (scope, map) {
          return function () {
              var center = map.getCenter();
              scope.course.centerlat = center.lat();
              scope.course.centerlon = center.lng();
              scope.course.zoom = map.getZoom();
              scope.course.map_layer = map.getMapTypeId();
              if(!scope.$$phase) scope.$apply();
            };
          }
          google.maps.event.addListener(map, 'bounds_changed', centerChangedCallback(scope, map));
          google.maps.event.addListener(map, 'zoom_changed', centerChangedCallback(scope, map));
          google.maps.event.addListener(map, 'maptypeid_changed', centerChangedCallback(scope, map));
      });
    }
  };
});    