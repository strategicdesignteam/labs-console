var Infrastructure = require('./InfrastructureService');

module.exports.addInfrastructure = function addInfrastructure(req, res, next) {
  Infrastructure.addInfrastructure(req, res, next);
};

module.exports.deleteInfrastructure = function deleteInfrastructure(
  req,
  res,
  next
) {
  Infrastructure.deleteInfrastructure(req.params, res, next);
};

module.exports.updateInfrastructure = function updateInfrastructure(
  req,
  res,
  next
) {
  Infrastructure.updateInfrastructure(req, res, next);
};

module.exports.infrastructuresGET = function infrastructuresGET(
  req,
  res,
  next
) {
  Infrastructure.infrastructuresGET(req.params, res, next);
};

module.exports.infrastructuresIdGET = function infrastructuresIdGET(
  req,
  res,
  next
) {
  Infrastructure.infrastructuresIdGET(req.params, res, next);
};
