'use strict';
var Topology = require('../models/Topology');
var common = require('../common/common');

exports.addTopology = function(args, res, next) {
  /**
   * parameters expected in the args:
   * body (ApplicationTopology)
   **/
  var newToplogy = new Topology();
  newToplogy.name = args.body.name;
  newToplogy.description = args.body.description || '';
  newToplogy.project_templates = args.body.project_templates || [];
  newToplogy.promotion_process = args.body.promotion_process || [];
  newToplogy.version = 0;

  newToplogy.save(function(err, topology) {
    if (err) return common.handleError(res, err);
    return res.json(201, { topology: topology });
  });
};

exports.deleteTopology = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  Topology.findById(args.params.id, function(err, topology) {
    if(err) return res.send(500, err);
    if(!topology) { return res.send(404); }
    //calling remove explicitly so that 'pre' remove middleware fires
    topology.remove(function(err){
      if(err) return res.send(500, err);
      return res.send(200);
    });
  });
};

exports.topologiesGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  Topology.find({}).sort('-datetime_modified').exec(function (err, topologies) {
    if(err) { return common.handleError(res, err); }
    return res.json(200, topologies);
  });
};

exports.topologiesIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  Topology.findById(args.params.id, function (err, topology) {
    if(err) { return common.handleError(res, err); }
    if(!topology) { return res.send(404); }
    return res.json(topology);
  });
};

exports.updateTopology = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (ApplicationTopology)
  **/
  Topology.findById(args.params.id, function (err, topology) {
    if(topology) {
      topology.name = args.body.name;
      topology.description = args.body.description || '';
      topology.project_templates = args.body.project_templates || [];
      topology.promotion_process = args.body.promotion_process || [];
      topology.engagement_id = args.body.engagement_id || "";

      topology.save(function(err) {
        if (err) return common.handleError(res, err);
        res.send(200);
      });
    } else {
      res.send(404);
    }
  });
};

