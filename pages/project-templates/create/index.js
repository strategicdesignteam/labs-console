import React from 'react';
import update from 'immutability-helper';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import ProjectCanvasManager
  from '../../../components/Canvas/ProjectCanvasManager';
import labsApi from '../../../data/index';
import { deepClone } from '../../../core/helpers';
import history from '../../../core/history';
import constants from '../../../core/constants';
import c from '../../common.css';

class CreateProjectTemplatePage extends React.Component {
  static propTypes = {
    route: React.PropTypes.object
  };

  static route() {
    history.push('/project-templates');
  }

  state = {
    projectTemplate: {},
    connections: [],
    nodeActions: [],
    nodes: [],
    selectedNodeIndex: -1
  };

  componentWillMount() {
    this.getProjectTemplate(this.props.route.params.id);
  }

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  getProjectTemplate(id) {
    if (id) {
      const projectTemplateApi = new labsApi.ProjectTemplateApi();
      projectTemplateApi.projectTemplateIdGet(id, (error, projectTemplate) => {
        this.setState({
          projectTemplate,
          nodes: projectTemplate.apps,
          loading: false
        });
      });
    }
    else {
      this.setState({ loading: false });
    }
  }

  moveNode = (index, x, y) => {
    const merged = update(this.state.nodes[index], { $merge: { x, y } });
    this.setState({
      nodes: update(this.state.nodes, { $splice: [[index, 1, merged]] })
    });
  };

  selectNode = (index) => {
    const updated = this.state.nodes.map((node, i) => ({
      ...node,
      selected: i === index
    }));
    this.setState({ nodes: updated, selectedNodeIndex: index });
  };

  deselectAllNodes = () =>
    this.state.nodes.map(node => ({ ...node, selected: false }));

  duplicateSelected = () => {
    const selected = this.state.nodes.find(node => node.selected);
    const cloned = {
      ...selected,
      id: -1,
      x: selected.x + 10,
      y: selected.y + 10,
      inputConnectors: [],
      validConnectionTypes: []
    };
    this.setState(update(this.state, { nodes: { $push: [cloned] } }));
  };

  deleteSelected = () => {
    const filtered = this.state.nodes.filter(node => !node.selected);
    this.setState({ nodes: filtered });
  };

  addNode = (item, x, y) => {
    const deselected = this.deselectAllNodes();
    const newNode = {
      ...item.itemAttributes,
      x,
      y,
      selected: true
    };
    deselected.push(newNode);
    this.setState({
      nodes: deselected,
      selectedNodeIndex: deselected.length - 1
    });
  };

  handleProjectChange = (e, prop) => {
    const o = Object.assign({}, this.state.projectTemplate);
    o[prop] = e.target.value;
    this.setState({ projectTemplate: o });
  };

  handleAppChange = (e) => {
    const newVal = JSON.parse(e.target.value);
    this.setState(
      update(this.state, {
        nodes: {
          [this.state.selectedNodeIndex]: {
            $set: newVal
          }
        }
      })
    );
  };

  canvasClicked = () => {
    const deselected = this.deselectAllNodes();
    this.setState({ nodes: deselected, selectedNodeIndex: -1 });
  };

  handleSubmit = (event) => {
    const projectTemplateApi = new labsApi.ProjectTemplateApi();
    const projectTemplate = deepClone(this.state.projectTemplate);
    projectTemplate.apps = this.state.nodes;

    if (projectTemplate.id >= 0) {
      projectTemplateApi.updateProjectTemplate(
        projectTemplate.id,
        { body: projectTemplate },
        (e) => {
          if (e) console.log(e); // todo: handle error
          CreateProjectTemplatePage.route();
        }
      );
    }
    else {
      projectTemplateApi.addProjectTemplate({ body: projectTemplate }, (e) => {
        // todo: display an error
        if (e) console.error(e);
        CreateProjectTemplatePage.route();
      });
    }
    event.preventDefault();
  };

  handleCancel = (event) => {
    event.preventDefault();
    CreateProjectTemplatePage.route();
  };

  render() {
    const breadcrumbs = (
      <div className="page-header" key="project-template-page-header">
        <ol className="breadcrumb">
          <li>
            <Link to="/project-templates">Project Templates</Link>
          </li>
          <li className="active">
            {Object.keys(this.state.projectTemplate).length === 0
              ? 'Create Project Template'
              : 'Edit Project Template'}
          </li>
          <div className={c.float_right}>
            <button type="submit"
              className="btn btn-default"
              onClick={this.handleCancel}>
              Cancel
            </button>
            &nbsp;&nbsp;
            <button type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
              disabled={this.state.nodes.length === 0}>
              Save
            </button>
          </div>
        </ol>
      </div>
    );

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
        {breadcrumbs}
        <ProjectCanvasManager project={this.state.projectTemplate}
          handleProjectChange={this.handleProjectChange}
          handleAppChange={this.handleAppChange}
          canvasClicked={this.canvasClicked}
          nodes={this.state.nodes}
          connections={this.state.connections}
          nodeActions={this.state.nodeActions}
          moveNode={this.moveNode}
          selectNode={this.selectNode}
          deselectAllNodes={this.deselectAllNodes}
          duplicateSelected={this.duplicateSelected}
          deleteSelected={this.deleteSelected}
          addNode={this.addNode}
          selectedNodeIndex={this.state.selectedNodeIndex}/>
      </Layout>
    );
  }
}

export default CreateProjectTemplatePage;
