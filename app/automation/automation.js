/**
 * automation.js
 *
 * A reusable node module for handling base translations and interfacing with
 * the Red Hat Open Innovation Labs Automation API
 *
 * This module provides all base functionality and API client configuration needed to
 * call the Automation API and translate communications back to the UI model.
 */
var automationApi = require('./index');

/**
 * CreateAutomation
 *
 * Translates the Labs Console UI topology model to an Open Innovation Labs Automation
 *
 * This is currently done at the top level of the Automation Model, starting with an Engagement
 * @param topology
 */
module.exports.createAutomation = function(topology){

  return new Promise((resolve, reject) => {
    var engagementApi = new automationApi.EngagementApi();
    var engagement = this.mapTopologyToEngagement(topology);

    if(process.env.AUTOMATION_API_URL){
      //call the EngagementApi to request the topology's creation via our Automation API
      if(topology.engagement_id){
        engagementApi.updateEngagement(topology.engagement_id, {body: engagement}, (err, data, res) => {
          if(err) reject(err);

          //response was successful
          resolve(topology);
        });
      } else {
        engagementApi.addEngagement({body: engagement}, (err, data, res) => {
          if(err) reject(err);

          if(data.location){
            //success, save the engagement location returned for this topology
            //location expected to look like: '/engagements/4'
            var e = data.location.split('/');
            topology.engagement_id = parseInt(e[e.length - 1]);
            topology.save(function(err, topology) {
              if(err) reject(err);
              resolve(topology);
            });
          } else {
            //this shouldn't happen, reject for missing location
            reject('engagement location missing from response');
          }
        });
      }
    } else {
      //this labs-console instance does not have automations enabled, just return the topology without it
      resolve(topology);
    }
  });
};

/**
 * mapTopologyToEngagement
 *
 * Static method to translate the Labs Console UI topology model to an Open Innovation Labs Automation
 *
 * @param topology : a UI topology model
 * @returns engagement: a OIL Engagement model
 */
