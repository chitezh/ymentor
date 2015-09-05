'use strict';

var express = require("express"),
    morgan  = require("morgan"),
    bodyParser = require("body-parser"),
    passport = require("passport");

module.exports = function() {
  var app = express();

  if(process.env.NODE_ENV ===  'development') {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ 
    extended: true 
  }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  
  app.use(express.static('./public/'));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, Accept, Content-Type, Access-Control-Allow-Headers, x_access_admin, Authorization, X-Requested-With");
    res.header('Access-Control-Allow-Methods', "POST, PUT, DELETE, GET");
    next();
  });

  require('./passport')(passport);
  require("../app/routes/crafts.server.route")(app);
  require("../app/routes/users.server.route")(app, passport);

  return app;
};