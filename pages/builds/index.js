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
  }

  componentWillMount() {
    this.startBuildModalId = "startBuildModal";
    this.getBuilds();
  }

  getBuilds(){
    let buildApi = new labsApi.BuildApi();
    buildApi.buildsGet((error, builds, res) => {
      this.setState({builds: builds});
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

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={ true }>
        {(() => {
          let content = [];
          content.push(<div className="page-header" key="builds-page-header">
              <h2> Builds
                <div className={c.float_right}>
                  <button type="submit" className="btn btn-info" onClick={this.handleRefresh}>Refresh</button>
                </div>
              </h2>
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
