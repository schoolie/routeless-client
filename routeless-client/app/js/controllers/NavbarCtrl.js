'use strict';

routelessControllers.controller('NavbarCtrl',
['$scope',
  '$location',
  '$localStorage',
  'AuthService',
  function NavbarController($scope, $location, $localStorage, AuthService) {

    $scope.$storage = $localStorage;
    console.log($scope.$storage.token);
    
    $scope.routeIs = function(routeName) {
      return $location.path() === routeName;
    };

    $scope.logout = function() {
      AuthService.logout(function() {
        console.log('logging out');
        window.location = "#/splash";
      });
    };
  }]);
