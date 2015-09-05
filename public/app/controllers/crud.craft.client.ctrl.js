"use strict";

angular.module('pairToLearnApp')
  .controller('CRUDCraftCtrl', ['CraftService', '$scope', '$location', '$timeout', '$rootScope', '$window', '$routeParams', '$route', function(CraftService, $scope, $location, $timeout, $rootScope, $window, $routeParams, $route) {

    $scope.createCraft = function(craft) {
      if (!craft) {
        return;
      }
      var user = $rootScope.decodedToken.user.firstname + " " + $rootScope.decodedToken.user.lastname;
      craft.createdBy = user;
      craft.userId = $rootScope.decodedToken.user._id;
      CraftService.createCraft(craft.picture, craft).then(function(data) {
        $rootScope.craft = data;
        Materialize.toast('Craft created successfully!', 4000);
        $location.url("/admin/" + "crafts");
      }, function(err) {
        return err;
      });
    };

    if ($routeParams.hasOwnProperty("id")) {
      $scope.craft_id = $routeParams.id;
      CraftService.getOneCraft($scope.craft_id).then(function(data) {
        $scope.craft = data;
      }, function(err) {
        return err;
      });
    }

    $scope.updateCraft = function(craft) {
      CraftService.updateCraft(craft._id, craft).then(function(data) {
        $rootScope.craft = data;
        Materialize.toast('Craft updated successfully!', 4000);
        $location.url("/admin/" + "crafts");
      }, function(err) {
        return err;
      });
    };

    $scope.deleteCraft = function(craftId) {
      $window.sessionStorage.craft = $scope.craft._id;
      CraftService.deleteCraft($scope.craft._id).then(function(data) {
        Materialize.toast('Craft deleted!', 4000);
        $location.url("/admin/" + "crafts");
        $route.reload();
      });
    };

  }]);
