import React from 'react';
import Layout from '../../components/Layout';
import BuildListView from '../../components/ListView/BuildListView';
import Modal from '../../components/Modal/Modal';
import labsApi from '../../data/index';
import constants from '../../core/constants';
import c from '../common.css';

class BuildsPage extends React.Component {
  state = { builds: [], startBuildModal: false, build: {}, polling: false };

  componentWillMount() {
    this.startBuildModalId = 'startBuildModal';
    this.getBuilds();
  }

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  getBuilds() {
    const buildApi = new labsApi.BuildApi();
    buildApi.buildsGet((error, builds) => {
      if (!this.state.polling) {
        this.pollRunningBuilds(builds);
      }
      this.setState({ builds, polling: true });
    });
  }

  handleBuild = (event, build) => {
    event.preventDefault();
    this.setState({ startBuildModal: true, build });
  };

  handleDelete = (event, buildId) => {
    event.preventDefault();
    const buildApi = new labsApi.BuildApi();
    buildApi.deleteBuild(buildId, () => {
      this.getBuilds();
    });
  };

  handleRefresh = (event) => {
    event.preventDefault();
    this.getBuilds();
  };

  cancelStart = (event) => {
    event.preventDefault();
    this.hideStartBuildModal();
  };

  handleCloseStart = (event) => {
    event.preventDefault();
    this.hideStartBuildModal();
  };

  hideStartBuildModal() {
    this.setState({ startBuildModal: false });
    $(`#${this.startBuildModalId}`).modal('hide');
  }

  startBuild = (event) => {
    event.preventDefault();
    this.hideStartBuildModal();
    // todo: post a build for state.build and refresh
    this.getBuilds();
  };

  pollRunningBuilds(builds) {
    const buildApi = new labsApi.BuildApi();
    const jobApi = new labsApi.JobApi();
    const completeJobs = [];

    if (builds && builds.length) {
      builds.forEach((build) => {
        if (
          build.status === constants.ANSIBLE_JOB_STATUS.PENDING ||
          build.status === constants.ANSIBLE_JOB_STATUS.RUNNING
        ) {
          // poll each Tower job for this Build
          build.running_jobs.forEach((runningJob) => {
            let interval;
            const checkJobs = () => {
              clearInterval(interval);
              jobApi.jobsIdGet(runningJob.jobId, (error, job) => {
                if (
                  job.status === constants.ANSIBLE_JOB_STATUS.SUCCESSFUL ||
                  job.status === constants.ANSIBLE_JOB_STATUS.FAILED ||
                  job.status === constants.ANSIBLE_JOB_STATUS.CANCELLED
                ) {
                  build.project_jobs[runningJob.stageName][
                    runningJob.projectIndex
                  ].status =
                    job.status;
                  build.project_jobs[runningJob.stageName][
                    runningJob.projectIndex
                  ].datetime_completed =
                    job.finished;

                  // job has completed, remove it
                  completeJobs.push(job);

                  // if all running jobs complete, complete the build
                  if (build.running_jobs.length === completeJobs.length) {
                    build.status = job.status;
                    build.datetime_completed = job.finished;
                    build.running_jobs = [];
                  }

                  buildApi.updateBuild(build.id, { body: build }, (e) => {
                    if (e) console.error(e);

                    // requery builds now to update the status...
                    this.getBuilds();
                  });
                }
                else {
                  // poll running jobs every 10 sec, once they complete, update them & update state
                  interval = setInterval(checkJobs, 10000);
                }
              });
            };
            // check immediately first...
            setTimeout(checkJobs, 0);
          });
        }
      });
    }
  }

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
        {(() => {
          const content = [];
          content.push(
            <div className="page-header" key="builds-page-header">
              <h2> Builds </h2>
            </div>
          );

          if (this.state.builds.length) {
            content.push(
              <BuildListView builds={this.state.builds}
                handleBuild={this.handleBuild}
                handleDelete={this.handleDelete}
                key="builds-list-view"/>
            );
          }
          else {
            content.push(<h4 key="builds-no-builds">No current builds.</h4>);
            content.push(
              <p key="builds-no-topology-message">
                You must create an application topology first before running a build.
              </p>
            );
          }
          if (this.state.startBuildModal) {
            content.push(
              <Modal id={this.startBuildModalId}
                handleClose={this.handleCloseStart.bind(this)}
                key="builds-modal">
                <div className="text-center">
                  <h3>Build Application Topology</h3>
                  <div className={c.spacing}>
                    <i className="fa fa-rocket fa-3x"/>
                  </div>
                  <div className={c.spacing}>
                    <strong>Topology:</strong> {this.state.build.topology.name}
                  </div>
                  <p>Are you sure?</p>
                  <div className={c.spacing}>
                    <button className="btn btn-default btn-lg"
                      onClick={this.cancelStart}>
                      No
                    </button>
                    &nbsp;
                    <button className="btn btn-success btn-lg"
                      onClick={this.startBuild}>
                      Yes
                    </button>
                  </div>
                </div>
              </Modal>
            );
          }
          return content;
        })()}
      </Layout>
    );
  }
}

export default BuildsPage;
