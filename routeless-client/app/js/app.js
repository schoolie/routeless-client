'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'uiGmapgoogle-maps'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/users', {
        templateUrl: 'partials/user-list.html',
        controller: 'UserListCtrl'
      }).
      when('/courses', {
        templateUrl: 'partials/course-list.html',
        controller: 'CourseListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/users/:username', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
      when('/courses/:id', {
        templateUrl: 'partials/course-detail.html',
        controller: 'CourseDetailCtrl'
      }).
      when('/new_course', {
        templateUrl: 'partials/course-create.html',
        controller: 'CourseCreateCtrl'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }],
    ['$resourceProvider', function($resourceProvider) {
        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }],
    ['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDP2M6kmO0ZJovCG0YufOy0XsK2HbdFm7w',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }]
        );
