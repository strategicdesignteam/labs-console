/**
 * Static client side data model abstraction routines
 */
import constants from '../core/constants';

const selectors = {
  /**
   * Check topology for at least one stage with projects
   */
  hasStageProjects(topology) {
    let stageProjects = false;
    if(topology.project_templates.length && topology.promotion_process.length){
      topology.promotion_process.map(stages => {
        if(stages.projects.length){
          stageProjects = true;
        }
      });
    }    
    return stageProjects;
  },
  /**
   * Check topology for any stage projects w/ non ready infra
   */  
  missingInfra(topology, infrastructures) {
    let missingInfra = [];
    if(topology.project_templates.length && topology.promotion_process.length){
      topology.promotion_process.map(stage => {
        if(stage.projects.length){
          stage.projects.map((stageProject) => {
            let infra = infrastructures.find((infra) => { 
              return infra.id == stageProject.infrastructure
            })
            if(infra && infra.status !== constants.ANSIBLE_JOB_STATUS.SUCCESSFUL){
              missingInfra.push({stage: stage, stageProject: stageProject})
            } else if (!infra) {
              //infra has been deleted
              missingInfra.push({stage: stage, stageProject: stageProject})
            }
          })
        }
      });
    }
    return missingInfra;
  }
};

export default selectors