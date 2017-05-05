import constants from '../../core/constants';
import labsApi from '../../data/index';

/** A singleton class for handling ToastNotification monitoring */
class ToastNotificationService {
  constructor() {
    this.monitorNotifications = (notifications, callback) => {
      if(constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD & notifications){
        //wait a second for sub components to render & register all notification handlers
        setTimeout(this.pollRunningInfraBuilds(callback), 1000);
      }
    }
  }

  pollRunningInfraBuilds(callback) {
    let infrastructureApi = new labsApi.InfrastructureApi();
    let jobApi = new labsApi.JobApi();

    infrastructureApi.infrastructuresGet((error, infrastructures, res) => {
      if(infrastructures && infrastructures.length) {
        infrastructures.forEach((infrastructure) => {
          if(infrastructure.status === constants.ANSIBLE_JOB_STATUS.PENDING 
            || infrastructure.status === constants.ANSIBLE_JOB_STATUS.RUNNING){

            let interval;
            let checkJobs = () => {
              clearInterval(interval);
              jobApi.jobsIdGet(infrastructure.tower_job_id, (error, job, res) => {
                if(job.status === constants.ANSIBLE_JOB_STATUS.SUCCESSFUL 
                || job.status === constants.ANSIBLE_JOB_STATUS.FAILED 
                || job.status === constants.ANSIBLE_JOB_STATUS.CANCELLED){

                  infrastructure.datetime_completed = job.finished;
                  infrastructure.status = job.status;

                  infrastructureApi.updateInfrastructure(infrastructure.id, {'body': infrastructure}, (e) => {
                    //todo: display an error
                    if (e) console.error(e);

                    //notify all toast listeners w/ registered callbacks
                    callback({
                      notification_type: constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD,
                      data: infrastructure 
                    });
                  });
                } else {
                  //poll running jobs every 10 sec, once they complete, update them & update state
                  interval = setInterval(checkJobs, 10000);
                }
              })
            }
            checkJobs();
          }
        })
      }
    })
  }
}

export default new ToastNotificationService();