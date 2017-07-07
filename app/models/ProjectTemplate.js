var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');

var ProjectTemplateSchema = new Schema(
  {
    name: { type: String, required: true },
    display_name: { type: String },
    apps: { type: Array, default: [] },
    persistent_volume_claim_templates: { type: Array, default: [] }
  },
  {
    // http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: { updatedAt: 'updated_at' },
    // http://mongoosejs.com/docs/guide.html#versionKey
    versionKey: 'version'
  }
);

ProjectTemplateSchema.virtual('id').get(function () {
  return this._id;
});

ProjectTemplateSchema.set('toJSON', {
  virtuals: true
});

ProjectTemplateSchema.plugin(autoIncrement.plugin, 'ProjectTemplate');
module.exports = mongoose.model('ProjectTemplate', ProjectTemplateSchema);
