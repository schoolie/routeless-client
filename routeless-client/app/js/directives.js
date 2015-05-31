'use strict';

/* Directives */
var routelessDirectives = angular.module('routelessDirectives', []);

routelessDirectives.directive('rlMap', function () {
  return {
    restrict: 'AEC',
    link: function (scope, elem) {
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
                "Topo", 
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
        
        map.mapTypes.set('Topo', topoMapType); //Add topo button to map controls

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
           // icon: blackIcon,    //Reference blackIcon created above
           // draggable: true
          }
        });

        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'markercomplete', function(marker){ 
          console.log(marker.position);
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