'use strict';

/* App Module */

var routeless = angular.module('routeless', [
  'ngRoute',
  'routelessAnimations',
  'routelessControllers',
  'routelessFilters',
  'routelessServices',
  'routelessDirectives',
  'leaflet-directive'
  ]);

routeless.config(['$routeProvider',
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
      when('/users/:id', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
      otherwise({
        redirectTo: '/courses'
      });
  }]
        );
