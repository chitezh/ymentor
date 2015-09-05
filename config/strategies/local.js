"use strict";


require("../../app/models/users.server.model");
var mongoose = require("mongoose"),
    LocalStrategy = require("passport-local").Strategy,
    Users = mongoose.model('Users');

module.exports = function(passport) {
  
  passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, 
  function(req, email, password, done) {
    process.nextTick(function() {
      Users.findOne({'email': email}, function(err, user) {
        if(err) {
          return done(err);
        }

        if(user) {
          return done(null, false, {message: "email already taken"});
        }

        else {
          var newUser = new Users();
          newUser.firstname = req.body.firstname;
          newUser.lastname =  req.body.lastname;
          newUser.phonenumber =  req.body.phonenumber;
          newUser.picture =  req.body.picture;
          newUser.email = email;
          newUser.hashPassword(password);
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

  passport.use('local', new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
  }, 
  function(email, password, done) {
    process.nextTick(function() {
      Users.findOne({'email': email}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }));
}
