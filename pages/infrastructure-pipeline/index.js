import React from 'react';
import cx from 'classnames';
import Layout from '../../components/Layout';
import StagesCanvasManager from '../../components/Canvas/StagesCanvasManager';
import Link from '../../components/Link/Link';
import Modal from '../../components/Modal/Modal';
import history from '../../core/history';
import labsApi from '../../data/index';
import selectors from '../../data/selectors';
import constants from '../../core/constants';
import c from '../common.css';

class InfrastructurePipelinePage extends React.Component {
  static propTypes = {
    route: React.PropTypes.object
  };

  state = {
    projectTemplates: [],
    infrastructures: [],
    stages: [],
    infrastructurePipeline: {},
    projectIndex: null,
    newStage: {},
    isBuildable: false,
    startBuildModal: false,
    missingInfra: [],
    loaded: false
  };

  componentWillMount() {
    this.startBuildModalId = 'startBuildModal';
    this.getInfrastructurePipeline(this.props.route.params.id);
  }

  componentDidMount() {
    document.title = constants.app_title;
  }

  getInfrastructurePipeline(id) {
    Promise.all([
      this.infrastructurePipelineGet(id),
      this.infraGet(),
      this.projectTemplatesGet()
    ]).then((values) => {
      const infrastructurePipeline = values[0];
      const infrastructures = values[1];
      const projectTemplates = values[2];
      this.setState({
        infrastructurePipeline,
        projectTemplates: projectTemplates || [],
        stages: infrastructurePipeline.promotion_process || [],
        infrastructures,
        isBuildable: selectors.hasStageProjects(infrastructurePipeline),
        loaded: true
      });
    });
  }

  infrastructurePipelineGet = id =>
    new Promise((resolve, reject) => {
      const infrastructurePipelineApi = new labsApi.InfrastructurePipelineApi();
      infrastructurePipelineApi.infrastructurePipelineIdGet(
        id,
        (err, infrastructurePipeline) => {
          if (err) reject(err);
          resolve(infrastructurePipeline);
        }
      );
    });

