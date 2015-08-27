'use strict';

/* App Module */

var routeless = angular.module('routeless', [
  'ngRoute',
  'ngStorage',
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
      when('/splash', {
        templateUrl: 'partials/splash.html',
        controller: 'SplashCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      }).
      when('/courses', {
        templateUrl: 'partials/course-list.html',
        controller: 'CourseListCtrl'
      }).
      when('/courses/:id', {
        templateUrl: 'partials/course-detail.html',
        controller: 'CourseDetailCtrl'
      }).
      when('/mycourses', {
        templateUrl: 'partials/course-list.html',
        controller: 'MyCourseListCtrl'
      }).
      when('/new_course', {
        templateUrl: 'partials/course-create.html',
        controller: 'CourseCreateCtrl'
      }).
      when('/users', {
        templateUrl: 'partials/user-list.html',
        controller: 'UserListCtrl'
      }).
      when('/users/:id', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
      otherwise({
        redirectTo: '/courses'
      });
  }]);
