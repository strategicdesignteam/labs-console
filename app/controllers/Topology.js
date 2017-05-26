var Topology = require('./TopologyService');

module.exports.addTopology = function addTopology(req, res, next) {
  Topology.addTopology(req, res, next);
};

module.exports.deleteTopology = function deleteTopology(req, res, next) {
  Topology.deleteTopology(req.params, res, next);
};

module.exports.topologiesGET = function topologiesGET(req, res, next) {
  Topology.topologiesGET(req.params, res, next);
};

module.exports.topologiesIdGET = function topologiesIdGET(req, res, next) {
  Topology.topologiesIdGET(req.params, res, next);
};

module.exports.updateTopology = function updateTopology(req, res, next) {
  Topology.updateTopology(req, res, next);
};
