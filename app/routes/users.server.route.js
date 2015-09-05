"use strict";

var express = require("express"),
  passport = require("passport"),
  ctrl = require("../controllers/users.server.controller"),
  router = express.Router();

module.exports = function(app, passport) {
  //local
  router.route('/signup')
    .post(ctrl.authCallBack('local-signup'));
  router.route('/login')
    .post(ctrl.authCallBack('local'));

  //google
  router.route('/auth/google')
    .get(passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));
  router.route('/auth/google/callback')
    .get(ctrl.authCallBack('google'));

  //facebook
  router.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
  router.route('/auth/facebook/callback')
    .get(ctrl.authCallBack('facebook'));

  //Route to get all users in the db.
  router.route('/users')
    .get(ctrl.findAll)
    .post(ctrl.getImage, ctrl.editImage);

  router.route('/users/:id')
    .get(ctrl.findOne)
    .put(ctrl.editProfile)
    .delete(ctrl.deleteOneUser);

  //session complete
  router.route('/users/sessions/:id')
    .put(ctrl.editSession);

  //mail
  router.route('/mail')
    .post(ctrl.sendMail);

  //wallet
  router.route('/wallet/success')
    .post(function(req, res, next) {
      console.log(req);
      return res.redirect('/#/wallet/success?trans_id=' + req.body.transaction_id);
    });
  router.route('/wallet/fail')
    .post(function(req, res, next) {
      console.log(req.body);
      return res.redirect('/#/wallet/fail?trans_id=' + req.body.transaction_id);
    });
  // End of custom route

  app.use('/', router);

  return router;
};
