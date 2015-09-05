"use strict";

angular.module('pairToLearnApp')
  .factory('SessionService', ['$http', 'baseUrl', function($http, baseUrl) {
    var Session = {};

    Session.sendMail = function(userId, craftId, expertId, sessionData) {
      var mailDetails = {
        userId: userId,
        craftId: craftId,
        expertId: expertId,
        sessionData: sessionData
      };
      return $http.post(baseUrl + '/mail', mailDetails).then(function(res) {
        return res.data;
      });
    };

    return Session;
  }]);
