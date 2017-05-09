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
    infrastructures: [],
    stages: [],
    homeView: true,
    createProjectView: false,
    createStageView: false,
    topologyName: '',
    topology: {},
    newProject: {},
    newStage: {},
    isBuildable: false,
    startBuildModal: false,
    missingInfra: [],
    loaded: false
  };

  componentDidMount() {
    document.title = constants.app_title;
  }

  componentWillMount() {
    this.startBuildModalId = "startBuildModal";
    this.getTopology();
  }

  getTopology() {
    Promise.all([this.topologyGet(), this.infraGet()]).then((values) => {
      let topology = values[0];
      let infrastructures = values[1];
      this.setState({ 
        topology: topology, 
        projects: topology.project_templates, 
        stages: topology.promotion_process, 
        infrastructures: infrastructures,
        isBuildable: selectors.hasStageProjects(topology),
        loaded: true 
      });
    });
  }

  topologyGet = () => {
    return new Promise((resolve, reject) => {
      let topologyApi = new labsApi.TopologyApi();
      topologyApi.topologiesIdGet(this.props.route.params.id, (error, topology, res) => {
        if(error) reject(err);
        resolve(topology);
      })
    })
  }

  infraGet = () => {
    return new Promise((resolve, reject) => {
      let infrastructureApi = new labsApi.InfrastructureApi();
      infrastructureApi.infrastructuresGet((error, infrastructures, res) => {
        if(error) reject(err);
        resolve(infrastructures);
      })
    })
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

  handleProjectEdit = (event, index) => {
    this.setState({ newProject: this.state.projects[index], homeView: false, createProjectView: true });
    event.preventDefault();
  };  

  handleCreateStage = (event) => {
    this.setState({ homeView: false, createStageView: true, newStage: {} });
    event.preventDefault();
  };

  handleStageEdit = (event, index) => {
    this.setState({ newStage: this.state.stages[index], homeView: false, createStageView: true });
    event.preventDefault();
  };

  handleStageDelete = (event, index) => {
    let copy = this.state.topology.promotion_process.slice(0);
    let topology = Object.assign({}, this.state.topology);
    copy.splice(index, 1);
    topology.promotion_process = copy;

    this.saveTopology(event, topology);
  }

  handleStageMoved = (index, x, y) => {
    let topologyApi = new labsApi.TopologyApi();
    let topology = Object.assign({}, this.state.topology);
    topology.promotion_process[index].x = x;
    topology.promotion_process[index].y = y;
    topologyApi.updateTopology(topology.id, {'body': topology}, (e) => {
      if(e) console.log(e); //todo: handle error
    });    
  }

  handleAddStage = (stage) => {
    let topologyApi = new labsApi.TopologyApi();
    let topology = Object.assign({}, this.state.topology);
    
    //delete existing id since we are duplicating this...
    delete stage.id;
    topology.promotion_process.push(stage);

    topologyApi.updateTopology(topology.id, {'body': topology}, (e) => {
      if(e) console.log(e); //todo: handle error
      this.getTopology(); //refresh after update
    });     
  }

  handleAddStageProject = (index, project) => {
    let topologyApi = new labsApi.TopologyApi();
    let topology = Object.assign({}, this.state.topology);
    topology.promotion_process[index].projects = topology.promotion_process[index].projects || [];
    topology.promotion_process[index].projects.push(project);

    this.setState({isBuildable: true});

    topologyApi.updateTopology(topology.id, {'body': topology}, (e) => {
      if(e) console.log(e); //todo: handle error
    });    
  }

  handleDeleteStageProject = (index, projectIndex) => {
    let topologyApi = new labsApi.TopologyApi();
    let topology = Object.assign({}, this.state.topology);
    topology.promotion_process[index].projects.splice(projectIndex, 1);

    this.setState({isBuildable: selectors.hasStageProjects(topology)});

    topologyApi.updateTopology(topology.id, {'body': topology}, (e) => {
      if(e) console.log(e); //todo: handle error
    });     
  }

  handleSubmitStage = (event) => {
    this.getTopology(); //refresh
    this.setState({ homeView: true, createProjectView: false, createStageView: false });
  };

  handleCancelStage = (event) => {
    event.preventDefault();
    this.setState({ homeView: true, createProjectView: false, createStageView: false });
  };  

  handleBuild = (event, index) => {
    event.preventDefault();

    //check the current state of infrastructures for stage projects before starting
    Promise.all([this.topologyGet(), this.infraGet()]).then((values) => {
      let topology = values[0];
      let infrastructures = values[1];

      this.setState({ 
        topology: topology, 
        projects: topology.project_templates,
        stages: topology.promotion_process,
        infrastructures: infrastructures,
        startBuildModal: true, 
        missingInfra: selectors.missingInfra(topology, infrastructures)
      });
    });
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
    let jobApi = new labsApi.JobApi();
    let jobs = [];
    let count = 0;

    //call the JobsApi to create the Job in Tower for every project
    this.state.stages.forEach((stage) =>{
      if(stage.projects && stage.projects.length){
        stage.projects.forEach((project) => {
          count++;
          let body = {project_name: project.name + '-' + stage.name};
          jobApi.addProjectJob({ body: body}, (e, data, res) => {
            if(e) console.log(e);
            jobs.push({id: data.id, created: data.created});
          });
        })
      }
    })

    const checkJobsAdded = () => {
      if(jobs.length !== count){
        setTimeout(checkJobsAdded, 500); //check all jobs created every 500ms
      } else {
        //link Build to the last job started for now...
        let lastJob = jobs[jobs.length - 1];
        buildApi.addBuild({ body: 
          { topologyId: this.state.topology.id, towerJobId: lastJob.id, dateTimeStarted: lastJob.created } }, 
          (e, data, res) => {
            if (e) console.log(e);
            this.hideStartBuildModal();
            setTimeout(() => {
              history.push('/builds');
            }, 1000);
        });
      }
    }
    checkJobsAdded();
  };

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

    if (this.state.homeView && this.state.loaded) {
      return (
        <TopologyView topology={this.state.topology}
          isBuildable={this.state.isBuildable}
          missingInfra={this.state.missingInfra}
          handleDownload={this.handleDownload}
          handleBuild={this.handleBuild}
          projects={this.state.projects}
          stages={this.state.stages}
          handleCreateStage={this.handleCreateStage}
          handleStageEdit={this.handleStageEdit}
          handleStageDelete={this.handleStageDelete}
          handleStageMoved={this.handleStageMoved}
          handleAddStage={this.handleAddStage}
          handleAddStageProject={this.handleAddStageProject}
          handleDeleteStageProject={this.handleDeleteStageProject}
          handleCreateProject={this.handleCreateProject}
          handleProjectEdit={this.handleProjectEdit}
          handleProjectDelete={this.handleProjectDelete}
          startBuildModal={this.state.startBuildModal}
          startBuildModalId={this.startBuildModalId}
          cancelStart={this.cancelStart}
          startBuild={this.startBuild} />
      )
    } else if (this.state.createProjectView && this.state.loaded) {
      return (
        <ProjectView topology={this.state.topology}
          infrastructures={this.state.infrastructures}
          handleSubmit={this.handleSubmitProject}
          handleCancel={this.handleCancelProject}
          value={this.state.newProject} />
      )
    } else if (this.state.createStageView && this.state.loaded) {
      return (
        <Layout className="container-fluid container-pf-nav-pf-vertical" nav={true}>
          <CreateStageForm handleSubmit={this.handleSubmitStage}
            handleCancel={this.handleCancelStage}
            topology={this.state.topology}
            value={this.state.newStage} />
        </Layout>
      );
    }
    else {
      //todo: show loading
      return null;
    }
  }
}

export default TopologyPage;
