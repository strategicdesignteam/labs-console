var basicAuth = require('basic-auth');
var crypto = require('crypto');

var isAuthenticated = function (req) {
  var user = basicAuth(req);
  var username = process.env.ADMIN_USER || 'admin';
  var password = process.env.ADMIN_PASS || 'password';
  var expectedHash = crypto.createHash('md5').update(password).digest('hex');

  return !(!user ||
    user.name !== username ||
    user.pass !== password ||
    req.headers.hash !== expectedHash);
};
module.exports.isAuthenticated = isAuthenticated;

module.exports.basicAuth = function (req, res, next) {
  if (!isAuthenticated(req)) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.send(401);
  }
  else {
    return next();
  }
};

module.exports.login = function (req, res, next) {
  var username = process.env.ADMIN_USER || 'admin';
  var password = process.env.ADMIN_PASS || 'password';

  if (req.body.username === username && req.body.password === password) {
    var hash = crypto.createHash('md5').update(password).digest('hex');
    res.json({
      username: req.body.username,
      password: req.body.password,
      hash
    });
  }
  else {
    res.send(401);
  }
};
