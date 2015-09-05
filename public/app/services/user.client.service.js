"use strict";

angular.module('pairToLearnApp')
  .factory('UserService', ['$http', 'Upload', 'baseUrl', function($http, Upload, baseUrl) {
    var User = {};
    User.updateProfile = function(id, params) {
      return $http.put(baseUrl + '/users/' + id, params).then(function(res) {
        return res;
      });
    };
    User.getOneUser = function(id) {
      return $http.get(baseUrl + '/users/' + id).then(function(res) {
        return res.data;
      });
    };
    User.markAsComplete = function(id, params) {
      return $http.put(baseUrl + '/users/sessions/' + id, params).then(function(res) {
        return res.data;
      });
    };
    User.deleteUser = function(id) {
      return $http.delete(baseUrl + '/users/' + id).then(function(res) {
        return res.data;
      });
    };
    User.uploadPic = function(file, fields) {
      return Upload.upload({
          url: baseUrl + '/users',
          method: "POST",
          file: file,
          fields: fields
        })
        .then(function(res) {
          return res.data;
        });
    };
    return User;
  }]);
