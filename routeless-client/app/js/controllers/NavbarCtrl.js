'use strict';

routelessControllers.controller('NavbarCtrl', 
  ['$scope',
   '$location',
   'AuthService',
  function NavbarController($scope, $location, AuthService) {
  console.log(AuthService.isLoggedIn());
  
  $scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
    $scope.isLoggedIn = isLoggedIn;
    $scope.currentUser = AuthService.currentUser();
  });
  
  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

}]);
