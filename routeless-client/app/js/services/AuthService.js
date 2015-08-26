routelessServices.factory('AuthService', 
  ['$http', 
    '$localStorage',
    function ($http, $localStorage) {
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
//               var encoded = token.split('.')[1];
//               user = JSON.parse(urlBase64Decode(encoded));
               user = token.user;
           }
           return user;
       }

       var tokenClaims = getClaimsFromToken();

       return {
           signup: function (data, success, error) {
//               $http.post(urls.BASE + '/signup', data).success(success).error(error)
               success({token: {user:'schoolie'}});
           },
           signin: function (data, success, error) {
//               $http.post(urls.BASE + '/signin', data).success(success).error(error)
               console.log(data);
               res = {token: {user: data.user}};
               $localStorage.token = res.token;
               success(res);
           },
           logout: function (success) {
               tokenClaims = {};
               delete $localStorage.token;
               success();
           },
           getTokenClaims: function () {
               return getClaimsFromToken();
           }
       };
   }]);