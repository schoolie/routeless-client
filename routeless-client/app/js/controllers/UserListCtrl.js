
routelessControllers.controller('UserListCtrl', ['$scope', 'User', 'AuthService',
  function($scope, User, AuthService) {
    $scope.users = User.query();
    $scope.orderProp = 'id'; 
    
    $scope.login = function(user) {
      AuthService.login(user);
    };
  }]);
