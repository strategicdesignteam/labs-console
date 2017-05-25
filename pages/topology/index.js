import React from 'react';
import Layout from '../../components/Layout';
import TopologyView from '../../components/CommonViews/TopologyView';
import ProjectView from '../../components/CommonViews/ProjectView';
import CreateStageForm from '../../components/Forms/CreateStageForm';
import history from '../../core/history';
import labsApi from '../../data/index';
import selectors from '../../data/selectors';
import constants from '../../core/constants';

class TopologyPage extends React.Component {
  static propTypes = {
    route: React.PropTypes.object
  };

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
    projectIndex: null,
    newStage: {},
    isBuildable: false,
    startBuildModal: false,
    missingInfra: [],
    loaded: false
  };

  componentWillMount() {
    this.startBuildModalId = 'startBuildModal';
    this.getTopology();
  }

  componentDidMount() {
    document.title = constants.app_title;
  }

  getTopology() {
    Promise.all([this.topologyGet(), this.infraGet()]).then((values) => {
      const topology = values[0];
      const infrastructures = values[1];
      this.setState({
        topology,
        projects: topology.project_templates,
        stages: topology.promotion_process,
        infrastructures,
        isBuildable: selectors.hasStageProjects(topology),
        loaded: true
      });
    });
  }

  topologyGet = () =>
    new Promise((resolve, reject) => {
      const topologyApi = new labsApi.TopologyApi();
      topologyApi.topologiesIdGet(
        this.props.route.params.id,
        (err, topology) => {
          if (err) reject(err);
          resolve(topology);
        }
      );
    });

  infraGet = () =>
    new Promise((resolve, reject) => {
      const infrastructureApi = new labsApi.InfrastructureApi();
      infrastructureApi.infrastructuresGet((err, infrastructures) => {
        if (err) reject(err);
        resolve(infrastructures);
      });
    });

  handleCreateProject = (event) => {
    this.setState({
      homeView: false,
      createProjectView: true,
      newProject: {},
      projectIndex: null
    });
    event.preventDefault();
  };

  handleSubmitProject = () => {
    this.getTopology(); // refresh
    this.setState({ homeView: true, createProjectView: false });
  };

  handleCancelProject = (event) => {
    event.preventDefault();
    this.setState({ homeView: true, createProjectView: false });
  };

  handleProjectEdit = (event, index) => {
    this.setState({
      newProject: this.state.projects[index],
      homeView: false,
      createProjectView: true,
      projectIndex: index
    });
    event.preventDefault();
  };

  handleCreateStage = (event) => {
    this.setState({ homeView: false, createStageView: true, newStage: {} });
    event.preventDefault();
  };

  handleStageEdit = (event, index) => {
    this.setState({
      newStage: this.state.stages[index],
      homeView: false,
      createStageView: true
    });
    event.preventDefault();
  };

  handleStageDelete = (event, index) => {
    const copy = this.state.topology.promotion_process.slice(0);
    const topology = Object.assign({}, this.state.topology);
    copy.splice(index, 1);
    topology.promotion_process = copy;

    this.saveTopology(event, topology);
  };

  handleStageMoved = (index, x, y) => {
    const topologyApi = new labsApi.TopologyApi();
    const topology = Object.assign({}, this.state.topology);
    topology.promotion_process[index].x = x;
    topology.promotion_process[index].y = y;
    topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
      if (e) console.log(e); // todo: handle error
    });
  };

  handleAddStage = (stage) => {
    const topologyApi = new labsApi.TopologyApi();
    const topology = Object.assign({}, this.state.topology);

    topology.promotion_process.push(stage);

    topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
      if (e) console.log(e); // todo: handle error
      this.getTopology(); // refresh after update
    });
  };

  handleAddStageProject = (index, project) => {
    const topologyApi = new labsApi.TopologyApi();
    const topology = Object.assign({}, this.state.topology);
    topology.promotion_process[index].projects = topology.promotion_process[
      index
    ].projects || [];
    topology.promotion_process[index].projects.push(project);

    this.setState({ isBuildable: true });

    topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
      if (e) console.log(e); // todo: handle error
    });
  };

  handleDeleteStageProject = (index, projectIndex) => {
    const topologyApi = new labsApi.TopologyApi();
    const topology = Object.assign({}, this.state.topology);
    topology.promotion_process[index].projects.splice(projectIndex, 1);

    this.setState({ isBuildable: selectors.hasStageProjects(topology) });

    topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
      if (e) console.log(e); // todo: handle error
    });
  };

  handleSubmitStage = () => {
    this.getTopology(); // refresh
    this.setState({
      homeView: true,
      createProjectView: false,
      createStageView: false
    });
  };

  handleCancelStage = (event) => {
    event.preventDefault();
    this.setState({
      homeView: true,
      createProjectView: false,
      createStageView: false
    });
  };

  handleBuild = (event) => {
    event.preventDefault();

    // check the current state of infrastructures for stage projects before starting
    Promise.all([this.topologyGet(), this.infraGet()]).then((values) => {
      const topology = values[0];
      const infrastructures = values[1];

      this.setState({
        topology,
        projects: topology.project_templates,
        stages: topology.promotion_process,
        infrastructures,
        startBuildModal: true,
        missingInfra: selectors.missingInfra(topology, infrastructures)
      });
    });
  };

  cancelStart = (event) => {
    event.preventDefault();
    this.hideStartBuildModal();
  };

  hideStartBuildModal() {
    $(`#${this.startBuildModalId}`).modal('hide');
    this.setState({ startBuildModal: false });
  }

  startBuild = (event) => {
    event.preventDefault();
    const buildApi = new labsApi.BuildApi();
    const jobApi = new labsApi.JobApi();
    const runningJobs = [];
    const projectJobs = {};
    let count = 0;

    // call the JobsApi to create the Job in Tower for every project
    this.state.stages.forEach((stage) => {
      // projectJobs object used for quick access on the Build list view
      projectJobs[stage.name] = {};
      if (stage.projects && stage.projects.length) {
        stage.projects.forEach((project, j) => {
          count += 1;
          const body = { project_name: project.name };
          jobApi.addProjectJob({ body }, (e, data) => {
            if (e) console.log(e);
            projectJobs[stage.name][j] = projectJobs[stage.name][j] || {};
            projectJobs[stage.name][j].jobId = data.id;
            projectJobs[stage.name][j].created = data.created;
            projectJobs[stage.name][j].projectName = project.name;
            projectJobs[stage.name][j].projectIndex = j;
            projectJobs[stage.name][j].stageName = stage.name;
            projectJobs[stage.name][j].status = data.status;

            runningJobs.push(projectJobs[stage.name][j]);
          });
        });
      }
    });

    const checkJobsAdded = () => {
      if (runningJobs.length !== count) {
        setTimeout(checkJobsAdded, 500);
      }
      else {
        buildApi.addBuild(
          {
            body: {
              topologyId: this.state.topology.id,
              dateTimeStarted: runningJobs[0].created,
              status: constants.ANSIBLE_JOB_STATUS.PENDING,
              runningJobs,
              projectJobs
            }
          },
          (e) => {
            if (e) console.log(e);
            this.hideStartBuildModal();
            setTimeout(() => {
              history.push('/builds');
            }, 1000);
          }
        );
      }
    };
    checkJobsAdded();
  };

  handleProjectDelete = (event, index) => {
    const copy = this.state.topology.project_templates.slice(0);
    const topology = Object.assign({}, this.state.topology);
    copy.splice(index, 1);
    topology.project_templates = copy;

    this.saveTopology(event, topology);
  };

  saveTopology(event, topology) {
    event.preventDefault();
    const topologyApi = new labsApi.TopologyApi();
    topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
      if (e) console.log(e); // todo: handle error
      this.getTopology(); // refresh after update
    });
  }

  render() {
    document.body.style.backgroundColor = constants.bg_white;

    if (this.state.homeView && this.state.loaded) {
      return (
        <TopologyView topology={this.state.topology}
          isBuildable={this.state.isBuildable}
          missingInfra={this.state.missingInfra}
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
          startBuild={this.startBuild}/>
      );
    }
    else if (this.state.createProjectView && this.state.loaded) {
      return (
        <ProjectView topology={this.state.topology}
          infrastructures={this.state.infrastructures}
          handleSubmit={this.handleSubmitProject}
          handleCancel={this.handleCancelProject}
          value={this.state.newProject}
          projectIndex={this.state.projectIndex}/>
      );
    }
    else if (this.state.createStageView && this.state.loaded) {
      return (
        <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
          <CreateStageForm handleSubmit={this.handleSubmitStage}
            handleCancel={this.handleCancelStage}
            topology={this.state.topology}
            value={this.state.newStage}/>
        </Layout>
      );
    }

    // todo: show loading
    return null;
  }
}

export default TopologyPage;
