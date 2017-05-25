import React from 'react';
import update from 'immutability-helper';
import Layout from '../Layout';
import Link from '../Link';
import ProjectCanvasManager from '../Canvas/ProjectCanvasManager';
import labsApi from '../../data/index';
import { deepClone } from '../../core/helpers';
import c from '../../pages/common.css';

class ProjectView extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    topology: React.PropTypes.object,
    infrastructures: React.PropTypes.array,
    value: React.PropTypes.object,
    projectIndex: React.PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      project: {},
      connections: [],
      nodeActions: [],
      selectedNodeIndex: -1
    };

    // cloned project for state modification
    const project = deepClone(props.value);
    project.apps = project.apps || [];
    project.type = project.type || 'OpenStack';
    this.state.project = project;
    this.state.nodes = project.apps || [];

    this.moveNode = (index, x, y) => {
      const merged = update(this.state.nodes[index], { $merge: { x, y } });
      this.setState({
        nodes: update(this.state.nodes, { $splice: [[index, 1, merged]] })
      });
    };
    this.selectNode = (index) => {
      const updated = this.state.nodes.map((node, i) => ({
        ...node,
        selected: i === index
      }));
      this.setState({ nodes: updated, selectedNodeIndex: index });
    };
    this.deselectAllNodes = () =>
      this.state.nodes.map(node => ({ ...node, selected: false }));
    this.duplicateSelected = () => {
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
    this.deleteSelected = () => {
      const filtered = this.state.nodes.filter(node => !node.selected);
      this.setState({ nodes: filtered });
    };
    this.addNode = (item, x, y) => {
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

    this.handleProjectChange = (e, prop) => {
      const o = Object.assign({}, this.state.project);
      o[prop] = e.target.value;

      if (prop === 'infrastructure') {
        const infra = this.props.infrastructures.find(
          infrastructure => infrastructure.id === e.target.value
        );
        o.infrastructureProvider = infra.provider;
        o.infrastructureName = infra.name;
      }

      this.setState({ project: o });
    };

    this.handleAppChange = (e) => {
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

    this.canvasClicked = () => {
      const deselected = this.deselectAllNodes();
      this.setState({ nodes: deselected, selectedNodeIndex: -1 });
    };

    this.handleSubmit = (event) => {
      const topologyApi = new labsApi.TopologyApi();
      const topology = Object.assign({}, this.props.topology);
      if (this.props.projectIndex !== null) {
        topology.project_templates[
          this.props.projectIndex
        ] = this.state.project;
        topology.project_templates[
          this.props.projectIndex
        ].apps = this.state.nodes;
      }
      else {
        topology.project_templates.push(this.state.project);
        topology.project_templates[
          topology.project_templates.length - 1
        ].apps = this.state.nodes;
      }
      topologyApi.updateTopology(topology.id, { body: topology }, (e) => {
        if (e) console.log(e); // todo: handle error
        this.props.handleSubmit(event);
      });
      event.preventDefault();
    };
  }

  render() {
    const { handleCancel, topology, infrastructures, value } = this.props;

    const breadcrumbs = (
      <div className="page-header" key="topologies-page-header">
        <ol className="breadcrumb">
          <li>
            <Link to="/topologies">Topologies</Link>
          </li>
          <li>
            <a href="#" onClick={handleCancel}>
              {topology.name}
            </a>
          </li>
          <li className="active">
            {Object.keys(value).length === 0
              ? 'Create Project Template'
              : 'Edit Project Template'}
          </li>
          <div className={c.float_right}>
            <button type="submit"
              className="btn btn-default"
              onClick={handleCancel}>
              Cancel
            </button>
            &nbsp;&nbsp;
            <button type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}>
              Save
            </button>
          </div>
        </ol>
      </div>
    );

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
        {breadcrumbs}
        <ProjectCanvasManager project={this.state.project}
          infrastructures={infrastructures}
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

export default ProjectView;
