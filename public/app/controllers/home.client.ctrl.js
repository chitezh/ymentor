'use strict';

angular.module('pairToLearnApp')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
        $('[data-typer-targets]').typer();
      });
    })(jQuery);

  }]);
