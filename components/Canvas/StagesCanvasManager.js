import React from 'react'
import { DragDropContext } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import {mockContainerNodes} from './containerNodes'
import update from 'immutability-helper'
import {deepClone} from '../../core/helpers'
import {infraImage} from './CanvasHelpers'
import {emptyStageNode} from './EmptyStageNode'
import {emptyProjectNode} from './EmptyProjectNode'
import cx from 'classnames'
import Canvas from './Canvas'
import CanvasConstants from './CanvasConstants'
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
      toolboxOpen: props.projects.length > 0,
      readOnly: false,
      inConnectingMode: false,
      canvasHeight: CanvasConstants.CANVAS_HEIGHT,
      canvasWidth: CanvasConstants.CANVAS_WIDTH,
      stageWidth: CanvasConstants.STAGE_WIDTH,
      stageHeight: CanvasConstants.STAGE_HEIGHT,
      zoomLevel: parseFloat('.75'),
      maxZoom: 1,
      minZoom: parseFloat('.5'),
      zoomIncrement: parseFloat('.25'),
      zoomOutDisabled: false,
      zoomInDisabled: false,
      selectedStageIndex: -1
    }

    this.toggleToolboxOpen = (event) => {
      this.setState((prevState, props) => { return {toolboxOpen: !prevState.toolboxOpen} })
    }
    this.closeToolboxClicked = (event) => {
      this.setState({toolboxOpen: false})
    }
    this.moveNode = (index, x, y) => {
      //i am intercepting this at the Stage Manager level to make the UI drag smooth
      let merged = update(this.state.nodes[index], {$merge: {x: x, y: y}})
      this.setState({nodes: update(this.state.nodes, {$splice: [[index, 1, merged]]})})

      if(!this.state.nodes[index].emptyStageNode){
        //fire off a save and hope it works...
        this.props.handleStageMoved(index, x, y);
      }
    }
    this.selectNode = (index) => {
      if(!this.state.nodes[index].emptyStageNode){
        const updated = this.state.nodes.map((node, i) => { return {...node, selected: i === index} })
        this.setState({nodes: updated, selectedStageIndex: index})
      }
    }
    this.deselectAllNodes = () => {
      return this.state.nodes.map((node) => { return {...node, selected: false} })
    }
    this.duplicateSelected = () => {
      let clonedStage = deepClone(this.state.nodes[this.state.selectedStageIndex])
      clonedStage.x = clonedStage.x + CanvasConstants.DUPLICATE_X_OFFSET
      clonedStage.y = clonedStage.y + CanvasConstants.DUPLICATE_Y_OFFSET

      this.props.handleAddStage(clonedStage);
    }
    this.deleteSelected = (e) => {
      if(this.state.selectedStageIndex > -1) {
        this.props.deleteStageClicked(e, this.state.selectedStageIndex)
        this.setState({selectedStageIndex: -1})
      }
    }
    this.editSelected = (e) => {
      if(this.state.selectedStageIndex > -1) {
        this.props.editStageClicked(e, this.state.selectedStageIndex)
      }
    }
    this.addContainerNodeItem = (index, containerNodeItem) => {      
      //create an instance of the project with the specified type from the containerNodeItem (project template)
      //handle any "instantiation" logic associated with project template to --> stage project here.
      let project = deepClone(containerNodeItem.itemAttributes)
      project.image = infraImage(project.type)
      project.backgroundColor = CanvasConstants.STAGE_BACKGROUND_COLOR;

      //todo: set label based on infrastructure type & PaaS
      project.label = 'Open Shift on ' + project.type; 

      //again, i am intercepting this at the Stage Manager level to make the UI more responsive immediately
      this.setState(update(this.state, {
        nodes: {
          [index]: {
            containerItems:
            {$push: [project]}
          }
        }
      }))
      //fire off save and hope it works
      this.props.handleAddStageProject(index, project);
    }
    this.removeContainerNodeItem = (index, containerNodeItemIndex) => {
      //again, i am intercepting this at the Stage Manager level to make the UI more responsive immediately
      this.setState(update(this.state, {
        nodes: {
          [index]: {
            containerItems:
            {$splice: [[containerNodeItemIndex, 1]]}
          }
        }
      }))
      //fire off save and hope it works
      this.props.handleDeleteStageProject(index, containerNodeItemIndex);
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
    this.nodeButtonClicked = (e, index) => {
      if(this.state.nodes[index].emptyStageNode){
        this.props.handleCreateStage(e);
      }
      if(this.state.nodes[index].emptyProjectNode){
        this.props.handleCreateProject(e);
      }
    }
  }

  componentWillMount(){
    this.createNodesFromStages(this.props.stages, this.props.projects);
  }

  componentWillReceiveProps(nextProps) {
    this.createNodesFromStages(nextProps.stages, nextProps.projects);
  }

  createNodesFromStages(stages, projects){
    let additionalNodes = []
    if(!projects.length){
      additionalNodes.push(emptyProjectNode);
    }
    else if(stages.length < CanvasConstants.MAX_STAGES){
      const rows = Math.floor((stages.length) / (CanvasConstants.MAX_STAGES_IN_ROW))
      let emptyNode = {
        ...emptyStageNode,
        x: ((stages.length % CanvasConstants.MAX_STAGES_IN_ROW) * CanvasConstants.STAGE_WIDTH) 
          + (((stages.length % CanvasConstants.MAX_STAGES_IN_ROW) + 1) * CanvasConstants.STAGE_PADDING_X),
        y: (rows * CanvasConstants.STAGE_HEIGHT) + ((rows + 1) * CanvasConstants.STAGE_PADDING_Y),
      }
      additionalNodes.push(emptyNode);
    }
    // extend stages with UI specific properties
    let extended = stages.map((stage) => { 
      return {
        ...stage, 
        titleYOffset : CanvasConstants.STAGE_TITLE_Y_OFFSET,
        width: CanvasConstants.STAGE_WIDTH,
        height: CanvasConstants.STAGE_HEIGHT,
        backgroundColor: CanvasConstants.STAGE_BACKGROUND_COLOR,
        maxDisplayItems: CanvasConstants.STAGE_MAX_DISPLAY_ITEMS,
        containerItems: stage.projects,
        selected: false
      }
    })
    this.setState({nodes: [...extended, ...additionalNodes]})
  }

  render () {
    const {projects, stages, handleProjectEdit, handleProjectDelete, handleCreateStage} = this.props;

    return (
      <CanvasLayout>
        <CanvasToolbar
          toolboxButtonLabel='Project Templates'
          toolboxButtonClass='btn btn-default'
          toolboxClicked={this.toggleToolboxOpen}
          toolboxOpen={this.state.toolboxOpen}
          duplicateClicked={this.duplicateSelected}
          duplicateDisabled={this.state.selectedStageIndex < 0}
          deleteClicked={this.deleteSelected}
          deleteDisabled={this.state.selectedStageIndex < 0}
          editClicked={this.editSelected}
          editDisabled={this.state.selectedStageIndex < 0}
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
                  <img src={infraImage(project.type)} />
                  <span> {project.name} </span>
                  <button className='edit-btn icon' onClick={(e) => {handleProjectEdit(e, i)}}>
                    <i className='fa fa-pencil'></i>
                  </button>
                  <button className='close-btn icon' onClick={(e) => {handleProjectDelete(e, i)}}>
                    <i className='fa fa-trash-o'></i>
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
          nodeButtonClicked={this.nodeButtonClicked}
          addContainerNodeItem={this.addContainerNodeItem}
          removeContainerNodeItem={this.removeContainerNodeItem}
          containerNodeItemClicked={this.containerNodeItemClicked}
          canvasDropItemTypes={[CanvasItemTypes.CANVAS_NODE]}>
          {/**<CanvasPanel panelClass='stages-panel canvas-panel' panelTitle='Promotion Stage' />**/}
        </Canvas>
      </CanvasLayout>
    )
  }
}

export default DragDropContext(MouseBackEnd)(StagesCanvasManager)
