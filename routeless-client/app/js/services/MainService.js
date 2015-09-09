'use strict';

/* Services */

var routelessServices = angular.module('routelessServices', ['ngResource']);

routelessServices.factory('CheckPoint', ['$resource', 'TokenService', 'rlConfig',
  function($resource, TokenService, rlConfig){
    rlConfig = {backend: ''};
    return $resource(rlConfig.backend+'api_1_0/checkpoints/:id', {id:'@id'}, {
        query: {method:'GET', 
          isArray:false,
          headers: TokenService.authHeaders
        },
        update: {method: 'PUT',
          headers: TokenService.authHeaders
        }  
    });
  }]);
