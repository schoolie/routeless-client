'use strict';

/* Filters */

angular.module('routelessFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
