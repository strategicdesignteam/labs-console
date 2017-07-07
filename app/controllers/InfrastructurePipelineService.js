var InfrastructurePipeline = require('../models/InfrastructurePipeline');
var common = require('../common/common');

exports.addInfrastructurePipeline = function (args, res, next) {
  /**
   * parameters expected in the args:
  * body (InfrastructurePipeline)
  **/
  var newInfrastructurePipeline = new InfrastructurePipeline();
  newInfrastructurePipeline.name = args.body.name;
  newInfrastructurePipeline.promotion_process = args.body.promotion_process;
  newInfrastructurePipeline.version = 0;

  newInfrastructurePipeline.save((err, infrastructurePipeline) => {
    if (err) return common.handleError(res, err);
    return res.json(201, { infrastructurePipeline });
  });
};

exports.deleteInfrastructurePipeline = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  InfrastructurePipeline.findById(
    args.params.id,
    (err, infrastructurePipeline) => {
      if (err) return res.send(500, err);
      if (!infrastructurePipeline) {
        return res.send(404);
      }
      // calling remove explicitly so that 'pre' remove middleware fires
      infrastructurePipeline.remove((err) => {
        if (err) return res.send(500, err);
        return res.send(200);
      });
    }
  );
};

exports.updateInfrastructurePipeline = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (InfrastructurePipeline)
  **/
  InfrastructurePipeline.findById(
    args.params.id,
    (err, infrastructurePipeline) => {
      if (infrastructurePipeline) {
        infrastructurePipeline.name = args.body.name;
        infrastructurePipeline.promotion_process = args.body.promotion_process;

        infrastructurePipeline.save((err) => {
          if (err) return common.handleError(res, err);
          res.send(200);
        });
      }
      else {
        res.send(404);
      }
    }
  );
};

exports.infrastructurePipelinesGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  **/
  InfrastructurePipeline.find()
    .limit(20)
    .sort({ datetime_started: -1 })
    .exec((err, infrastructurePipelines) => {
      if (err) {
        return common.handleError(res, err);
      }
      return res.json(200, infrastructurePipelines);
    });
};

exports.infrastructurePipelinesIdGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/

  InfrastructurePipeline.findOne({
    _id: args.params.id
  }).exec((err, infrastructurePipeline) => {
    if (err) {
      return common.handleError(res, err);
    }
    return res.json(200, infrastructurePipeline);
  });
};
