'use strict';

/* Services */

var routelessServices = angular.module('routelessServices', ['ngResource']);

routelessServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

routelessServices.factory('User', ['$resource',
  function($resource){
    return $resource('http://localhost:5000/api_1_0/users/:username', {username:''}, {
      query: {method:'GET'},
    });
  }]);

routelessServices.factory('Course', ['$resource',
  function($resource){
    return $resource('http://localhost:5000/api_1_0/courses/:id', {id:'@id'}, {
        query: {method:'GET', isArray:false},
        update: {
          method: 'PUT',
          transformRequest: function(data) {
            var proc_data = data;
            proc_data.check_points.forEach(function(cp){
              delete cp.transient; //Strip transient gmaps data for passing to server
              delete cp.$$hashKey; //Strip for passing to server
            });
            return JSON.stringify(proc_data);
          }
        }
    });
//    return $resource('http://localhost:5000/test/:id', {id:''});
  }]);

routelessServices.factory('CheckPoint', ['$resource',
  function($resource){
    return $resource('http://localhost:5000/api_1_0/checkpoints/:id', {id:'@id'}, {
        query: {method:'GET', isArray:false},
        update: {method: 'PUT'}  
    });
  }]);
