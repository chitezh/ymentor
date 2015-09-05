"use strict";

angular.module('pairToLearnApp')
  .controller('CraftCtrl', ['CraftService', 'UserService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', function(CraftService, UserService, $scope, $location, $timeout, $rootScope, $window, $routeParams) {
    (function($) {
      $(function() {
        $('.modal-trigger').leanModal();
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy();
      });
    })(jQuery);

    UserService.getOneUser($window.sessionStorage.user).then(function(data) {
      $scope.currentUser = data;
    });

    $scope.applyAsExpert = function(craftId) {
      var data = {
        userId: $rootScope.decodedToken.user._id,
        craftId: craftId
      };
      CraftService.applyAsExpert(data).then(function(userId) {
        Materialize.toast('You are now an Expert', 4000);
        $location.url("/user/" + userId + '/dashboard');
      }, function(err) {
        console.log(err);
      });
    };

    CraftService.getAll().then(function(data) {
      $scope.allCrafts = data;
    });

    $scope.startLearning = function(craftId) {
      $window.sessionStorage.user = $rootScope.decodedToken.user._id;
      var userId = $window.sessionStorage.user;
      $window.sessionStorage.craft = craftId;
      $location.url('/user/' + userId + '/craft/' + craftId);
    };

    $scope.deleteProfile = function(userId) {
      console.log("time to go dear");
      $window.sessionStorage.user = $rootScope.decodedToken.user._id;
      UserService.deleteUser($rootScope.decodedToken.user._id).then(function(res) {
        Materialize.toast('Profile deleted!', 4000);
        $window.sessionStorage.clear();
        $location.url('/home');
      });
    };

    $timeout(function() {
      CraftService.getExpertCrafts($window.sessionStorage.user).then(function(data) {
        $scope.expertCrafts = data;
      });
    }, 1000);
  }]);
