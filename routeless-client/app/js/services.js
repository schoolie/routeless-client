'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

phonecatServices.factory('User', ['$resource',
  function($resource){
    return $resource('http://localhost:5000/api_1_0/users/:username', {username:''}, {
      query: {method:'GET'},
    });
  }]);
