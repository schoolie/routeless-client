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
           signup: function (data, success, error) {
               $http.post(rlConfig.backend + 'auth', data).success(function(res) {
                 console.log('success');
                 console.log(res);
                 success(res);
               }).error(error);
           },
           login: function (data, success, error) {
               $http.post(rlConfig.backend + 'auth', data).success(function(res) {
                 console.log('success');
                 console.log(res);
                 success(res);
               }).error(error);
           },
           logout: function (success) {
               tokenClaims = {};
               delete $localStorage.token;
               success();
           },
           getTokenClaims: function () {
               return getClaimsFromToken();
           },
           
           getAuthUser: function () {
              user = getClaimsFromToken();
//              authUser = User.query({id: user.id});
//              return authUser;
              console.log('getAuthUser');
              console.log(user);
              return user;
            }
       };
   }]);