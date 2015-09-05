'use strict';

angular.module('pairToLearnApp')
  .filter('slug', function() {
    return function(value) {
      return value ? value.replace(/ /g, '-').toLowerCase() : '';
    };
  });
