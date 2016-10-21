/**
 * Static client side data model abstraction routines
 *
 * These will become Redux selectors in a future implementation ;)
 */
const selectors = {
  /**
   * Checks each topology in a list for build status
   */
  isBuildable(topologies) {
    topologies.map((topology) => {
      topology.isBuildable = false;
      if(topology.project_templates.length && topology.promotion_process.length){
        topology.project_templates.map(projects => {
          if(projects.apps.length){
            topology.isBuildable = true;
          }
        });
      }
    });
    return topologies;
  }
};

export default selectors