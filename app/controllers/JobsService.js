'use strict';
var common = require('../common/common');
var superagent = require('superagent')

exports.addJob = function(args, res, next) {
  superagent
    .post(process.env.TOWER_URL + 'api/v1/workflow_job_templates/' + process.env.TOWER_WORKFLOW_ID + '/launch/')
    .set('Content-Type', 'application/json')
    .send({extra_vers: args.body})
    .on('error', function(err){
      return common.handleError(res, err);
    })
    .end(function(err, response){
      if(err) return common.handleError(response, err);
      res.json(response);
    })
}

exports.jobsIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
   * id (Long)
   **/
  superagent
    .get(process.env.TOWER_URL + 'api/v1/workflow_jobs/' + args.params.id)
    .set('Content-Type', 'application/json')
    .send({extra_vers: args.body})
    .on('error', function(err){
      console.log(err)
    })
    .end(function(err, response){
      if(err) return common.handleError(response, err);
      res.json(200, response);
    })
};