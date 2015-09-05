'use strict';

var mongoose = require("mongoose"),
    config = require('./config');

module.exports = function() {
  var db = mongoose.connect(config.db);
  return db; 
};