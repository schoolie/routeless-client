'use strict';

/* App Module */

var routelessApp = angular.module('routelessApp', [
  'ngRoute',
  'routelessAnimations',
  'routelessControllers',
  'routelessFilters',
  'routelessServices',
  'routelessDirectives'
  ]);

routelessApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/courses', {
        templateUrl: 'partials/course-list.html',
        controller: 'CourseListCtrl'
      }).
      when('/courses/:id', {
        templateUrl: 'partials/course-detail.html',
        controller: 'CourseDetailCtrl'
      }).
      when('/new_course', {
        templateUrl: 'partials/course-create.html',
        controller: 'CourseCreateCtrl'
      }).
      when('/users', {
        templateUrl: 'partials/user-list.html',
        controller: 'UserListCtrl'
      }).
      when('/new_user', {
        templateUrl: 'partials/user-create.html',
        controller: 'UserCreateCtrl'
      }).
      otherwise({
        redirectTo: '/courses'
      });
  }]
        );
