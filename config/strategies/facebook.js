"use strict";

require("../../app/models/users.server.model");
var mongoose = require("mongoose"),
    FacebookStrategy = require('passport-facebook').Strategy,
    Users = mongoose.model('Users'),
    config = require('../config');

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
    clientID:  config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: "/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'displayName', 'gender', 'email', 'first_name', 'last_name', 'photos'],
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      Users.findOne({'email': profile._json.email}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, user);
        }
        else {
          console.log(profile._json);
          var newUser = new Users();
          newUser.firstname = profile._json.first_name;
          newUser.lastname =  profile._json.last_name;
          newUser.picture =  profile._json.picture.data.url;
          newUser.email = profile._json.email;
          newUser.hashPassword('temp-facebook-password-dfjkdfgjfdghalhj');
          newUser.save(function(err) {
            if(err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
}