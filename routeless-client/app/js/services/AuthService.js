/* Resource that Handles user authentication */


routelessServices.factory('AuthService', [ function() {
  var authObj = {};
  var currentUser;
  
  authObj = {
    login: function(user) {
      currentUser = user;
    },
    logout: function() {
      currentUser = null;
    },
    isLoggedIn: function() {
      if (currentUser) {
        return true;
      }
      else {
        return false;
      }
    },
    currentUser: function() { 
      return currentUser; 
    }
  };
  
  return authObj;
}]);
