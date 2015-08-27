
routelessControllers.controller('MyCourseListCtrl', ['$scope', 'TokenService', 'Course',
  function($scope, TokenService, Course) {
    query = {filters: [{
        name: 'creator_id', 
        op: '==',   
        val: TokenService.getAuthUser().username
      }]
    };
    
    $scope.courses = Course.query({q: query});
    $scope.orderProp = 'id';  
  }]);

