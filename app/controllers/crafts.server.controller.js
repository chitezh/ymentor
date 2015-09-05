'use strict';

require('../models/crafts.server.model.js');
var mongoose = require("mongoose"),
  formidable = require("formidable"),
  cloudinary = require("cloudinary"),
  Crafts = mongoose.model('Crafts'),
  config = require('../../config/config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

exports.postImage = function(req, res, next) {
  var forms = new formidable.IncomingForm();
  forms.parse(req, function(err, fields, files) {
    req.body = fields;
    if (files.file) {
      cloudinary.uploader.upload(files.file.path, function(result) {
        req.body.picture = result.url;
        next();
      }, {
        width: 300,
        height: 300
      });
    } else {
      next();
    }
  });
};

exports.postCraft = function(req, res) {
  Crafts.create(req.body, function(err, craft) {
    if (err) {
      return res.status(400).json(err);
    }
    craft.applyAs(req.body.userId,
      function(err, craft) {
        if (err) {
          return res.status(400).json(err);
        }
        console.log("you are now an expert in");
        return res.status(200).json(craft);
      });
  });
};

exports.findCrafts = function(req, res) {
  Crafts.find({}, function(err, crafts) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(crafts);
  });
};

exports.findOneCraft = function(req, res, next) {
  Crafts.findOne({
      _id: req.params.id
    })
    .populate('experts')
    .exec(function(err, craft) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(craft);
    });
};

exports.editCraft = function(req, res) {
  console.log(req.body);
  var craft_id = req.params.id;
  Crafts.update({
      _id: craft_id
    }, {
      title: req.body.title,
      description: req.body.description,
      picture: req.body.picture
    },
    function(err, craft) {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      console.log(craft);
      return res.status(200).json(craft);
    });
};

exports.applyAsExpert = function(req, res, next) {
  Crafts.findOne({
      '_id': req.params.id
    },
    function(err, craft) {
      if (err) {
        return res.json(err);
      }
      craft.applyAs(req.body.userId,
        function(err, crafts) {
          if (err) {
            return res.status(400).json(err);
          }
          return res.status(200).json(req.body.userId);
        });
    });
};

exports.viewUserExpertCrafts = function(req, res, next) {
  Crafts.find({
      'experts': req.params.id
    })
    .exec(function(err, crafts) {
      if (err) {
        return res.json(err);
      }
      return res.json(crafts);

    });
};

exports.deleteOneCraft = function(req, res) {
  var craft_id = req.params.id;
  Crafts.remove({
    _id: craft_id
  }, function(err, craft) {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(craft);
  });
};
