var Build = require('./BuildService');

module.exports.addBuild = function addBuild(req, res, next) {
  Build.addBuild(req, res, next);
};

module.exports.deleteBuild = function deleteBuild(req, res, next) {
  Build.deleteBuild(req.params, res, next);
};

module.exports.updateBuild = function updateBuild(req, res, next) {
  Build.updateBuild(req, res, next);
};

module.exports.buildsGET = function buildsGET(req, res, next) {
  Build.buildsGET(req.params, res, next);
};

module.exports.buildsIdGET = function buildsIdGET(req, res, next) {
  Build.buildsIdGET(req.params, res, next);
};
