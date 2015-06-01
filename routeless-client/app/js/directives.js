'use strict';

/* Directives */
var routelessDirectives = angular.module('routelessDirectives', []);

routelessDirectives.directive('rlMap', function () {
  return {
    restrict: 'AEC',
    transclude: true,
    controller: function($scope) {         
      var marker;
      
      this.registerMarker = function (rlMarker) {
        console.log(rlMarker);
        var center = rlMarker.getPosition(),
          latitude = center.lat(),
          longitude = center.lng();
        marker = rlMarker;
        $scope.latitude = latitude;
        $scope.longitude = longitude;
        console.log($scope);
        if(!$scope.$$phase) $scope.$apply();
      };
      
      $scope.$watch('latitude + longitude', function (newValue, oldValue) {
        if (newValue !== oldValue) { 
          var center = marker.getPosition(),
            latitude = center.lat(),
            longitude = center.lng();
          if ($scope.latitude !== latitude || $scope.longitude !== longitude)
            marker.setPosition(new google.maps.LatLng($scope.latitude, $scope.longitude));
        }
      });
    },
    link: function (scope, elem, atrs, ctrl) {
      var mapOptions,
          latitude, 
          longitude,
          zoom,
          mapType,
          map;
  
      scope.course.$promise.then(function(){
        latitude = parseFloat(scope.course.centerlat, 10) || 40.4279;
        longitude = parseFloat(scope.course.centerlon, 10) || -86.9188;
        zoom = parseInt(scope.course.zoom) || 14;
        mapType = scope.course.map_layer || 'roadmap';

        mapOptions = {
            zoom: zoom,
            mapTypeId: mapType,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeControlOptions: {
              mapTypeIds: [
                "topo", 
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID,
                google.maps.MapTypeId.TERRAIN
              ]
            }
        };
        
        var topoTypeOptions = {
          getTileUrl: function (coord, zoom) {
            return "http://s3-us-west-1.amazonaws.com/caltopo/topo/" + zoom + "/" + coord.x + "/" + coord.y + ".png?v=1";
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 16,
          minZoom: 8,
          name: "Topo"
        };
        var topoMapType = new google.maps.ImageMapType(topoTypeOptions);  //Create Topo layer

        map = new google.maps.Map(elem[0], mapOptions);  
        
        map.mapTypes.set('topo', topoMapType); //Add topo button to map controls
        
        scope.course.check_points.forEach(function(cp){
          var markerOptions,
              marker;
          markerOptions = {
            position: new google.maps.LatLng(cp.lat, cp.lon),
            map: map,
            draggable: true
          };          
          marker = new google.maps.Marker(markerOptions);  
//          cp.marker = marker;
          console.log(scope);
        });

        var drawingManager = new google.maps.drawing.DrawingManager({    //Initialize Drawing Toolbar
          //drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.RECTANGLE
            ]
          },
          markerOptions: {
            draggable: true
          }
        });
        drawingManager.setMap(map);
        
        function markerChangedCallback (scope, marker) {
          return function () {
              var center = marker.getPosition();
              scope.latitude = center.lat();
              scope.longitude = center.lng();
              if(!scope.$$phase) scope.$apply();
            };
          }

        google.maps.event.addListener(drawingManager, 'markercomplete', function(marker){ 
          ctrl.registerMarker(marker);
          
          var center = marker.getPosition();
          var cp = {};
          cp.lat = center.lat();
          cp.lon = center.lng();
//          cp.marker = marker;
          
          scope.course.check_points.push(cp);
          console.log(scope.course.check_points);
          
          google.maps.event.addListener(marker, 'dragend', markerChangedCallback(scope, marker));
        });
	


        function mapChangedCallback (scope, map) {
          return function () {
              var center = map.getCenter();
              scope.course.centerlat = center.lat();
              scope.course.centerlon = center.lng();
              scope.course.zoom = map.getZoom();
              scope.course.map_layer = map.getMapTypeId();
              if(!scope.$$phase) scope.$apply();
            };
          }
          google.maps.event.addListener(map, 'bounds_changed', mapChangedCallback(scope, map));
          google.maps.event.addListener(map, 'zoom_changed', mapChangedCallback(scope, map));
          google.maps.event.addListener(map, 'maptypeid_changed', mapChangedCallback(scope, map));
      });
    }
  };
});    