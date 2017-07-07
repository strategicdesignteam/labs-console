var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');

var BuildSchema = new Schema(
  {
    infrastructurePipeline: { type: Number, ref: 'InfrastructurePipeline' },
    infrastructurePipeline_version: { type: Number, required: true },
    infrastructurePipeline_version_key: { type: Number },
    number_of_projects: { type: Number, required: true },
    number_of_stages: { type: Number, required: true },
    status: { type: String },
    running_jobs: { type: Array },
    project_jobs: { type: Object },
    datetime_started: { type: Date },
    datetime_completed: { type: Date },
    ansible_tower_url: { type: String }
  },
  {
    // http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: { updatedAt: 'updated_at' },
    // http://mongoosejs.com/docs/guide.html#versionKey
    versionKey: 'version'
  }
);

BuildSchema.virtual('id').get(function () {
  return this._id;
});

BuildSchema.set('toJSON', {
  virtuals: true
});

BuildSchema.plugin(autoIncrement.plugin, 'Build');
module.exports = mongoose.model('Build', BuildSchema);