module.exports.mapTopologyToEngagement = function(topology){

  //create top level engagement
  var engagement = new automationApi.Engagement();

  //create OpenShiftCluster array
  engagement.openshift_clusters = [];

  //create one OpenShift Resource for now
  var open_shift_resource = new automationApi.OpenShiftResources();
  open_shift_resource.projects = [];

  //iterate projects
  for(var i=0; i < topology.project_templates.length; i++){

    if(topology.project_templates[i].type !== 'OpenShift'){
      continue; //ignore any non-OpenShift projects for now
    }

    //iterate stages
    for(var j =0; j < topology.promotion_process.length; j++){

      //current business rule: always treat the first stage as a build stage
      var isBuildStage = j == 0;

      //create Open Shift resources & projects for each stage for now (this could create other resource types in the future)
      var project = new automationApi.Project();
      project.name = topology.project_templates[i].name + '-' + topology.promotion_process[j].name;
      project.display_name = topology.project_templates[i].display_name + ' - ' + topology.promotion_process[j].name.toUpperCase();
      project.environment_type = isBuildStage ? 'build' : 'promotion';

      //project persistent volume claim templates
      if(topology.project_templates[i].persistent_volume_claim_templates
        && topology.project_templates[i].persistent_volume_claim_templates.length){
        project.persistent_volume_claims = [];
        for(var p = 0; p < topology.project_templates[i].persistent_volume_claim_templates.length; p++){
          var persistentVolumeClaim = new automationApi.PersistentVolumeClaim();
          var claim = topology.project_templates[i].persistent_volume_claim_templates[p];
          persistentVolumeClaim.name = this.evalTemplateString(claim.name, topology.promotion_process[j].name, topology.project_templates[i].name, null);
          persistentVolumeClaim.access_modes = claim.access_modes;
          persistentVolumeClaim.storage = claim.storage;

          //volume claim selector
          if(claim.selector && claim.selector.match_labels_templates){
            persistentVolumeClaim.selector = {};
            //clone match_labels_templates
            persistentVolumeClaim.selector.match_labels = JSON.parse(JSON.stringify(claim.selector.match_labels_templates));

            //convert match_label attribute templates keys/values
            for (var property in persistentVolumeClaim.selector.match_labels) {
              if (persistentVolumeClaim.selector.match_labels.hasOwnProperty(property)) {
                persistentVolumeClaim.selector.match_labels[property] =
                  this.evalTemplateString(persistentVolumeClaim.selector.match_labels[property],
                    topology.promotion_process[j].name,
                    topology.project_templates[i].name,
                    null
                  );
              }
            }
          }

          project.persistent_volume_claims.push(persistentVolumeClaim);
        }
      }

      //project app templates
      if(topology.project_templates[i].apps && topology.project_templates[i].apps.length) {
        project.apps = [];

        //iterate apps
        for (var k = 0; k < topology.project_templates[i].apps.length; k++) {
          //create a deep clone of this project's apps
          var application = JSON.parse(JSON.stringify(topology.project_templates[i].apps[k]));

          //business logic to handle build_tool / base_image stage mapping
          if (application.build_tool && application.build_tool !== 'none' && !isBuildStage) {
            //set base_image to the application name of the build app for promotion builds
            application.base_image = application.name;
            //delete build specific properties for promotion builds
            delete application.build_tool;
            delete application.build_application_commands;
            delete application.scm_url;
            delete application.scm_ref;
            delete application.labels;
          }

          //handle route environment mappings by reassigning any {stage} variables
          if (application.routes && application.routes.length) {
            for (var m = 0; m < application.routes.length; m++) {
              for (var property in application.routes[m]) {
                if (application.routes[m].hasOwnProperty(property)) {
                  application.routes[m][property] = this.evalTemplateString(application.routes[m][property],
                    topology.promotion_process[j].name,
                    topology.project_templates[i].name,
                    application.name
                  );
                }
              }
            }
          }

          //convert environment_variables_templates to environment_variables
          if (application.environment_variables_templates) {
            application.environment_variables = application.environment_variables_templates;

            for (var property in application.environment_variables) {
              if(application.environment_variables.hasOwnProperty(property)) {
                application.environment_variables[property] = this.evalTemplateString(application.environment_variables[property],
                  topology.promotion_process[j].name,
                  topology.project_templates[i].name,
                  application.name
                );
              }
            }

            delete application.environment_variables_templates; //no longer needed after mapping
          }

          //convert pvc_association_templates to pvc_associations
          if (application.pvc_association_templates) {
            application.pvc_associations = application.pvc_association_templates;

            for(var t = 0; t < application.pvc_associations.length; t++){
              application.pvc_associations[t].name = this.evalTemplateString(application.pvc_associations[t].name_template,
                topology.promotion_process[j].name,
                topology.project_templates[i].name,
                application.name
              );
              delete application.pvc_associations[t].name_template;

              application.pvc_associations[t].mount_path = this.evalTemplateString(application.pvc_associations[t].mount_path,
                topology.promotion_process[j].name,
                topology.project_templates[i].name,
                application.name
              );

              if(application.pvc_associations[t].claim_type){
                application.pvc_associations[t].claim_type.name = this.evalTemplateString(application.pvc_associations[t].claim_type.name_template,
                  topology.promotion_process[j].name,
                  topology.project_templates[i].name,
                  application.name
                );
                delete application.pvc_associations[t].claim_type.name_template;
              }
            }

            delete application.pvc_association_templates; //no longer needed after mapping
          }

          project.apps.push(application);
        }
      }

      //project role bindings
      if(topology.promotion_process[i].project_role_bindings
        && topology.promotion_process[i].project_role_bindings.length) {
        //map user_to_roles
        project.user_to_role = [];
        for (var l = 0; l < topology.promotion_process[i].project_role_bindings.length; l++) {
          var role_binding = {};
          var binding = topology.promotion_process[i].project_role_bindings[l];
          role_binding.user = {'user_name': binding.user.user_name};
          role_binding.roles = [{'name': binding.role}]; //todo: we'll need to change the UI to support multiple roles if desired

          //push the role binding for this project
          project.user_to_role.push(role_binding);
        }
      }

      //add the project to our open shift resource projects
      open_shift_resource.projects.push(project);
    }
  }

  //create the OC Cluster
  var openshift_cluster = {
    "openshift_resources": open_shift_resource,
    "openshift_host_env": process.env.OPENSHIFT_HOST_ENV || ""
  };

  //push the resource & return our top level engagement
  engagement.openshift_clusters.push(openshift_cluster);

  return engagement;
};

/**
 * Resolves a template string to its concrete form
 */
module.exports.evalTemplateString = function(s, stage, project, app){
  if(s){
    if(stage){
      s = this.evalStage(s, stage);
    }
    if(project){
      s = this.evalProject(s, project);
    }
    if(app){
      s = this.evalApp(s, app);
    }
    return s;
  } else return s;
};

module.exports.evalStage = function(s, stage){
  return s && typeof s === 'string' ? s.replace(/\{stage\}/g, stage) : s;
};

module.exports.evalProject = function(s, project){
  return s && typeof s === 'string' ? s.replace(/\{project_name\}/g, project) : s;
};

module.exports.evalApp = function(s, app){
  return s && typeof s === 'string' ? s.replace(/\{app_name\}/g, app) : s;
};