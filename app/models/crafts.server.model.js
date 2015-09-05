"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var craftSchema = new Schema({
  title: {
    type: String,
    required: "Please, enter the title"
  },
  description: {
    type: String,
    required: "Please, enter the description"
  },
  category: {
    type: String
  },
  smartererlink: {
    type: String
  },
  smartererimagelink: {
    type: String
  },
  createdBy: {
    type: String
  },
  picture: {
    type: String,
    default: 'assets/images/default_learn.jpg'
  },
  experts: [{
    type: Schema.ObjectId,
    ref: 'Users'
  }],
  applicants: []
});

craftSchema.methods.applyAs = function(userId, cb) {
  var experts = this.experts;
  if (experts.indexOf(userId) < 0) {
    this.experts.push(userId);
    this.save(cb);
  } else {
    return cb;
  }
};

mongoose.model('Crafts', craftSchema);
