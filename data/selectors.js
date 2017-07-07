/**
 * Static client side data model abstraction routines
 */
import constants from '../core/constants';

const selectors = {
  /**
   * Check infrastructure pipeline for at least one stage with projects
   */
  hasStageProjects(infrastructurePipeline) {
    let stageProjects = false;
    if (infrastructurePipeline.promotion_process.length) {
      infrastructurePipeline.promotion_process.map((stages) => {
        if (stages.projects.length) {
          stageProjects = true;
        }
      });
    }
    return stageProjects;
  },
  /**
   * Check infrastructure pipeline for any stage projects w/ non ready infra
   */
  missingInfra(infrastructurePipeline, infrastructures) {
    const missingInfra = [];
    if (infrastructurePipeline.promotion_process.length) {
      infrastructurePipeline.promotion_process.map((stage) => {
        const infra = infrastructures.find(
          infra => infra.id == stage.infrastructure
        );
        if (infra && infra.status !== constants.ANSIBLE_JOB_STATUS.SUCCESSFUL) {
          missingInfra.push({ stage });
        }
        else if (!infra) {
          // infra has been deleted
          missingInfra.push({ stage });
        }
      });
    }
    return missingInfra;
  }
};

export default selectors;
