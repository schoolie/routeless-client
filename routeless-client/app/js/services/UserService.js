

routelessServices.factory('User', ['$resource', 'rlConfig',
  function($resource, rlConfig){
    return $resource(rlConfig.backend+'api_1_0/users_/:id', {id:'@id'}, {
        query: {method:'GET', isArray:false},
//        save: {
//          method:'POST',   
//          transformRequest: function(req) {
//            console.log(req);
//            return JSON.stringify(req);
//          }
//        }
        
    });
  }]);