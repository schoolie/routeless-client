routelessControllers.controller('CourseCreateCtrl', 
  ['$scope', 
   '$routeParams', 
   '$location', 
   'Course', 
   'TokenService',
  function($scope, $routeParams, $location, Course, TokenService) {
    $scope.authUser = TokenService.getAuthUser();
    $scope.course = new Course({
      creator_id: $scope.authUser.username, 
      lat: 40, 
      lng: -86, 
      zoom:10, 
      map_layer:'roadmap'
    });
  }]);