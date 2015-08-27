  
routelessControllers.controller('SignupCtrl',
['$scope',
  '$localStorage',
  'User',
  'AuthService',
  function SignupController($scope, $localStorage, User, AuthService) {
    $scope.user = {
      id: 1
    };

    $scope.$storage = $localStorage;

    function successAuth(res) {
      window.location = "#/login";
    }
    
    $scope.signup = function() {
      var formData = $scope.user
      
      AuthService.signup(formData, successAuth, function() {
        $scope.error = 'Invalid credentials.';
      });
    };
  }]);