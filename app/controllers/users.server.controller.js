"use strict";

require('../models/users.server.model.js');
var passport = require("passport"),
  formidable = require("formidable"),
  cloudinary = require("cloudinary"),
  jwt = require('jsonwebtoken'),
  mongoose = require("mongoose"),
  Users = mongoose.model('Users'),
  Crafts = mongoose.model('Crafts'),
  config = require('../../config/config'),
  nodemailer = require('nodemailer');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});


var generateJWT = function(user) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var token = jwt.sign({
      user: user,
      exp: parseInt(exp.getTime() / 1000),
    },
    config.jwtSecret
  );
  return token;
};


exports.getImage = function(req, res, next) {
  var forms = new formidable.IncomingForm();
  forms.parse(req, function(err, fields, files) {
    req.body = fields;
    cloudinary.uploader.upload(files.file.path, function(result) {
      req.body.picture = result.url;
      next();
    }, {
      width: 300,
      height: 300
    });
  });
};

exports.authCallBack = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect('/#/login');
      } else {
        var token = generateJWT(user);
        res.redirect('/#/user/' + user._id + '?token=' + token);
      }
    })(req, res, next);
  };
};

exports.findOne = function(req, res) {
  var user_id = req.params.id;
  Users.findOne({
    _id: user_id
  }, function(err, user) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(user);
  });
};

exports.findAll = function(req, res) {
  Users.find({}, function(err, users) {
    if (err) {
      return res.status(400).json(err);
    }
    res.send(users);
  });
};
// End of custom find methods

exports.editImage = function(req, res) {
  var user_id = req.body._id;
  var new_user = req.body;
  Users.update({
      _id: user_id
    }, {
      picture: req.body.picture
    },
    function(err, user) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({
        token: generateJWT(new_user),
        user: new_user
      });
    });
};

exports.editProfile = function(req, res) {
  var user_id = req.params.id;
  Users.update({
    _id: user_id
  }, req.body, function(err, data) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      token: generateJWT(req.body),
      user: req.body
    });
  });
};

exports.editSession = function(req, res) {
  var user_id = req.params.id;
  var sessionId = req.body.sessionId;
  console.log(sessionId);
  Users.update({
      'sessions.sessionId': sessionId
    }, {
      '$set': {
        'sessions.$.status': 'completed'
      }
    }, {
      multi: true
    },
    function(err, numAffected) {
      if (err) {
        return res.status(400).json(err);
      }
      console.log(numAffected);
      return res.status(200).json(numAffected);
    });
};

exports.deleteOneUser = function(req, res) {
  var user_id = req.params.id;
  Users.remove({
    _id: user_id
  }, req.body, function(err, data) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(data);
  });
};

exports.sendMail = function(req, res) {
  var userId = req.body.userId,
    craftId = req.body.craftId,
    expertId = req.body.expertId,
    sessionId = userId + '-' + craftId,
    sessionData = req.body.sessionData;
  console.log(sessionData, 'request');
  Users.findOne({
      _id: expertId
    },
    function(err, expert) {
      if (err) {
        return res.status(400).json(err);
      }
      var expertMail = expert.email;
      var expertName = expert.firstname;
      var adminMail = 'Andela <admin@p2l.com>';
      var transporter = nodemailer.createTransport();

      var mailBody = {
        from: adminMail,
        to: expertMail,
        subject: 'Pairing Session',
        html: "<div style='text-align:justify'>Hi " + expertName + ", \n A user has requested to pair with you \n Pairing details is as follows: \n Date: " + sessionData.date + " \nTime: " + sessionData.time + "\nDescription: " + sessionData.description + " \nPlease, click on this link anytime to pair:</div>" + "http://pairtolearn.herokuapp.com/#/user/pair/" + sessionId
      };

      transporter.sendMail(mailBody, function(err, message) {
        if (err) {
          console.log(err, 'error');
        } else {
          console.log('Message sent:' + message);
          Users.findOne({
            _id: userId
          }, function(err, user) {
            console.log('this is user:', user, 'and session', sessionId);
            user.saveSession(sessionId, function(err, userData) {
              console.log(userData);
              return res.status(200).json({
                user: user,
                i: message
              });
            });
          });
        }
      });
    });
};

exports.deleteOneUser = function(req, res) {
  var user_id = req.params.id;
  Users.remove({
    _id: user_id
  }, function(err, user) {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(user);
  });
};
