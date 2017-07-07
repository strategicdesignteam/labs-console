var ProjectTemplate = require('../models/ProjectTemplate');
var common = require('../common/common');

exports.addProjectTemplate = function (args, res, next) {
  /**
   * parameters expected in the args:
  * body (ProjectTemplate)
  **/
  var newProjectTemplate = new ProjectTemplate();
  newProjectTemplate.name = args.body.name;
  newProjectTemplate.display_name = args.body.display_name;
  newProjectTemplate.apps = args.body.apps;
  newProjectTemplate.persistent_volume_claim_templates =
    args.body.persistent_volume_claim_templates;

  newProjectTemplate.save((err, projectTemplate) => {
    if (err) return common.handleError(res, err);
    return res.json(201, { projectTemplate });
  });
};

exports.deleteProjectTemplate = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  ProjectTemplate.findById(args.params.id, (err, projectTemplate) => {
    if (err) return res.send(500, err);
    if (!projectTemplate) {
      return res.send(404);
    }
    // calling remove explicitly so that 'pre' remove middleware fires
    projectTemplate.remove((err) => {
      if (err) return res.send(500, err);
      return res.send(200);
    });
  });
};

exports.updateProjectTemplate = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (ProjectTemplate)
  **/
  ProjectTemplate.findById(args.params.id, (err, projectTemplate) => {
    if (projectTemplate) {
      projectTemplate.name = args.body.name;
      projectTemplate.display_name = args.body.display_name;
      projectTemplate.apps = args.body.apps;
      projectTemplate.persistent_volume_claim_templates =
        args.body.persistent_volume_claim_templates;

      projectTemplate.save((err) => {
        if (err) return common.handleError(res, err);
        res.send(200);
      });
    }
    else {
      res.send(404);
    }
  });
};

exports.projectTemplatesGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  **/
  ProjectTemplate.find()
    .limit(20)
    .sort({ updatedAt: -1 })
    .exec((err, projectTemplates) => {
      if (err) {
        return common.handleError(res, err);
      }
      return res.json(200, projectTemplates);
    });
};

exports.projectTemplatesIdGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/

  ProjectTemplate.findOne({
    _id: args.params.id
  }).exec((err, projectTemplate) => {
    if (err) {
      return common.handleError(res, err);
    }
    return res.json(200, projectTemplate);
  });
};
