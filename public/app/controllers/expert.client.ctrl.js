"use strict";

angular.module('pairToLearnApp')
  .controller('ExpertCtrl', ['CraftService', 'UserService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, UserService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    //expert page
    CraftService.getOneCraft($routeParams.craftId).then(function(data) {
      $rootScope.oneCraft = data;
    });

    $scope.saveCraftExpert = function(craftId, expertId) {
      var userId = $window.sessionStorage.user;
      $window.sessionStorage.expert = expertId;
      $window.sessionStorage.craft = craftId;
      $location.url('/wallet' + '/user/' + userId);
    };

  }]);
