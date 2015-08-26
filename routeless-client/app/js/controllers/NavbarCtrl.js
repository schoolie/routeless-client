'use strict';

routelessControllers.controller('NavbarCtrl',
['$scope',
  '$location',
  '$localStorage',
  'AuthService',
  function NavbarController($scope, $location, $localStorage, Auth) {

    $scope.routeIs = function(routeName) {
      return $location.path() === routeName;
    };


    function successAuth(res) {
      $localStorage.token = res.token;
      console.log($localStorage);
      console.log($scope.token);
      window.location = "#/courses";
    }

    $scope.signin = function() {
      var formData = {
        email: $scope.email,
        password: $scope.password
      };

      Auth.signin(formData, successAuth, function() {
        $rootScope.error = 'Invalid credentials.';
      });
    };

    $scope.signup = function() {
      var formData = {
        email: $scope.email,
        password: $scope.password
      };

      Auth.signup(formData, successAuth, function() {
        $rootScope.error = 'Failed to signup';
      });
    };

    $scope.logout = function() {
      Auth.logout(function() {
        console.log('logging out');
        window.location = "#/splash";
      });
    };
    $scope.token = $localStorage.token;
    $scope.tokenClaims = Auth.getTokenClaims();
  }]);
