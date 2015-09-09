

routelessServices.factory('User', ['$resource', 'TokenService', 'rlConfig',
  function($resource, TokenService, rlConfig){
    return $resource(rlConfig.backend+'api_1_0/users/:id', {id:'@id'}, {
        query: {method:'GET', 
          isArray:false,
          headers: TokenService.authHeaders
        }        
    });
  }]);