
routelessControllers.controller('UserListCtrl', ['$scope', '$localStorage', 'User', 'AuthService',
  function($scope, $localStorage, User, AuthService) {
    $scope.users = User.query();
    $scope.orderProp = 'id'; 
    
    $scope.login = function(user) {
      AuthService.login(user);
    };
  }]);
