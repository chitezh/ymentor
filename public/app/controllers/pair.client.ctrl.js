'use strict';

angular.module('pairToLearnApp')
  .controller('PairCtrl', ['$rootScope', '$scope', '$timeout', '$location', '$window', 'UserService', 'CraftService', '$routeParams', function($rootScope, $scope, $timeout, $location, $window, UserService, CraftService, $routeParams) {
    (function($) {
      $(function() {
        $('.parallax').parallax();
        $('.collapsible').collapsible({
          accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
    })(jQuery);

    var userId = $window.sessionStorage.user;
    console.log(userId)
    var sessionId = $routeParams.sessionId;
    //get user information
    UserService.getOneUser(userId).then(function(data) {
      console.log(data)
      $scope.firstname = data.firstname;
      editor();
      $scope.counter = data.minutes * 60;
    });
    //get craft information
    var craftId = sessionId.split('-')[1];
    CraftService.getOneCraft(craftId).then(function(data) {
      $scope.craftData = data;
    }, function(err) {
      return err;
    });

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
    mytimeout = $timeout($scope.onTimeout, 1000);

    $scope.stopTimer = function() {
      $scope.$broadcast('timer-stopped', $scope.counter);
      // $scope.counter= ;
      $timeout.cancel(mytimeout);
      $location.url('/mycrafts');
    };
    $scope.$on('timer-stopped', function(event, remaining) {
      if (remaining === 0) {
        alert('your time ran out!');
      }
    });

    var firepadRef = new Firebase('https://pairtolearn.firebaseio.com/' + sessionId);

    function editor() {
      var user = $scope.firstname;
      var expert = $window.sessionStorage.expert;

      //// Create FirepadUserList (with our desired userId).
      var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
        document.getElementById('userlist'), user, user);

      //// Create CodeMirror (with line numbers and the JavaScript mode).
      function javaScript() {
        var codeMirror2 = CodeMirror(document.getElementById('firepad'), {
          lineNumbers: true,
          mode: 'javascript'
        });
        var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror2, {
          userId: user
        });
      }

      function richText() {
          //RichText
          var codeMirror = CodeMirror(document.getElementById('firepad'), {
            lineWrapping: true
          });

          var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
            userId: user,
            defaultText: 'Type Live text here',
            richTextShortcuts: true,
            richTextToolbar: true
          });
        }
        //javaScript();
      richText();
    }
  }]);
