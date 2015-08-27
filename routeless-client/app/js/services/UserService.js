

routelessServices.factory('User', ['$resource', 'TokenService', 'rlConfig',
  function($resource, TokenService, rlConfig){
    return $resource(rlConfig.backend+'api_1_0/users_/:id', {id:'@id'}, {
        query: {method:'GET', 
          isArray:false,
          headers: {'Authorization': function() {
              token = TokenService.getToken();
              if (typeof token !== 'undefined') {
                 return 'Bearer ' + TokenService.getToken();
              }
              else {
                 return null;
              }
            }
          }
        }
//        save: {
//          method:'POST',   
//          transformRequest: function(req) {
//            console.log(req);
//            return JSON.stringify(req);
//          }
//        }
        
    });
  }]);