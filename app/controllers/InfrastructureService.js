var Infrastructure = require('../models/Infrastructure');
var RedHatInsightsService = require('./RedHatInsightsService');
var constants = require('../../core/constants');
var common = require('../common/common');

exports.addInfrastructure = function (args, res, next) {
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
  newInfrastructure.rh_insights_enabled = args.body.rh_insights_enabled;
  newInfrastructure.rh_cloudforms_enabled = args.body.rh_cloudforms_enabled;

  newInfrastructure.save((err, infrastructure) => {
    if (err) return common.handleError(res, err);
    return res.json(201, { infrastructure });
  });
};

exports.deleteInfrastructure = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  Infrastructure.findById(args.params.id, (err, infrastructure) => {
    if (err) return res.send(500, err);
    if (!infrastructure) {
      return res.send(404);
    }
    // calling remove explicitly so that 'pre' remove middleware fires
    infrastructure.remove((err) => {
      if (err) return res.send(500, err);
      return res.send(200);
    });
  });
};

exports.updateInfrastructure = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (Infrastructure)
  **/
  Infrastructure.findById(args.params.id, (err, infrastructure) => {
    if (infrastructure) {
      infrastructure.status = args.body.status;
      infrastructure.datetime_completed = args.body.datetime_completed;
      infrastructure.destroy_started = args.body.destroy_started;
      infrastructure.ansible_tower_link =  `https://${process.env.TOWER_HOSTNAME}/#/workflows/${args.body.tower_job_id}#followAnchor`;
      infrastructure.tower_job_id = args.body.tower_job_id;
      infrastructure.rh_insights_status = args.body.rh_insights_status;
      if (
        infrastructure.rh_insights_enabled &&
        infrastructure.status ===
          constants.default.ANSIBLE_JOB_STATUS.SUCCESSFUL
      ) {
        // if insights job is running, just update and return the insights job link
        if (
          infrastructure.rh_insights_status ===
            constants.default.ANSIBLE_JOB_STATUS.PENDING ||
          infrastructure.rh_insights_status ===
            constants.default.ANSIBLE_JOB_STATUS.RUNNING
        ) {
          infrastructure.rh_insights_tower_job_id =
            args.body.rh_insights_tower_job_id;
          infrastructure.rh_insights_tower_job_link = args.body
            .rh_insights_tower_job_id
            ? `https://${process.env.TOWER_HOSTNAME}/#/workflows/${args.body.rh_insights_tower_job_id}#followAnchor`
            : '';
          saveInfra(infrastructure);
        }
        else {
          try{
            // An insights job is not running, and the infrastructure is deployed successfully. Let's query the insights report
            RedHatInsightsService.getInsightsReportForGroup(
              infrastructure,
              (err, report) => {
                if (err) console.log(err);
                console.log(report);
                infrastructure.rh_insights_report = report;
                saveInfra(infrastructure);
              }
            );
          } catch(err){
            //log Insights errors to console
            console.log(err);

            //continue saving and move forward
            saveInfra(infrastructure);
          }
        }
      }
      else {
        saveInfra(infrastructure);
      }
    }
    else {
      res.send(404);
    }
  });

  function saveInfra(infrastructure) {
    infrastructure.save((err) => {
      if (err) return common.handleError(res, err);
      res.send(200);
    });
  }
};

exports.infrastructuresGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  **/
  Infrastructure.find()
    .limit(20)
    .sort({ datetime_started: -1 })
    .exec((err, infrastructures) => {
      if (err) {
        return common.handleError(res, err);
      }
      return res.json(200, infrastructures);
    });
};

exports.infrastructuresIdGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/

  Infrastructure.findOne({
    _id: args.params.id
  }).exec((err, infrastructure) => {
    if (err) {
      return common.handleError(res, err);
    }
    return res.json(200, infrastructure);
  });
};
