var common = require('../common/common');
var superagent = require('superagent');
var mockAddJob = require('./mocks/mockAddJob');
var mockJobStatus = require('./mocks/mockJobStatus');

exports.addInfrastructureJob = function (args, res, next) {
  if (process.env.TOWER_URL) {
    var url = `${process.env.TOWER_URL}api/v1/workflow_job_templates/${process.env.ADD_INFRA_WORKFLOW_ID}/launch/`;
    post(url, args, res, next);
  }
  else {
    // return dummy response for UI if TOWER_URL not configured...
    res.json(mockAddJob.mock);
  }
};

exports.destroyInfrastructureJob = function (args, res, next) {
  if (process.env.TOWER_URL) {
    var url = `${process.env.TOWER_URL}api/v1/workflow_job_templates/${process.env.DESTROY_INFRA_WORKFLOW_ID}/launch/`;
    post(url, args, res, next);
  }
  else {
    // return dummy response for UI if TOWER_URL not configured...
    res.json(mockAddJob.mock);
  }
};

exports.addProjectJob = function (args, res, next) {
  if (process.env.TOWER_URL) {
    var url = `${process.env.TOWER_URL}api/v1/workflow_job_templates/${process.env.ADD_PROJECT_WORKFLOW_ID}/launch/`;
    post(url, args, res, next);
  }
  else {
    // return dummy response for UI if TOWER_URL not configured...
    res.json(mockAddJob.mock);
  }
};

exports.insightsRemediateJob = function (args, res, next) {
  console.log(args.body.infrastructureId);
  if (process.env.TOWER_URL) {
    var url = `${process.env.TOWER_URL}api/v1/workflow_job_templates/${process.env.REMEDIATE_INSIGHTS_WORKFLOW_ID}/launch/`;
    post(url, args, res, next);
  }
  else {
    // return dummy response for UI if TOWER_URL not configured...
    res.json(mockAddJob.mock);
  }
};

function post(url, args, res, next) {
  superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send({ extra_vars: args.body })
    .on('error', err => common.handleError(res, err))
    .end((err, response) => {
      var data = JSON.parse(response.text);
      if (err) return common.handleError(response, err);
      res.json(data);
    });
}

exports.jobsIdGET = function (args, res, next) {
  /**
   * parameters expected in the args:
   * id (Long)
   **/
  if (process.env.TOWER_URL) {
    superagent
      .get(`${process.env.TOWER_URL}api/v1/workflow_jobs/${args.params.id}`)
      .set('Content-Type', 'application/json')
      .send({ extra_vars: args.body })
      .on('error', (err) => {
        console.log(err);
      })
      .end((err, response) => {
        if (err) return common.handleError(response, err);
        var data = JSON.parse(response.text);
        res.json(200, data);
      });
  }
  else {
    // return dummy response for UI if TOWER_URL not configured...
    res.json(mockJobStatus.mock);
  }
};
