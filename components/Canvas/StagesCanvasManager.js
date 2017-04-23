import React from 'react'
import { DragDropContext } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import {mockContainerNodes} from './containerNodes'
import update from 'immutability-helper'
import cx from 'classnames'
import Canvas from './Canvas'
import CanvasItemTypes from './CanvasItemTypes'
import CanvasLayout from './CanvasLayout'
import CanvasPanel from './CanvasPanel'
import CanvasToolbar from './CanvasToolbar'
import CanvasScrollToolbox from './CanvasScrollToolbox'
import CustomDragLayer from './CustomDragLayer'
import DraggableTopAlignedToolboxItem from './DraggableTopAlignedToolboxItem'

/**
 * Canvas Manager for Patternfly React
 */
class StagesCanvasManager extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toolboxOpen: true,
      tabOneActive: true,
      readOnly: false,
      inConnectingMode: false,
      canvasHeight: 756,
      canvasWidth: 1396,
      zoomLevel: parseFloat('.75'),
      maxZoom: 1,
      minZoom: parseFloat('.5'),
      zoomIncrement: parseFloat('.25'),
      zoomOutDisabled: false,
      zoomInDisabled: true,
      connections: [],
      nodeActions: [],
      nodes: mockContainerNodes,
      toolboxItems: [
        mockContainerNodes[0].containerItems[0],
        mockContainerNodes[0].containerItems[1],
        { ...mockContainerNodes[1].containerItems[0] },
        { ...mockContainerNodes[1].containerItems[1] },
        { ...mockContainerNodes[1].containerItems[2], icon: 'pf pficon-network' },
        { ...mockContainerNodes[0].containerItems[2], icon: 'fa fa-cloud' }
      ]
    }
    this.setTabOneActive = (event, active) => {
      this.setState({tabOneActive: active})
    }
    this.toggleToolboxOpen = (event) => {
      this.setState((prevState, props) => { return {toolboxOpen: !prevState.toolboxOpen} })
    }
    this.closeToolboxClicked = (event) => {
      this.setState({toolboxOpen: false})
    }
    this.moveNode = (index, x, y) => {
      let merged = update(this.state.nodes[index], {$merge: {x: x, y: y}})
      this.setState({nodes: update(this.state.nodes, {$splice: [[index, 1, merged]]})})
    }
    this.selectNode = (index) => {
      const updated = this.state.nodes.map((node, i) => { return {...node, selected: i === index} })
      this.setState({nodes: updated})
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
        validConnectionTypes: [...selected.validConnectionTypes]
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
      this.setState({nodes: deselected})
    }
    this.addContainerNodeItem = (index, containerNodeItem) => {
      this.setState(update(this.state, {
        nodes: {
          [index]: {
            containerItems:
            {$push: [containerNodeItem.itemAttributes]}
          }
        }
      }))
    }
    this.removeContainerNodeItem = (index, containerNodeItemIndex) => {
      this.setState(update(this.state, {
        nodes: {
          [index]: {
            containerItems:
            {$splice: [[containerNodeItemIndex, 1]]}
          }
        }
      }))
    }
    this.containerNodeItemClicked = (index, containerNodeItemIndex) => {
      // handle any container node item click logic here
    }
    this.zoomInClicked = () => {
      if (this.state.zoomLevel < this.state.maxZoom) {
        const level = (this.state.zoomLevel * 10 + this.state.zoomIncrement * 10) / 10
        this.setState({zoomLevel: level, zoomInDisabled: level === this.state.maxZoom, zoomOutDisabled: false})
      }
    }
    this.zoomOutClicked = () => {
      if (this.state.zoomLevel > this.state.minZoom) {
        const level = (this.state.zoomLevel * 10 - this.state.zoomIncrement * 10) / 10
        this.setState({zoomLevel: level, zoomOutDisabled: level === this.state.minZoom, zoomInDisabled: false})
      }
    }
    this.getInfraImage = (type) => {
      switch(type){
        case 'OpenShift':
          return '/img/OpenShift-logo.svg';
        case 'AWS':
          return '/img/aws.svg';
        case 'OpenStack':
          return '/img/shadowman.svg';
        case 'Google Cloud':
          return '/img/google-cloud.png';
        case 'Azure':
          return '/img/azure.svg';
        case 'RHEV':
          return '/img/shadowman.svg';
        case 'VMWare':
          return '/img/vmware.png';
        default:
          return '/img/shadowman.svg';
      }
    }
  }
  render () {
    const {projects, stages, handleProjectEdit, handleProjectDelete} = this.props;

    return (
      <CanvasLayout>
        <CanvasToolbar
          toolboxButtonLabel='Projects'
          toolboxButtonClass='btn btn-default'
          toolboxClicked={this.toggleToolboxOpen}
          toolboxOpen={this.state.toolboxOpen}
          duplicateClicked={this.duplicateSelected}
          deleteClicked={this.deleteSelected}
          zoomInClicked={this.zoomInClicked}
          zoomInDisabled={this.state.zoomInDisabled}
          zoomOutClicked={this.zoomOutClicked}
          zoomOutDisabled={this.state.zoomOutDisabled} />
        <CustomDragLayer canvasClass='stage-canvas' />
        <CanvasScrollToolbox isOpen={this.state.toolboxOpen}>
          <ul className='toolbox-items-list'>
            {projects.length > 0 && projects.map((project, i) =>{
              return <DraggableTopAlignedToolboxItem itemAttributes={project} 
                  canvasSourceItemType={CanvasItemTypes.SCROLL_TOOLBOX_ITEM} key={'drag-item' + i}>
                <div className='toolbox-item-container'>
                  <img src={this.getInfraImage(project.type)} />
                  <span> {project.name} </span>
                  <button className='edit-btn icon' onClick={(e) => {handleProjectEdit(e, i)}}>
                    <i className='fa fa-pencil'></i>
                  </button>
                  <button className='close-btn icon' onClick={(e) => {handleProjectDelete(e, i)}}>
                    <span className='pficon pficon-close'></span>
                  </button>
                </div>
              </DraggableTopAlignedToolboxItem>
            })}            
          </ul>
        </CanvasScrollToolbox>        
        <Canvas
          canvasClass='canvas stage-canvas'
          readOnly={this.state.readOnly}
          inConnectingMode={this.state.inConnectingMode}
          canvasHeight={this.state.canvasHeight}
          canvasWidth={this.state.canvasWidth}
          zoomLevel={this.state.zoomLevel}
          connections={this.state.connections}
          nodeActions={this.state.nodeActions}
          nodes={this.state.nodes}
          moveNode={this.moveNode}
          selectNode={this.selectNode}
          duplicateSelected={this.duplicateSelected}
          deleteSelected={this.deleteSelected}
          addNode={this.addNode}
          addContainerNodeItem={this.addContainerNodeItem}
          removeContainerNodeItem={this.removeContainerNodeItem}
          containerNodeItemClicked={this.containerNodeItemClicked}
          canvasDropItemTypes={[CanvasItemTypes.CANVAS_NODE]}>
          <CanvasPanel panelTitle='Promotion Stage' />
        </Canvas>
      </CanvasLayout>
    )
  }
}

export default DragDropContext(MouseBackEnd)(StagesCanvasManager)
