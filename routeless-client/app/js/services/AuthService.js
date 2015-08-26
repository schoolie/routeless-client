routelessServices.factory('AuthService', 
  ['$http', 
    '$localStorage',
    'User',
    function ($http, $localStorage, User) {
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
           console.log(user)
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
               user = User.query({id: data.user.id}, function(res) {
                  $localStorage.token = {user: res};
                  console.log($localStorage.token)
                  success(res);
               });
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
              authUser = User.query({id: user.id});
              return authUser;
            }
       };
   }]);