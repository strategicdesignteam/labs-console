import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import ProjectCardView from '../../components/CardView/ProjectCardView';
import StagesCardView from '../../components/CardView/StagesCardView';
import CreateProjectForm from '../../components/Forms/CreateProjectForm';
import CreateStageForm from '../../components/Forms/CreateStageForm';
import FileDownload from '../../core/fileDownload';
import Modal from '../../components/Modal/Modal';
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

  getTopology(){
    let topologyApi = new labsApi.TopologyApi();
    topologyApi.topologiesIdGet(this.props.route.params.id, (error, topology, res) => {
      selectors.isBuildable([topology]);
      this.setState({topology: topology});
      this.setState({projects: topology.project_templates});
      this.setState({stages: topology.promotion_process});
    });
  }

  handleCreateProject = (event) => {
    this.setState({homeView: false, createProjectView: true, newProject: {}});
    event.preventDefault();
  };

  handleSubmitProject = (event) => {
    this.getTopology(); //refresh
    this.setState({homeView: true, createProjectView: false});
  };

  handleCancelProject = (event) => {
    event.preventDefault();
    this.setState({homeView: true, createProjectView: false});
  };

  handleDefine = (event) =>
  {
    this.setState({homeView: false, createStageView: true, newStage: {}});
    event.preventDefault();
  };

  handleStageEdit = (event, index) =>
  {
    this.setState({newStage: this.state.stages[index], homeView: false, createStageView: true});
    event.preventDefault();
  };

  handleProjectEdit = (event, index) =>
  {
    this.setState({newProject: this.state.projects[index], homeView: false, createProjectView: true});
    event.preventDefault();
  };

  handleBuild = (event, index) => {
    event.preventDefault();
    this.setState({startBuildModal: true});
  };

  cancelStart = (event) => {
    event.preventDefault();
    this.hideStartBuildModal();
  };
  
  hideStartBuildModal(){
    $('#' + this.startBuildModalId).modal('hide');
    this.setState({startBuildModal: false});
  }

  startBuild = (event) => {
    event.preventDefault();
    let buildApi = new labsApi.BuildApi();
    buildApi.addBuild({body: {topologyId : this.state.topology.id}}, (e, data, res) => {
      if(e) console.log(e);

      //for now, we will download the JSON to the user's browser
      FileDownload.saveJson(data.engagement);

      this.hideStartBuildModal();
      setTimeout(() => {
        history.push('/builds');
      }, 1000);
    });
    //todo: start build spinner here...
  };

  render() {
    if(this.state.homeView){
      document.body.style.backgroundColor = constants.bg_grey;
    } else {
      document.body.style.backgroundColor = constants.bg_white;
    }

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav= { true }>
        {(() => {
          if(this.state.homeView){
            let content = [];
            //Home View Content
            content.push(
              <div className="page-header" key="topologies-page-header">
                <ol className="breadcrumb">
                  <li>
                    <Link to="/home">Back to Topologies</Link>
                  </li>
                  <li className="active"> <strong>Topology:</strong>
                    &nbsp; { this.state.topology.name }
                  </li>
                  <div className={c.float_right}>
                    <button type="submit" className="btn btn-primary" onClick={this.handleBuild} disabled={!this.state.projects.length || !this.state.stages.length}>Build</button>
                  </div>
                </ol>
              </div>);

            content.push(
              <h3 key="topologies-build-stages"> Promotion Stages
                <span className={c.float_right}>
                  <button type="submit" className="btn btn-default" onClick={this.handleDefine}>Define</button>
                </span>
              </h3>
            );
            content.push(
              <br key="br-stages"/>
            );

            if(this.state.stages.length){
              content.push(<StagesCardView stages={ this.state.stages } handleStageEdit={this.handleStageEdit.bind(this)} key="topologies-stages" />);
            } else if(!this.state.stages.length) {
              content.push(<h4 key="topologies-no-topologies">No stages defined.</h4>);
              content.push(<p key="topologies-no-topologies-message">An application topology can't be built until it contains at least one stage. Create a stage first.</p>)
            } else {
              content.push(<h4 key="topologies-ready">Ready to build topology.</h4>);
              content.push(<p key="topologies-ready-message">Hit the build button when ready to build your application topology.</p>)
            }

            content.push(<hr key="topologies-hr"/>);
            content.push(
              <h3 key="topologies-projects"> Project Templates
                <div className={c.float_right}>
                  <button type="submit" className="btn btn-default" onClick={this.handleCreateProject}>Create</button>
                </div>
              </h3>);

            content.push(
              <br key="br-projects"/>
            );
            if(this.state.projects.length){
              content.push(<ProjectCardView projects={ this.state.projects }
                                            handleProjectEdit = {this.handleProjectEdit.bind(this)}
                                            key="topologies-project-card-view"/>);
            } else{
              content.push(<h4 key="topologies-no-projects">No projects exist.</h4>);
              content.push(<p key="topologies-no-projects-message">A topology must contain at least one project. Create a project to begin.</p>)
            }
            return content;
          } else if (this.state.createProjectView){
            //Create Project View Content
            return <CreateProjectForm handleSubmit={this.handleSubmitProject.bind(this)}
                                      handleCancel={this.handleCancelProject.bind(this)}
                                      topology={this.state.topology}
                                      value={this.state.newProject}/>;
          } else if (this.state.createStageView){
            return <CreateStageForm handleSubmit={this.handleSubmitProject.bind(this)}
                                      handleCancel={this.handleCancelProject.bind(this)}
                                      topology={this.state.topology}
                                      value={this.state.newStage}/>
          }

        })()}

        {(() => {
          if (this.state.startBuildModal){
            return <Modal id={this.startBuildModalId}
                          handleClose={this.cancelStart.bind(this)}
                          key="builds-modal">
              <div className="text-center">
                <div className={cx(c.spacing, c.slate_gray)}>
                  <i className="fa fa-rocket fa-3x"></i>
                </div>
                <h3>Build Application Topology</h3>
                <div className={c.spacing} >
                  <strong>Topology:</strong> {this.state.topology.name}
                </div>
                <p>Are you sure?</p>
                <div className={c.spacing}>
                  <button className="btn btn-default btn-lg" onClick={this.cancelStart}>No</button>
                  &nbsp;
                  <button className="btn btn-primary btn-lg" onClick={this.startBuild}>Yes</button>
                </div>
              </div>
            </Modal>
          }
        })()}
      </Layout>
    );
  }
}

export default TopologyPage;
