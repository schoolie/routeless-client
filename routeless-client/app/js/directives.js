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
    link: function (scope, elem) {
      var mapOptions,
          latitude, 
          longitude,
          zoom,
          mapType,
          map;
      
      scope.course.$promise.then(function(){
        latitude = parseFloat(scope.course.centerlat, 10) || 43.074688;
        longitude = parseFloat(scope.course.centerlon, 10) || -89.384294;
        zoom = parseInt(scope.course.zoom) || 8;
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
              ],
              mapTypeControlStyle: 'DROPDOWN_MENU'
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