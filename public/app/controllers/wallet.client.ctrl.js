'use strict';

angular.module('pairToLearnApp')
  .controller('WalletCtrl', ['$rootScope', '$scope', '$window', '$location', 'UserService', '$timeout', 'SessionService', function($rootScope, $scope, $window, $location, UserService, $timeout, SessionService) {
    (function($) {
      $(function() {
        $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });
      });
    })(jQuery);

    var craftId = $window.sessionStorage.craft;
    var expertId = $window.sessionStorage.expert;
    $scope.showBookSession = true;
    if (!craftId && !expertId) {
      $scope.showBookSession = false;
    }

    $timeout(function() {
      UserService.getOneUser($window.sessionStorage.user).then(function(data) {
        console.log(data);
        $scope.minutes = data.minutes;
      });
    }, 1000);
    $scope.counter = $scope.minutes * 60;

    var mytimeout = null;
    $scope.onTimeout = function() {
      if ($scope.counter === 0) {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        return;
      }
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
    };

    $scope.bookMentorSession = function(userId, craftId, sessionData) {
      if (!sessionData.date) {
        return;
      }
      var expertId = $window.sessionStorage.expert;
      SessionService.sendMail(userId, craftId, expertId, sessionData).then(function(data) {
        Materialize.toast('Session Booked successfully!', 4000);
        console.log(data);
        $window.sessionStorage.removeItem('expert');
        $window.sessionStorage.removeItem('craft');
        $location.path('/mycrafts');
      });
    };
  }]);
