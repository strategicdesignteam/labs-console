var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');

var InfrastructureSchema = new Schema(
  {
    name: { type: String, required: true },
    provider: { type: String, required: true },
    aws_region: { type: String },
    public_hosted_zone: { type: String },
    authenication_provider: { type: String },
    github_client_id: { type: String },
    github_client_secret: { type: String },
    github_organization: { type: String },
    highly_available: { type: Boolean },
    master_nodes: { type: Number },
    compute_nodes: { type: Number },
    ansible_tower_link: { type: String },
    status: { type: String },
    tower_job_id: { type: Number },
    datetime_started: { type: Date },
    datetime_completed: { type: Date },
    destroy_started: { type: Boolean }
  },
  {
    // http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: { updatedAt: 'updated_at' },
    // http://mongoosejs.com/docs/guide.html#versionKey
    versionKey: 'version'
  }
);

InfrastructureSchema.virtual('id').get(function () {
  return this._id;
});

InfrastructureSchema.set('toJSON', {
  virtuals: true
});

InfrastructureSchema.plugin(autoIncrement.plugin, 'Infrastructure');
module.exports = mongoose.model('Infrastructure', InfrastructureSchema);
