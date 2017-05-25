var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');
var Builds = require('./Build');

/**
 * Project Template Schema
 * @type {mongoose.Schema}
 */
var ProjectTemplateSchema = new Schema({
  infrastructure: { type: Number, ref: 'Infrastructure' },
  infrastructureProvider: { type: String },
  infrastructureName: { type: String },
  name: { type: String, required: true },
  display_name: { type: String },
  apps: { type: Array, default: [] },
  persistent_volume_claim_templates: { type: Array, default: [] }
});

/**
 * Project Schema
 * @type {mongoose.Schema}
 */
var ProjectSchema = new Schema({
  infrastructure: { type: Number, ref: 'Infrastructure' },
  projectTemplateIndex: { type: Number },
  infrastructureProvider: { type: String },
  infrastructureName: { type: String },
  name: { type: String, required: true },
  display_name: { type: String },
  apps: { type: Array, default: [] },
  persistent_volume_claim_templates: { type: Array, default: [] },
  label: { type: String },
  backgroundColor: { type: String },
  image: { type: String }
});

/**
 * RoleBindingSchema
 * @type {mongoose.Schema}
 */
var RoleBindingSchema = new Schema({
  user: { type: Object, required: true },
  role: { type: String, required: true }
});


/**
 * StageSchema
 * @type {mongoose.Schema}
 */
var StageSchema = new Schema({
  name: { type: String, required: true },
  index: { type: Number },
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
 * Topology Schema
 * @type {mongoose.Schema}
 */
var TopologySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    project_templates: [ProjectTemplateSchema],
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

TopologySchema.virtual('id').get(function () {
  return this._id;
});

TopologySchema.set('toJSON', {
  virtuals: true
});

TopologySchema.pre('remove', function (next) {
  Builds.remove({ topology: this._id }, next);
});

TopologySchema.plugin(autoIncrement.plugin, 'Topology');
module.exports = mongoose.model('Topology', TopologySchema);
