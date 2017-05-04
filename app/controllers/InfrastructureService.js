'use strict';
var Infrastructure = require('../models/Infrastructure');
var common = require('../common/common');

exports.addInfrastructure = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (Infrastructure)
  **/
  var newInfrastructure = new Infrastructure();
  newInfrastructure.name = args.body.name;
  newInfrastructure.provider = args.body.provider;
  newInfrastructure.aws_region = args.body.aws_region;
  newInfrastructure.public_hosted_zone = args.body.public_hosted_zone;
  newInfrastructure.authenication_provider = args.body.authenication_provider;
  newInfrastructure.github_client_id = args.body.github_client_id;
  newInfrastructure.github_client_secret = args.body.github_client_secret;
  newInfrastructure.github_organization = args.body.github_organization;
  newInfrastructure.highly_available = args.body.highly_available;
  newInfrastructure.master_nodes = args.body.master_nodes;
  newInfrastructure.compute_nodes = args.body.compute_nodes;
  newInfrastructure.ansible_tower_link = 'https://tower.strategicdesign.io/#/workflows/' + 
      args.body.tower_job_id + '#followAnchor';
  newInfrastructure.status = args.body.status;
  newInfrastructure.tower_job_id = args.body.tower_job_id;
  newInfrastructure.datetime_started = args.body.datetime_started;
  newInfrastructure.datetime_completed = args.body.datetime_completed;

  newInfrastructure.save(function(err, infrastructure) {
    if (err) return common.handleError(res, err);
    return res.json(201, { infrastructure: infrastructure });
  });
};

exports.deleteInfrastructure = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  Infrastructure.findById(args.params.id, function(err, infrastructure) {
    if(err) return res.send(500, err);
    if(!infrastructure) { return res.send(404); }
    //calling remove explicitly so that 'pre' remove middleware fires
    infrastructure.remove(function(err){
      if(err) return res.send(500, err);
      return res.send(200);
    });
  });
};

exports.updateInfrastructure = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (Infrastructure)
  **/
  Infrastructure.findById(args.params.id, function (err, infrastructure) {
    if(infrastructure) {
      infrastructure.status = args.body.status;
      infrastructure.datetime_completed = args.body.datetime_completed;

      infrastructure.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(404);
    }
  });
};

exports.infrastructuresGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  Infrastructure.find()
    .limit(20)
    .sort({ datetime_started: -1 })
    .exec(function (err, infrastructures) {
      if(err) { return common.handleError(res, err); }
      return res.json(200, infrastructures);
    });
};

exports.infrastructuresIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  console.log("ID:")
  console.log(args.params.id);

  Infrastructure.findOne({_id: args.params.id})
    .exec(function (err, infrastructure) {
      if(err) { return common.handleError(res, err); }
      return res.json(200, infrastructure);
    }); 
};
