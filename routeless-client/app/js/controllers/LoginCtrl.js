
routelessControllers.controller('LoginCtrl',
['$scope',
  '$localStorage',
  'AuthService',
  function LoginController($scope, $localStorage, AuthService) {
    $scope.user = {
      id: 1
    };

    function successAuth(res) {
      $localStorage.token = res.token;
      window.location = "#/courses";
    }
    
    $scope.login = function() {
      var formData = {
        user: $scope.user
      };

      AuthService.signin(formData, successAuth, function() {
        $rootScope.error = 'Invalid credentials.';
      });
    };
  }]);