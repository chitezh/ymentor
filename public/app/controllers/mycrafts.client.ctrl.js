"use strict";

angular.module('pairToLearnApp')
  .controller('myCraftsCtrl', ['CraftService', 'UserService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, UserService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {
    (function($) {
      $(function() {
        $('ul.tabs').tabs();
      });
    })(jQuery);

    function getMyCtrafts() {
      UserService.getOneUser($window.sessionStorage.user).then(function(data) {
        var sessions = data.sessions;
        console.log(data);
        sessions.forEach(function(element, index) {
          var craftId = element.sessionId.split('-')[1];
          CraftService.getOneCraft(craftId).then(function(data) {
            element.craftData = data;
          }, function(err) {
            return err;
          });
        });
        console.log(sessions);
        $scope.sessions = sessions;
      });
    }
    getMyCtrafts();

    $scope.complete = function(sessionId) {
      var params = {};
      params.sessionId = sessionId;
      console.log(params);
      UserService.markAsComplete($window.sessionStorage.user, params).then(function(data) {
        getMyCtrafts();
        Materialize.toast('Session completed successfully!', 4000);

      });
    };
  }]);
