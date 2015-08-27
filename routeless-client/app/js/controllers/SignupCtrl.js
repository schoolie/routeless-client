
routelessControllers.controller('SignupCtrl',
['$scope',
  '$localStorage',
  '$rootScope',
  'AuthService',
  function SignupController($scope, $rootScope, $localStorage, AuthService) {
    $scope.user = {
      id: 1
    };

    $scope.$storage = $localStorage;
    
    function successAuth(res) {
      $localStorage.token = res.token;
      window.location = "#/courses";
    }
    
    $scope.signup = function() {
      var formData = {
        username: $scope.user.username,
        password: $scope.user.password
      };

      AuthService.signup(formData, successAuth, function() {
        $scope.error = 'Invalid credentials.';
      });
    };
  }]);