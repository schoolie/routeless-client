'use strict';

routelessControllers.controller('NavbarCtrl',
['$scope',
  '$location',
  '$localStorage',
  'AuthService',
  function NavbarController($scope, $location, $localStorage, AuthService) {

    $scope.routeIs = function(routeName) {
      return $location.path() === routeName;
    };


    function successAuth(res) {
      $localStorage.token = res.token;
      window.location = "#/courses";
    }

    $scope.signup = function() {
      var formData = {
        email: $scope.email,
        password: $scope.password
      };

      AuthService.signup(formData, successAuth, function() {
        $rootScope.error = 'Failed to signup';
      });
    };

    $scope.logout = function() {
      AuthService.logout(function() {
        console.log('logging out');
        window.location = "#/splash";
      });
    };
    
    $scope.$watch(function() {
      return $localStorage.token;
    }, function(newVal, oldVal) {
      console.log('token changed');
      console.log(newVal);
      $scope.authUser = AuthService.getTokenClaims();
      $scope.token = newVal;
    });
  }]);
