'use strict';

/* Services */

var routelessServices = angular.module('routelessServices', ['ngResource']);

routelessServices.factory('CheckPoint', ['$resource', 'rlConfig',
  function($resource, rlConfig){
    rlConfig = {backend: ''};
    return $resource(rlConfig.backend+'api_1_0/checkpoints/:id', {id:'@id'}, {
        query: {method:'GET', isArray:false},
        update: {method: 'PUT'}  
    });
  }]);
