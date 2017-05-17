var User = require('../models/User');
var common = require('../common/common');

exports.addUser = function (args, res, next) {
  /**
   * parameters expected in the args:
  * body (User)
  **/
  var newUser = new User();
  newUser.first_name = args.body.first_name;
  newUser.last_name = args.body.last_name;
  newUser.user_name = args.body.user_name;
  newUser.password = args.body.password;
  newUser.email = args.body.email;
  newUser.ssh_public_key = args.body.ssh_public_key;

  newUser.save((err, user) => {
    if (err) return common.handleError(res, err);
    return res.json(201, { user });
  });
};

exports.deleteUser = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  User.findByIdAndRemove({ id: args.params.id }, (err, user) => {
    if (err) return res.send(500, err);
    return res.send(200);
  });
};

exports.updateUser = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (User)
  **/
  User.findById(args.params.id, (err, user) => {
    if (user) {
      user.first_name = args.body.first_name;
      user.last_name = args.body.last_name;
      user.user_name = args.body.user_name;
      user.password = args.body.password;
      user.email = args.body.email;
      user.ssh_public_key = args.body.ssh_public_key;

      user.save((err) => {
        if (err) return validationError(res, err);
        res.send(200);
      });
    }
    else {
      res.send(404);
    }
  });
};

exports.usersGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  **/
  User.find((err, users) => {
    if (err) {
      return common.handleError(res, err);
    }
    return res.json(200, users);
  });
};

exports.usersIdGET = function (args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  User.findById({ id: args.params.id }, (err, user) => {
    if (err) {
      return common.handleError(res, err);
    }
    if (!user) {
      return res.send(404);
    }
    return res.json(user);
  });
};
