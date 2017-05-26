var User = require('./UserService');

module.exports.addUser = function addUser(req, res, next) {
  User.addUser(req, res, next);
};

module.exports.deleteUser = function deleteUser(req, res, next) {
  User.deleteUser(req.params, res, next);
};

module.exports.updateUser = function updateUser(req, res, next) {
  User.updateUser(req, res, next);
};

module.exports.usersGET = function usersGET(req, res, next) {
  User.usersGET(req.params, res, next);
};

module.exports.usersIdGET = function usersIdGET(req, res, next) {
  User.usersIdGET(req.params, res, next);
};
