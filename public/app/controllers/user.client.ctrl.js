'use strict';

angular.module('pairToLearnApp')
  .controller('UserCtrl', ['$rootScope', '$scope', '$location', 'UserService', function($rootScope, UserService, $scope, $location) {

    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.collapsible').collapsible({
          accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
        $('.materialboxed').materialbox();
      });
    })(jQuery);

  }]);
