import constants from '../../core/constants';
import labsApi from '../../data/index';

/** A singleton class for handling ToastNotification monitoring */
class ToastNotificationService {
  constructor() {
    this.infrastructureCallbacks = [];
    this.pollingInfrastructures = [];

    this.monitorNotifications = (notifications, callback) => {
      if (
        constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD & notifications ||
        constants.NOTIFICATION_TYPES.INFRASTRUCTURE_DESTROY_BUILD &
          notifications
      ) {
        this.infrastructureCallbacks.push(callback);
        // if we aren't yet polling, start polling for this notification type
        // wait a second for sub components to render & register all notification handlers
        setTimeout(this.pollRunningInfraBuilds, 1000);
      }
    };

    this.unregisterNotifications = (notifications, callback) => {
      if (
        constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD & notifications ||
        constants.NOTIFICATION_TYPES.INFRASTRUCTURE_DESTROY_BUILD &
          notifications
      ) {
        for (let i = 0; i < this.infrastructureCallbacks.length; i++) {
          if (this.infrastructureCallbacks[i] === callback) {
            this.infrastructureCallbacks.splice(i, 1);
          }
        }
      }
    };
  }

  pollRunningInfraBuilds = () => {
    const infrastructureApi = new labsApi.InfrastructureApi();
    const jobApi = new labsApi.JobApi();
    const that = this;

    infrastructureApi.infrastructuresGet((error, infrastructures) => {
      if (infrastructures && infrastructures.length) {
        infrastructures.forEach((infrastructure) => {
          if (
            infrastructure.status === constants.ANSIBLE_JOB_STATUS.PENDING ||
            infrastructure.status === constants.ANSIBLE_JOB_STATUS.RUNNING
          ) {
            // do not poll the same infrastructure twice
            const polled = this.pollingInfrastructures.find(
              infra => infra.id === infrastructure.id
            );
            if (polled) return;

            // poll the infra and add it to the list
            this.pollingInfrastructures.push(infrastructure);
            let interval;
            const checkJobs = () => {
              clearInterval(interval);
              jobApi.jobsIdGet(infrastructure.tower_job_id, (err, job) => {
                if (
                  job.status === constants.ANSIBLE_JOB_STATUS.SUCCESSFUL ||
                  job.status === constants.ANSIBLE_JOB_STATUS.FAILED ||
                  job.status === constants.ANSIBLE_JOB_STATUS.CANCELLED
                ) {
                  if (
                    infrastructure.destroy_started &&
                    job.status === constants.ANSIBLE_JOB_STATUS.SUCCESSFUL
                  ) {
                    // this was a destroy job, delete the infra from the list
                    infrastructureApi.deleteInfrastructure(
                      infrastructure.id,
                      () => {
                        that.infrastructureCallbacks.forEach((callback) => {
                          callback({
                            notification_type: constants.NOTIFICATION_TYPES
                              .INFRASTRUCTURE_DESTROY_BUILD,
                            data: infrastructure,
                            job
                          });
                        });
                      }
                    );
                  }
                  else {
                    infrastructure.datetime_completed = job.finished;
                    infrastructure.status = job.status;
                    infrastructureApi.updateInfrastructure(
                      infrastructure.id,
                      { body: infrastructure },
                      (e) => {
                        // todo: display an error
                        if (e) console.error(e);
                        // notify all toast listeners w/ registered callbacks
                        that.infrastructureCallbacks.forEach((callback) => {
                          callback({
                            notification_type: constants.NOTIFICATION_TYPES
                              .INFRASTRUCTURE_BUILD,
                            data: infrastructure,
                            job
                          });
                        });
                      }
                    );
                  }
                }
                else {
                  // poll running jobs every 10 sec, once they complete, update them & update state
                  interval = setInterval(checkJobs, 10000);
                }
              });
            };
            checkJobs();
          }
        });
      }
    });
  };
}

export default new ToastNotificationService();
