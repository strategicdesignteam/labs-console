var Build = require('../models/Build');
var InfrastructurePipeline = require('../models/InfrastructurePipeline');
var common = require('../common/common');

exports.addBuild = function (args, res, next) {
  /**
   * parameters expected in the args:
  * body (Body)
  **/
  var newBuild = new Build();
  newBuild.infrastructurePipeline = args.body.infrastructurePipelineId;

  InfrastructurePipeline.findById(
    args.body.infrastructurePipelineId,
    (err, infrastructurePipeline) => {
      if (err) {
        return common.handleError(res, err);
      }
      if (!infrastructurePipeline) {
        return res.send(404);
      }

      // increment infrastructurePipeline version on each build
      infrastructurePipeline.version += 1;
      infrastructurePipeline.save((err, infrastructurePipeline) => {
        if (err) return common.handleError(res, err);
        // create Build
        newBuild.infrastructurePipeline_version =
          infrastructurePipeline.version;
        newBuild.infrastructurePipeline_version_key =
          infrastructurePipeline.__v;
        newBuild.number_of_projects = args.body.number_of_projects;
        newBuild.number_of_stages =
          infrastructurePipeline.promotion_process.length;
        newBuild.status = args.body.status;
        newBuild.running_jobs = args.body.runningJobs;
        newBuild.project_jobs = args.body.projectJobs;
        newBuild.datetime_started = args.body.dateTimeStarted;
        newBuild.ansible_tower_url = `https://${process.env.TOWER_HOSTNAME}/#/workflows/`;
        newBuild.save((err, build) => {
          if (err) return common.handleError(res, err);
          res.json({ build });
        });
      });
    }
  );
};

exports.updateBuild = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (Build)
  **/
  Build.findById(args.params.id, (err, build) => {
    if (build) {
      build.datetime_completed = args.body.datetime_completed;
      build.status = args.body.status;
      build.running_jobs = args.body.running_jobs;
      build.project_jobs = args.body.project_jobs;

      build.save((err) => {
        if (err) return common.handleError(res, err);
        res.send(200);
      });
    }
    else {
      res.send(404);
    }
  });
};

exports.buildsGET = function (args, res, next) {
  /**
   * parameters expected in the args:
   **/
  Build.find()
    .populate('infrastructurePipeline')
    .limit(20)
    .sort({ datetime_started: -1, infrastructurePipeline_version_key: -1 })
    .exec((err, builds) => {
      if (err) {
        return common.handleError(res, err);
      }
      return res.json(200, builds);
    });
};

exports.buildsIdGET = function (args, res, next) {
  /**
   * parameters expected in the args:
   * id (Long)
   **/
  Build.findOne({ _id: args.params.id })
    .populate('infrastructurePipeline')
    .exec((err, builds) => {
      if (err) {
        return common.handleError(res, err);
      }
      return res.json(200, builds);
    });
};

exports.deleteBuild = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  Build.findById(args.params.id, (err, build) => {
    if (err) return res.send(500, err);
    if (!build) {
      return res.send(404);
    }
    // calling remove explicitly so that 'pre' remove middleware fires
    build.remove((err) => {
      if (err) return res.send(500, err);
      return res.send(200);
    });
  });
};
