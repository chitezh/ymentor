"use strict";

var express = require("express"),
  ctrl = require("../controllers/crafts.server.controller.js"),
  router = express.Router();

module.exports = function(app) {
  router.route('/crafts')
    .get(ctrl.findCrafts)
    .post(ctrl.postImage, ctrl.postCraft);


  router.route('/expert/:id/crafts')
    .get(ctrl.viewUserExpertCrafts);

  router.route('/crafts/:id')
    .get(ctrl.findOneCraft)
    .put(ctrl.postImage, ctrl.editCraft)
    .delete(ctrl.deleteOneCraft);

  router.route('/apply/crafts/:id')
    .put(ctrl.applyAsExpert);


  app.use('/', router);
  return router;
};
