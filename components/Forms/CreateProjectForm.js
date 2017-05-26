import React from 'react';
import cx from 'classnames';
import EmptyState from '../EmptyState/EmptyState';
import AppsListView from '../ListView/AppsListView';
import CreateAppForm from './CreateAppForm';
import labsApi from '../../data/index';
import c from '../../pages/common.css';

class CreateProjectForm extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    topology: React.PropTypes.object,
    value: React.PropTypes.object
  };

  state = {
    createProjectView: true,
    createAppView: false,
    newProject: {},
    newApp: { json: '' },
    type: 'OpenShift'
  };

  componentWillMount() {
    const newProject = Object.assign({}, this.props.value);
    newProject.apps = newProject.apps || [];
    newProject.type = newProject.type || 'OpenShift';
    this.setState({ newProject });
  }

  handleSubmit = (event) => {
    const topologyApi = new labsApi.TopologyApi();
    const topology = Object.assign({}, this.props.topology);
    if (this.state.newProject.id) {
      // existing project, just update
      const index = topology.project_templates.findIndex(
        p => p.id === this.state.newProject.id
      );
      if (index > -1) {
        topology.project_templates[index] = this.state.newProject;
      }
    }
    else {
      topology.project_templates.push(this.state.newProject);
    }
    topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
      if (e) console.log(e); // todo: handle error
      this.props.handleSubmit(event);
    });
    event.preventDefault();
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  handleCreateApp = (event) => {
    this.setState({
      createProjectView: false,
      createAppView: true,
      newApp: { json: '' }
    });
    event.preventDefault();
  };

  handleCreateAppSubmit = (event, newApp) => {
    if (newApp.index) {
      this.state.newProject.apps[newApp.index] = newApp.json;
    }
    else {
      this.state.newProject.apps.push(newApp.json);
    }
    this.setState({ createProjectView: true, createAppView: false });
    event.preventDefault();
  };

  handleCreateAppCancel = (event) => {
    this.setState({ createProjectView: true, createAppView: false });
    event.preventDefault();
  };

  handleChange = (e, prop) => {
    const o = Object.assign({}, this.state.newProject);
    o[prop] = e.target.value;
    this.setState({ newProject: o });
  };

  handleAppClick = (event, i) => {
    this.setState({
      newApp: { index: i, json: this.state.newProject.apps[i] },
      createProjectView: false,
      createAppView: true
    });
  };

  handleDelete = (event, i) => {
    this.state.newProject.apps.splice(i, 1);
    this.setState({ newProject: this.state.newProject });
    event.preventDefault();
  };

  render() {
    if (this.state.createProjectView) {
      return (
        <form role="form">
          <h2>
            {Object.keys(this.props.value).length === 0
              ? 'Create Project Template'
              : 'Edit Project Template'}
          </h2>
          <hr/>
          <div className="form-group">
            <label htmlFor="input1" className="required-pf">Project Name</label>
            <input type="text"
              className="form-control"
              id="input1"
              required=""
              placeholder="project-name"
              value={this.state.newProject.name}
              onChange={(e) => {
                this.handleChange(e, 'name');
              }}/>
          </div>
          <div className="form-group">
            <label htmlFor="input2" className="required-pf">Display Name</label>
            <input type="text"
              className="form-control"
              id="input2"
              required=""
              placeholder="Display Name"
              value={this.state.newProject.display_name}
              onChange={(e) => {
                this.handleChange(e, 'display_name');
              }}/>
          </div>
          <div className="form-group">
            <label className="required-pf" htmlFor="projectTypeLabel">
              <span id="projectTypeLabel">Project Type</span>
            </label>
            <br/>
            <select value={this.state.newProject.type}
              className="selectpicker form-control"
              onChange={(e) => {
                this.handleChange(e, 'type');
              }}>
              <option>OpenShift</option>
              <option>OpenStack</option>
              <option>AWS</option>
              <option>Google Cloud</option>
              <option>Azure</option>
              <option>RHEV</option>
              <option>VMWare</option>
            </select>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="appsLabel">
              <span id="appsLabel">Applications</span>
            </label>

            {(() => {
              if (this.state.newProject.apps.length) {
                return [
                  <div className={cx(c.float_right, c.padding_right)}
                    key="create-button">
                    <button type="submit"
                      className="btn btn-default"
                      onClick={this.handleCreateApp}>
                      Create
                    </button>
                  </div>,
                  <AppsListView apps={this.state.newProject.apps}
                    handleAppClick={this.handleAppClick.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                    key="app-list-view"/>
                ];
              }
              return (
                <EmptyState hideTitle>
                  <div className="text-center">
                    <h4>Project contains no apps.</h4>
                    <p>
                      A project must contain at least one app. Add one or more apps for the project to continue.
                    </p>
                    <button type="submit"
                      className="btn btn-default"
                      onClick={this.handleCreateApp}>
                      Create App
                    </button>
                  </div>
                </EmptyState>
              );
            })()}
          </div>
          <div className="form-group text-center">
            <button type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}>
              Save
            </button>
            &nbsp;&nbsp;
            <button type="submit"
              className="btn btn-default"
              onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      );
    }
    else if (this.state.createAppView) {
      return (
        <CreateAppForm handleSubmit={this.handleCreateAppSubmit.bind(this)}
          handleCancel={this.handleCreateAppCancel.bind(this)}
          value={this.state.newApp}/>
      );
    }
  }
}

export default CreateProjectForm;
