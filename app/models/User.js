var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');
var crypto = require('crypto');

var UserSchema = new Schema({
    first_name: {type: String, required: true },
    last_name: {type: String, required: true },
    user_name: { type: String, required: true },
    //only storing password for our prototype...
    password: { type: String, required: true },
    hashedPassword: { type: String },
    salt: { type: String },
    email: { type: String, lowercase:true, required: true },
    ssh_public_key: { type: String }
  },
  {
    //http://mongoosejs.com/docs/guide.html#versionKey
    versionKey: 'version'
  }
);

UserSchema.methods = {
  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

/**
 * Validations
 */

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'This email is already registered.');

/**
 * Pre Save
 */
UserSchema
  .pre('save', function(next){
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(this.password);
    next();
  });

UserSchema.virtual('id').get(function(){
  return this._id;
});

UserSchema.set('toJSON', {
  virtuals: true
});

UserSchema.plugin(autoIncrement.plugin, 'User');
module.exports = mongoose.model('User', UserSchema);