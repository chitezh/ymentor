"use strict";

require("../../app/models/users.server.model");
var mongoose = require("mongoose"),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    Users = mongoose.model('Users'),
    config = require('../config');

module.exports = function(passport) {
 
 passport.use(new GoogleStrategy({
    clientID: config.google.consumerKey,
    clientSecret: config.google.consumerSecret,
    callbackURL: "/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      console.log(profile._json.name.givenName);
      Users.findOne({'email': profile._json.emails[0].value}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, user);
        }
        else {
          var newUser = new Users();
          newUser.firstname = profile._json.name.givenName;
          newUser.lastname =  profile._json.name.familyName;
          newUser.picture =  profile._json.image.url;
          newUser.email = profile._json.emails[0].value;
          newUser.hashPassword('google-temp-password-hjdfjdhhj34jjfg//dfFF');
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
