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
    automation.createAutomation(topology).then((data) => {
      //create Build
      newBuild.topology_version = topology.version;
      newBuild.status = 'started';
      newBuild.ansible_tower_link  = 'http://ansible.com'; //default this for now
      newBuild.number_of_projects = topology.project_templates.length;
      newBuild.number_of_stages = topology.promotion_process.length;

      newBuild.save(function(err, build) {
        if (err) return common.handleError(res, err);
        res.json({ build: build });
      });
    }).catch((err) => {
      //error creating the automation
      return common.handleError(res, err);
    });
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

