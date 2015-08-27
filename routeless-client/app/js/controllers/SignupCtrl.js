  
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
    
    $scope.signup = function() {
      console.log('signup');
      delete $scope.$storage.token;
      user = new User({
        username: $scope.user.username,
        password: $scope.user.password
      });
      user.$save().then(function(response) {
        console.log(response);
        window.location = "#/login";
      });
    };
  }]);