var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');
var Builds = require('./Build');

/**
 * RoleBindingSchema
 * @type {mongoose.Schema}
 */
var RoleBindingSchema = new Schema({
  user: { type: Object, required: true },
  role: { type: String, required: true }
});

/**
 * Project Schema
 * @type {mongoose.Schema}
 */
var ProjectSchema = new Schema({
  projectTemplate: { type: Number, ref: 'ProjectTemplate' },
  name: { type: String, required: true },
  display_name: { type: String },
  apps: { type: Array, default: [] },
  persistent_volume_claim_templates: { type: Array, default: [] },
  label: { type: String },
  backgroundColor: { type: String },
  image: { type: String }
});

/**
 * StageSchema
 * @type {mongoose.Schema}
 */
var StageSchema = new Schema({
  name: { type: String, required: true },
  index: { type: Number },
  infrastructure: { type: Number, ref: 'Infrastructure' },
  infrastructureProvider: { type: String },
  infrastructureName: { type: String },
  project_role_bindings: [RoleBindingSchema],
  application_promoters: [],
  projects: [ProjectSchema],
  x: { type: Number },
  y: { type: Number },
  invalid: { type: Boolean },
  selected: { type: Boolean },
  containerNode: { type: Boolean },
  containerNodeDropItemTypes: [String],
  inputConnectors: [],
  validConnectionTypes: []
});

/**
 * InfrastructurePipelineSchema
 * @type {mongoose.Schema}
 */
var InfrastructurePipelineSchema = new Schema(
  {
    name: { type: String, required: true },
    promotion_process: [StageSchema],
    version: { type: Number }
  },
  {
    // http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: {
      createdAt: 'datetime_created',
      updatedAt: 'datetime_modified'
    }
  }
);

InfrastructurePipelineSchema.virtual('id').get(function () {
  return this._id;
});

InfrastructurePipelineSchema.set('toJSON', {
  virtuals: true
});

InfrastructurePipelineSchema.pre('remove', function (next) {
  Builds.remove({ infrastructurePipeline: this._id }, next);
});

InfrastructurePipelineSchema.plugin(
  autoIncrement.plugin,
  'InfrastructurePipeline'
);
module.exports = mongoose.model(
  'InfrastructurePipeline',
  InfrastructurePipelineSchema
);
