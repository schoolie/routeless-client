routelessControllers.controller('CourseCreateCtrl', 
  ['$scope', 
   '$routeParams', 
   '$location', 
   'Course', 
   'AuthService',
  function($scope, $routeParams, $location, Course, AuthService) {
    $scope.authUser = AuthService.getAuthUser();
    $scope.course = new Course({
      creator_id: $scope.authUser.username, 
      lat: 40, 
      lng: -86, 
      zoom:10, 
      map_layer:'roadmap'
    });
  }]);