  updateInfrastructurePipeline = infrastructurePipeline =>
    new Promise((resolve, reject) => {
      const infrastructurePipelineApi = new labsApi.InfrastructurePipelineApi();
      infrastructurePipelineApi.updateInfrastructurePipeline(
        infrastructurePipeline.id,
        { body: infrastructurePipeline },
        (e, data) => {
          if (e) reject(e); // todo: handle error
          resolve(data);
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

  projectTemplatesGet = () =>
    new Promise((resolve, reject) => {
      const projectTemplatesApi = new labsApi.ProjectTemplateApi();
      projectTemplatesApi.projectTemplateGet((err, projectTemplates) => {
        if (err) reject(err);
        resolve(projectTemplates);
      });
    });

  handleCreateProject = (event) => {
    event.preventDefault();
    history.push('/project-templates');
  };

  // eslint-disable-next-line no-unused-vars
  handleProjectEdit = (event, index) => {
    event.preventDefault();
  };

  handleCreateStage = (event) => {
    event.preventDefault();
    history.push('/infrastructure-pipelines/create');
  };

  // eslint-disable-next-line no-unused-vars
  handleStageEdit = (event, index) => {
    // event.preventDefault();
  };

  // eslint-disable-next-line no-unused-vars
  handleStageDelete = (event, index) => {
    // const copy = this.state.topology.promotion_process.slice(0);
    // const topology = Object.assign({}, this.state.topology);
    // copy.splice(index, 1);
    // topology.promotion_process = copy;
    // this.saveTopology(event, topology);
  };

  // eslint-disable-next-line no-unused-vars
  handleStageMoved = (index, x, y) => {};

  // eslint-disable-next-line no-unused-vars
  handleAddStage = (stage) => {
    //   const topologyApi = new labsApi.TopologyApi();
    //   const topology = Object.assign({}, this.state.topology);
    //   topology.promotion_process.push(stage);
    //   topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
    //     if (e) console.log(e); // todo: handle error
    //     this.getTopology(); // refresh after update
    //   });
  };

  handleAddStageProject = (index, project) => {
    const infrastructurePipeline = Object.assign(
      {},
      this.state.infrastructurePipeline
    );
    infrastructurePipeline.promotion_process[
      index
    ].projects = infrastructurePipeline.promotion_process[index].projects || [];
    infrastructurePipeline.promotion_process[index].projects.push(project);

    this.updateInfrastructurePipeline(infrastructurePipeline).then(() => {
      this.setState({ isBuildable: true });
    });
  };

  handleDeleteStageProject = (index, projectIndex) => {
    const infrastructurePipeline = Object.assign(
      {},
      this.state.infrastructurePipeline
    );
    infrastructurePipeline.promotion_process[index].projects.splice(
      projectIndex,
      1
    );
    this.updateInfrastructurePipeline(infrastructurePipeline).then(() => {
      this.setState({
        isBuildable: selectors.hasStageProjects(infrastructurePipeline)
      });
    });
  };

  handleBuild = (event) => {
    event.preventDefault();

    // check the current state of infrastructures for stage projects before starting
    Promise.all([
      this.infrastructurePipelineGet(this.state.infrastructurePipeline.id),
      this.infraGet()
    ]).then((values) => {
      const infrastructurePipeline = values[0];
      const infrastructures = values[1];

      this.setState({
        infrastructurePipeline,
        stages: infrastructurePipeline.promotion_process || [],
        infrastructures,
        startBuildModal: true,
        missingInfra: selectors.missingInfra(
          infrastructurePipeline,
          infrastructures
        )
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
    this.state.infrastructurePipeline.promotion_process.forEach((stage) => {
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
              infrastructurePipelineId: this.state.infrastructurePipeline.id,
              dateTimeStarted: runningJobs[0].created,
              status: constants.ANSIBLE_JOB_STATUS.PENDING,
              runningJobs,
              projectJobs,
              number_of_projects: count
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

  // eslint-disable-next-line no-unused-vars
  handleProjectDelete = (event, index) => {
    // const copy = this.state.topology.project_templates.slice(0);
    // const topology = Object.assign({}, this.state.topology);
    // copy.splice(index, 1);
    // topology.project_templates = copy;
    // this.saveTopology(event, topology);
  };

  // saveTopology(event, topology) {
  //   event.preventDefault();
  //   const topologyApi = new labsApi.TopologyApi();
  //   topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
  //     if (e) console.log(e); // todo: handle error
  //     this.getTopology(); // refresh after update
  //   });
  // }

  render() {
    document.body.style.backgroundColor = constants.bg_white;

    if (this.state.loaded) {
      const content = [];

      // Breadcrumbs
      content.push(
        <div className="page-header" key="topologies-page-header">
          <ol className="breadcrumb">
            <li>
              <Link to="/infrastructure-pipelines">
                Infrastrucuture Pipelines
              </Link>
            </li>
            <li className="active">
              &nbsp; {this.state.infrastructurePipeline.name}
            </li>
            <div className={c.float_right}>
              <button type="submit"
                className="btn btn-default"
                onClick={this.handleCreateProject}>
                Create Project Template
              </button>
              &nbsp;&nbsp;
              <button type="submit"
                className="btn btn-primary"
                onClick={this.handleBuild}
                disabled={!this.state.isBuildable}>
                Build
              </button>
            </div>
          </ol>
        </div>
      );

      // Stages Canvas Manager
      content.push(
        <StagesCanvasManager projectTemplates={this.state.projectTemplates}
          stages={this.state.stages}
          handleProjectEdit={this.handleProjectEdit}
          handleProjectDelete={this.handleProjectDelete}
          handleCreateProject={this.handleCreateProject}
          handleCreateStage={this.handleCreateStage}
          deleteStageClicked={this.handleStageDelete}
          editStageClicked={this.handleStageEdit}
          handleStageMoved={this.handleStageMoved}
          handleAddStage={this.handleAddStage}
          handleAddStageProject={this.handleAddStageProject}
          handleDeleteStageProject={this.handleDeleteStageProject}/>
      );

      let modal;

      if (this.state.startBuildModal && this.state.missingInfra.length > 0) {
        // error modal, topology projects are missing buildable infrastructure
        modal = (
          <Modal id={this.startBuildModalId}
            handleClose={this.cancelStart}
            key="builds-modal">
            <div className="text-center">
              <div className={cx(c.spacing, c.slate_gray)}>
                <i className="fa fa-exclamation-circle fa-3x"
                  style={{ color: '#c00' }}/>
              </div>
              <h3>Infrastructure Not Ready</h3>
              <div className={c.spacing}>
                <p>
                  The following stages have incomplete infrastructure:
                </p>
                {this.state.missingInfra.map(missing => (
                  <div>
                    <b>Stage:</b>
                    {' '}
                    &nbsp;
                    <span>{missing.stage.name}</span>
                  </div>
                ))}
              </div>
              <p>Try again when infrastructures are ready.</p>
              <div className={c.spacing}>
                <button className="btn btn-primary btn-lg" onClick={this.cancelStart}>
                  OK
                </button>
              </div>
            </div>
          </Modal>
        );
      }
      else if (this.state.startBuildModal) {
        modal = (
          <Modal id={this.startBuildModalId}
            handleClose={this.cancelStart}
            key="builds-modal">
            <div className="text-center">
              <div className={cx(c.spacing, c.slate_gray)}>
                <i style={{ fontSize: 37, marginTop: 5, color: '#39a5dc' }}
                  className="pficon pficon-topology"/>
              </div>
              <h3>Build Infrastructure Pipeline</h3>
              <div className={c.spacing}>
                <strong>Pipeline:</strong> {this.state.infrastructurePipeline.name}
              </div>
              <p>Are you sure?</p>
              <div className={c.spacing}>
                <button className="btn btn-default btn-lg" onClick={this.cancelStart}>
                  No
                </button>
                &nbsp;
                <button className="btn btn-primary btn-lg" onClick={this.startBuild}>
                  Yes
                </button>
              </div>
            </div>
          </Modal>
        );
      }
      return (
        <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
          {content}
          {this.state.startBuildModal && modal}
        </Layout>
      );
    }

    // todo: show loading
    return null;
  }
}

export default InfrastructurePipelinePage;
