import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import TopologyView from '../../components/CommonViews/TopologyView';
import ProjectView from '../../components/CommonViews/ProjectView';
import ProjectCardView from '../../components/CardView/ProjectCardView';
import StagesCardView from '../../components/CardView/StagesCardView';
import CreateProjectForm from '../../components/Forms/CreateProjectForm';
import CreateStageForm from '../../components/Forms/CreateStageForm';
import FileDownload from '../../core/fileDownload';
import history from '../../core/history';
import labsApi from '../../data/index';
import selectors from '../../data/selectors';
import constants from '../../core/constants';
import c from '../common.css'
import cx from 'classnames';

class TopologyPage extends React.Component {

  state = {
    projects: [],
    stages: [],
    homeView: true,
    createProjectView: false,
    createStageView: false,
    topologyName: '',
    topology: {},
    newProject: {},
    newStage: {},
    startBuildModal: false
  };

  componentDidMount() {
    document.title = constants.app_title;
  }

  componentWillMount() {
    this.startBuildModalId = "startBuildModal";
    this.getTopology();
  }

  getTopology() {
    let topologyApi = new labsApi.TopologyApi();
    topologyApi.topologiesIdGet(this.props.route.params.id, (error, topology, res) => {
      selectors.isBuildable([topology]);
      this.setState({ topology: topology });
      this.setState({ projects: topology.project_templates });
      this.setState({ stages: topology.promotion_process });
    });
  }

  handleCreateProject = (event) => {
    this.setState({ homeView: false, createProjectView: true, newProject: {} });
    event.preventDefault();
  };

  handleSubmitProject = (event) => {
    this.getTopology(); //refresh
    this.setState({ homeView: true, createProjectView: false });
  };

  handleCancelProject = (event) => {
    event.preventDefault();
    this.setState({ homeView: true, createProjectView: false });
  };

  handleDefine = (event) => {
    this.setState({ homeView: false, createStageView: true, newStage: {} });
    event.preventDefault();
  };

  handleStageEdit = (event, index) => {
    this.setState({ newStage: this.state.stages[index], homeView: false, createStageView: true });
    event.preventDefault();
  };

  handleProjectEdit = (event, index) => {
    this.setState({ newProject: this.state.projects[index], homeView: false, createProjectView: true });
    event.preventDefault();
  };

  handleBuild = (event, index) => {
    event.preventDefault();
    this.setState({ startBuildModal: true });
  };

  handleDownload = (event, index) => {
    event.preventDefault();
    let buildApi = new labsApi.BuildApi();
    buildApi.downloadEngagement(this.state.topology.id, (e, data, res) => {
      if (e) console.log(e);

      //for now, we will download the JSON to the user's browser
      FileDownload.saveJson(data.engagement);
    });
  };

  cancelStart = (event) => {
    event.preventDefault();
    this.hideStartBuildModal();
  };

  hideStartBuildModal() {
    $('#' + this.startBuildModalId).modal('hide');
    this.setState({ startBuildModal: false });
  }

  startBuild = (event) => {
    event.preventDefault();
    let buildApi = new labsApi.BuildApi();
    buildApi.addBuild({ body: { topologyId: this.state.topology.id } }, (e, data, res) => {
      if (e) console.log(e);

      this.hideStartBuildModal();
      setTimeout(() => {
        history.push('/builds');
      }, 1000);
    });
    //todo: start build spinner here...
  };

  handleStageDelete = (event, index) => {
    let copy = this.state.topology.promotion_process.slice(0);
    let topology = Object.assign({}, this.state.topology);
    copy.splice(index, 1);
    topology.promotion_process = copy;

    this.saveTopology(event, topology);
  }

  handleProjectDelete = (event, index) => {
    let copy = this.state.topology.project_templates.slice(0);
    let topology = Object.assign({}, this.state.topology);
    copy.splice(index, 1);
    topology.project_templates = copy;

    this.saveTopology(event, topology);
  }

  saveTopology(event, topology) {
    event.preventDefault();
    let topologyApi = new labsApi.TopologyApi();
    topologyApi.updateTopology(topology.id, { 'body': topology }, (e) => {
      if (e) console.log(e); //todo: handle error
      this.getTopology(); //refresh after update
    });
  }

  render() {
    document.body.style.backgroundColor = constants.bg_white;

    if (this.state.homeView) {
      return (
        <TopologyView topology={this.state.topology}
          handleDownload={this.handleDownload}
          handleBuild={this.handleBuild}
          projects={this.state.projects}
          stages={this.state.stages}
          handleDefine={this.handleDefine}
          handleStageEdit={this.handleStageEdit}
          handleStageDelete={this.handleStageDelete}
          handleCreateProject={this.handleCreateProject}
          handleProjectEdit={this.handleProjectEdit}
          handleProjectDelete={this.handleProjectDelete}
          startBuildModal={this.state.startBuildModal}
          startBuildModalId={this.startBuildModalId}
          cancelStart={this.cancelStart}
          startBuild={this.startBuild} />
      )
    } else if (this.state.createProjectView) {
      return (
        <ProjectView topology={this.state.topology}
          handleSubmit={this.handleSubmitProject}
          handleCancel={this.handleCancelProject}
          value={this.state.newProject} />
      )
    } else if (this.state.createStageView) {
      return (
        <Layout className="container-fluid container-pf-nav-pf-vertical" nav={true}>
          <CreateStageForm handleSubmit={this.handleSubmitProject}
            handleCancel={this.handleCancelProject}
            topology={this.state.topology}
            value={this.state.newStage} />
        </Layout>
      );
    }
  }
}

export default TopologyPage;
