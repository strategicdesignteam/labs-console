import React, { PropTypes } from 'react';
import Layout from '../Layout';
import Link from '../Link';
import Modal from '../Modal/Modal';
import update from 'immutability-helper'
import ProjectCanvasManager from '../Canvas/ProjectCanvasManager'
import labsApi from '../../data/index';
import {deepClone} from '../../core/helpers';
import history from '../../core/history';
import constants from '../../core/constants';
import c from '../../pages/common.css';
import cx from 'classnames';

class ProjectView extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    topology: React.PropTypes.object,
    infrastructures: React.PropTypes.array,
    value: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      project: {},
      connections: [],
      nodeActions: [],
      selectedNodeIndex: -1
    }

    //cloned project for state modification
    let project = deepClone(props.value);
    project.apps = project.apps || [];
    project.type = project.type || 'OpenStack';
    this.state.project = project;
    this.state.nodes = project.apps || [];

    this.moveNode = (index, x, y) => {
      let merged = update(this.state.nodes[index], {$merge: {x: x, y: y}})
      this.setState({nodes: update(this.state.nodes, {$splice: [[index, 1, merged]]})})
    }
    this.selectNode = (index) => {
      const updated = this.state.nodes.map((node, i) => { return {...node, selected: i === index} })
      this.setState({nodes: updated, selectedNodeIndex: index})
    }
    this.deselectAllNodes = () => {
      return this.state.nodes.map((node) => { return {...node, selected: false} })
    }
    this.duplicateSelected = () => {
      const selected = this.state.nodes.find((node) => { return node.selected })
      const cloned = {
        ...selected,
        id: -1,
        x: selected.x + 10,
        y: selected.y + 10,
        inputConnectors: [],
        validConnectionTypes: []
      }
      this.setState(update(this.state, {nodes: {$push: [cloned]}}))
    }
    this.deleteSelected = () => {
      const filtered = this.state.nodes.filter((node) => { return !node.selected })
      this.setState({nodes: filtered})
    }
    this.addNode = (item, x, y) => {
      let deselected = this.deselectAllNodes()
      const newNode = {
        ...item.itemAttributes,
        x: x,
        y: y,
        selected: true
      }
      deselected.push(newNode)
      this.setState({nodes: deselected, selectedNodeIndex: deselected.length - 1})
    }

    this.handleProjectChange = (e, prop) => {
      let o = Object.assign({}, this.state.project);
      o[prop] = e.target.value;

      if(prop === 'infrastructure'){
        let infra = this.props.infrastructures.find((infra) => { 
          return infra.id == e.target.value
        });
        o['infrastructureProvider'] = infra.provider;
      }

      this.setState({ project: o });
    } 

    this.handleAppChange = (e) => {
      let newVal = JSON.parse(e.target.value);
      this.setState(update(this.state, {
        nodes: {
          [this.state.selectedNodeIndex]: {
             $set: newVal
          }
        }
      }))
    }

    this.canvasClicked = (e) => {
      const deselected = this.deselectAllNodes();
      this.setState({nodes: deselected, selectedNodeIndex: -1})
    }

    this.handleSubmit = (event) => {
      let topologyApi = new labsApi.TopologyApi();
      let topology = Object.assign({}, this.props.topology);
      if(this.state.project.id){
        //existing project, just update
        let index = topology.project_templates.findIndex((p) => { 
          return p.id === this.state.project.id 
        });
        if(index > -1){
          topology.project_templates[index] = this.state.project;
          topology.project_templates[index].apps = this.state.nodes;
        }
      } else {
        topology.project_templates.push(this.state.project);
        topology.project_templates[topology.project_templates.length -1].apps = this.state.nodes;
      }
      topologyApi.updateTopology(topology.id, {'body': topology}, (e) => {
        if(e) console.log(e); //todo: handle error
        this.props.handleSubmit(event);
      });
      event.preventDefault();
    } 
  }

  render() {
    const {
      handleCancel,
      topology,
      infrastructures,
      value
    } = this.props;

    let content = [];

    let breadcrumbs = <div className="page-header" key="topologies-page-header">
      <ol className="breadcrumb">
        <li>
          <Link to="/topologies">Topologies</Link>
        </li>
        <li >
          <a href="#" onClick={handleCancel}>
            {topology.name}
          </a>
        </li>
        <li className="active">
          {Object.keys(value).length === 0 ? 'Create Project Template' : 'Edit Project Template'}
        </li>
        <div className={c.float_right}>
          <button type="submit" className="btn btn-default" onClick={handleCancel}>Cancel</button>
          &nbsp;&nbsp;
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
        </div>
      </ol>
    </div>

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={true}>
        {breadcrumbs}
        <ProjectCanvasManager 
          project={this.state.project} 
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
          selectedNodeIndex={this.state.selectedNodeIndex} />
      </Layout>
    )
  }

}

export default ProjectView;