routelessServices.factory('AuthService', 
  ['$http', 
    '$localStorage',
    'User',
    'rlConfig',
    function ($http, $localStorage, User, rlConfig) {
       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user;
       }

       var tokenClaims = getClaimsFromToken();

       return {
          signup: function(data, success, error) {
            console.log('signup');
            
            user = new User({
              username: data.username,
              email: data.email,
              password: data.password
            });
            user.$save().then(success, error);
          },
          login: function (data, success, error) {
              $http.post(rlConfig.backend + 'auth', data).success(function(res) {
                $localStorage.token = res.token;
                success(res);
              }).error(error);
          },
          logout: function (success) {
              tokenClaims = {};
              delete $localStorage.token;
              success();
          },
          getAuthUser: function () {
             return getClaimsFromToken();
           }
       };
   }]);