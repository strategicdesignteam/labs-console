'use strict';
var Build = require('../models/Build');
var Topology = require('../models/Topology');
var common = require('../common/common');
var automation = require('../automation/automation');

exports.addBuild = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (Body)
  **/
  var newBuild = new Build();
  newBuild.topology = args.body.topologyId;

  Topology.findById(args.body.topologyId, function (err, topology) {
    if(err) { return common.handleError(res, err); }
    if(!topology) { return res.send(404); }

    //call the Automation API - if successful, create a new Build entry, if not, ignore and return
    // automation.createAutomation(topology).then((data) => {

    // }).catch((err) => {
    //   //error creating the automation
    //   return common.handleError(res, err);
    // });

    //create Build
    newBuild.topology_version = topology.version;
    newBuild.datetime_started = args.body.dateTimeStarted;
    newBuild.status = 'pending';
    newBuild.ansible_tower_link  = 'https://tower.strategicdesign.io/'; //default this for now
    newBuild.number_of_projects = topology.project_templates.length;
    newBuild.number_of_stages = topology.promotion_process.length;
    newBuild.tower_job_id = args.body.towerJobId;

    newBuild.save(function(err, build) {
      if (err) return common.handleError(res, err);
      res.json({ build: build });
    });
  });
};

exports.updateBuild = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (Build)
  **/
  Build.findById(args.params.id, function (err, build) {
    if(build) {
      build.datetime_completed = args.body.datetime_completed;
      build.status = args.body.status;

      build.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(404);
    }
  });
};

exports.buildsGET = function(args, res, next) {
  /**
   * parameters expected in the args:
   **/
  Build.find()
    .populate('topology')
    .limit(20)
    .sort({ datetime_started: -1 })
    .exec(function (err, builds) {
      if(err) { return common.handleError(res, err); }
      return res.json(200, builds);
    });
};

exports.buildsIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
   * id (Long)
   **/
  Build.findOne({_id: args.params.id})
    .populate('topology')
    .exec(function (err, builds) {
      if(err) { return common.handleError(res, err); }
      return res.json(200, builds);
    });
};

exports.downloadEngagement = function(args, res, next) {
  /**
   * Temporary method to manually construct engagement JSON and download it to client
   */
  Topology.findById(args.params.id, function (err, topology) {
    if(err) { return common.handleError(res, err); }
    if(!topology) { return res.send(404); }

    //call the Automation API - if successful, create a new Build entry, if not, ignore and return
    automation.createAutomation(topology).then((data) => {
      res.json({ engagement: data.engagement });
    }).catch((err) => {
      //error creating the automation
      return common.handleError(res, err);
    });
  });
};