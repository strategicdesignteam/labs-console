var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');

var ImageStreamSchema = new Schema({
    name: {type: String, required: true },
    image_tags: {type: [String], required: true }
  },
  {
    //http://mongoosejs.com/docs/guide.html#versionKey
    versionKey: 'version'
  }
);

ImageStreamSchema.virtual('id').get(function(){
  return this._id;
});

ImageStreamSchema.set('toJSON', {
  virtuals: true
});

ImageStreamSchema.plugin(autoIncrement.plugin, 'ImageStream');
module.exports = mongoose.model('ImageStream', ImageStreamSchema);