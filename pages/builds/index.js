import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import BuildListView from '../../components/ListView/BuildListView';
import Modal from '../../components/Modal/Modal';
import labsApi from '../../data/index';
import constants from '../../core/constants';
import c from '../common.css';

class BuildsPage extends React.Component {

  state = { builds: [], startBuildModal: false, build: {} };

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillMount() {
    this.startBuildModalId = "startBuildModal";
    this.getBuilds();
  }

  getBuilds(){
    let buildApi = new labsApi.BuildApi();
    buildApi.buildsGet((error, builds, res) => {
      this.setState({builds: builds});
      this.pollRunningBuilds(builds);
    });
  }

  handleBuild = (event, build) => {
    event.preventDefault();
    this.setState({startBuildModal: true, build: build});
  };

  handleDelete = (event) => {
    event.preventDefault();
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

  hideStartBuildModal(){
    this.setState({startBuildModal: false});
    $('#' + this.startBuildModalId).modal('hide');
  }


  startBuild = (event) => {
    event.preventDefault();
    this.hideStartBuildModal();
    //todo: post a build for state.build and refresh
    this.getBuilds();
  };

  pollRunningBuilds(builds) {
    let buildApi = new labsApi.BuildApi();
    let jobApi = new labsApi.JobApi();

    if(builds && builds.length) {
      builds.forEach((build) => {
        if(build.status === 'pending'){
          //poll running jobs every 10 sec, once they complete, update them & update state
          let interval = setInterval(() => {
            jobApi.jobsIdGet(build.tower_job_id, (error, job, res) => {
              if(job.status === 'successful'){
                clearInterval(interval);

                build.datetime_completed = job.finished;
                build.status = 'successful';

                buildApi.updateBuild(build.id, {'body': build}, (e) => {
                  //todo: display an error
                  if (e) console.error(e);
                  
                  //requery builds now to update the status...
                  this.getBuilds();
                });
              }
            })
          }, 10000)

        }
      })
    }
  }

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={ true }>
        {(() => {
          let content = [];
          content.push(<div className="page-header" key="builds-page-header">
              <h2> Builds </h2>
            </div>
          );

          if (this.state.builds.length) {
            content.push(<BuildListView builds={ this.state.builds }
                                        handleBuild={this.handleBuild.bind(this)}
                                        handleDelete={this.handleDelete.bind(this)}
                                        key="builds-list-view"/>);
          } else {
            content.push(<h4 key="builds-no-builds">No current builds.</h4>);
            content.push(<p key="builds-no-topology-message">You must create an application topology first before running a build.</p>);
          }
          if(this.state.startBuildModal){
            content.push(<Modal id={this.startBuildModalId} handleClose={this.handleCloseStart.bind(this)}
                                key="builds-modal">
              <div className="text-center">
                <h3>Build Application Topology</h3>
                <div className={c.spacing}>
                  <i className="fa fa-rocket fa-3x"></i>
                </div>
                <div className={c.spacing}>
                  <strong>Topology:</strong> {this.state.build.topology.name}
                </div>
                <p>Are you sure?</p>
                <div className={c.spacing}>
                  <button className="btn btn-default btn-lg" onClick={this.cancelStart}>No</button>
                  &nbsp;
                  <button className="btn btn-success btn-lg" onClick={this.startBuild}>Yes</button>
                </div>
              </div>
              </Modal>
            )
          }
          return content;
        })()}
      </Layout>
    );
  }
}

export default BuildsPage;
