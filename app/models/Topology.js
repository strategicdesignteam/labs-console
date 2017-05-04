var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');
var Builds = require('./Build');

/**
 * Project Schema
 * @type {mongoose.Schema}
 */
var ProjectSchema = new Schema({
  infrastructure: { type: Number, ref: 'Infrastructure' },
  infrastructureProvider: {type: String},
  name: {type: String, required: true},
  display_name: {type: String},
  apps: { type : Array , "default" : [] },
  persistent_volume_claim_templates: { type : Array , "default" : [] }
});

ProjectSchema.virtual('id').get(function(){
  return this._id;
});

ProjectSchema.set('toJSON', {
  virtuals: true
});
ProjectSchema.plugin(autoIncrement.plugin, 'Project');


/**
 * RoleBindingSchema
 * @type {mongoose.Schema}
 */
var RoleBindingSchema = new Schema({
  user: {type: Object, required: true},
  role: {type: String, required: true}
});

RoleBindingSchema.virtual('id').get(function(){
  return this._id;
});

RoleBindingSchema.set('toJSON', {
  virtuals: true
});

RoleBindingSchema.plugin(autoIncrement.plugin, 'RoleBinding');

/**
 * StageSchema
 * @type {mongoose.Schema}
 */
var StageSchema = new Schema({
  name: {type: String, required: true},
  index: {type: Number },
  project_role_bindings: [RoleBindingSchema],
  application_promoters: [],
  projects: [],
  x: {type: Number},
  y: {type: Number},
  invalid: {type: Boolean},
  selected: {type: Boolean},
  containerNode: {type: Boolean},
  containerNodeDropItemTypes: [String],
  inputConnectors: [],
  validConnectionTypes: []
});

StageSchema.virtual('id').get(function(){
  return this._id;
});

StageSchema.set('toJSON', {
  virtuals: true
});
StageSchema.plugin(autoIncrement.plugin, 'Stage');

/**
 * Topology Schema
 * @type {mongoose.Schema}
 */
var TopologySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    project_templates: [ProjectSchema],
    promotion_process: [StageSchema],
    engagement_id: {type: Number},
    version: {type: Number}
  },
  {
    //http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: { createdAt: 'datetime_created', updatedAt: 'datetime_modified' }
  }
);

TopologySchema.virtual('id').get(function(){
  return this._id;
});

TopologySchema.set('toJSON', {
  virtuals: true
});

TopologySchema.pre('remove' , function(next){
  Builds.remove({topology: this._id}, next);
});

TopologySchema.plugin(autoIncrement.plugin, 'Topology');
module.exports = mongoose.model('Topology', TopologySchema);