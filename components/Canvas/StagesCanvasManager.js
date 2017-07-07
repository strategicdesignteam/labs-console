import React from 'react';
import { DragDropContext } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend';
import update from 'immutability-helper';
import { deepClone } from '../../core/helpers';
import Canvas from './Canvas';
import CanvasConstants from './CanvasConstants';
import CanvasItemTypes from './CanvasItemTypes';
import CanvasLayout from './CanvasLayout';
import CanvasToolbar from './CanvasToolbar';
import CanvasScrollToolbox from './CanvasScrollToolbox';
import CustomDragLayer from './CustomDragLayer';
import DraggableTopAlignedToolboxItem from './DraggableTopAlignedToolboxItem';

/**
 * Canvas Manager for Patternfly React
 */
class StagesCanvasManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxOpen: props.projectTemplates.length > 0,
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
    };

    this.toggleToolboxOpen = () => {
      this.setState(prevState => ({
        toolboxOpen: !prevState.toolboxOpen
      }));
    };
    this.closeToolboxClicked = () => {
      this.setState({ toolboxOpen: false });
    };
    this.moveNode = (index, x, y) => {
      // i am intercepting this at the Stage Manager level to make the UI drag smooth
      const merged = update(this.state.nodes[index], { $merge: { x, y } });
      this.setState({
        nodes: update(this.state.nodes, { $splice: [[index, 1, merged]] })
      });

      if (!this.state.nodes[index].emptyStageNode) {
        // fire off a save and hope it works...
        this.props.handleStageMoved(index, x, y);
      }
    };
    this.selectNode = (index) => {
      if (!this.state.nodes[index].emptyStageNode) {
        const updated = this.state.nodes.map((node, i) => ({
          ...node,
          selected: i === index
        }));
        this.setState({ nodes: updated, selectedStageIndex: index });
      }
    };
    this.deselectAllNodes = () =>
      this.state.nodes.map(node => ({ ...node, selected: false }));
    this.duplicateSelected = () => {
      const clonedStage = deepClone(
        this.state.nodes[this.state.selectedStageIndex]
      );
      clonedStage.x += CanvasConstants.DUPLICATE_X_OFFSET;
      clonedStage.y += CanvasConstants.DUPLICATE_Y_OFFSET;

      this.props.handleAddStage(clonedStage);
    };
    this.deleteSelected = (e) => {
      if (this.state.selectedStageIndex > -1) {
        this.props.deleteStageClicked(e, this.state.selectedStageIndex);
        this.setState({ selectedStageIndex: -1 });
      }
    };
    this.editSelected = (e) => {
      if (this.state.selectedStageIndex > -1) {
        this.props.editStageClicked(e, this.state.selectedStageIndex);
      }
    };
    this.addContainerNodeItem = (index, containerNodeItem) => {
      // create an instance of the project with the specified type from the containerNodeItem (project template)
      // handle any "instantiation" logic associated with project template to --> stage project here.
      const project = deepClone(containerNodeItem.itemAttributes);
      project.label = project.name;
      project.name += `-${this.state.nodes[index].name.toLowerCase()}`;
      project.projectTemplate = containerNodeItem.id;
      project.image = project.apps[0].image;
      project.backgroundColor = CanvasConstants.STAGE_BACKGROUND_COLOR;

      // again, i am intercepting this at the Stage Manager level to make the UI more responsive immediately
      this.setState(
        update(this.state, {
          nodes: {
            [index]: {
              containerItems: { $push: [project] }
            }
          }
        })
      );
      // fire off save and hope it works
      this.props.handleAddStageProject(index, project);
    };
    this.removeContainerNodeItem = (index, containerNodeItemIndex) => {
      // again, i am intercepting this at the Stage Manager level to make the UI more responsive immediately
      this.setState(
        update(this.state, {
          nodes: {
            [index]: {
              containerItems: { $splice: [[containerNodeItemIndex, 1]] }
            }
          }
        })
      );
      // fire off save and hope it works
      this.props.handleDeleteStageProject(index, containerNodeItemIndex);
    };
    // eslint-disable-next-line no-unused-vars
    this.containerNodeItemClicked = (index, containerNodeItemIndex) => {
      // handle any container node item click logic here
    };
    this.zoomInClicked = () => {
      if (this.state.zoomLevel < this.state.maxZoom) {
        const level =
          (this.state.zoomLevel * 10 + this.state.zoomIncrement * 10) / 10;
        this.setState({
          zoomLevel: level,
          zoomInDisabled: level === this.state.maxZoom,
          zoomOutDisabled: false
        });
      }
    };
    this.zoomOutClicked = () => {
      if (this.state.zoomLevel > this.state.minZoom) {
        const level =
          (this.state.zoomLevel * 10 - this.state.zoomIncrement * 10) / 10;
        this.setState({
          zoomLevel: level,
          zoomOutDisabled: level === this.state.minZoom,
          zoomInDisabled: false
        });
      }
    };
    this.nodeButtonClicked = (e, index) => {
      if (this.state.nodes[index].emptyStageNode) {
        this.props.handleCreateStage(e);
      }
      if (this.state.nodes[index].emptyProjectNode) {
        this.props.handleCreateProject(e);
      }
    };
  }

  componentWillMount() {
    this.createNodesFromStages(this.props.stages, this.props.projectTemplates);
  }

  componentWillReceiveProps(nextProps) {
    this.createNodesFromStages(nextProps.stages, nextProps.projectTemplates);
  }

  createNodesFromStages(stages) {
    const additionalNodes = [];
    let extended = [];

    const rows = Math.floor(stages.length / CanvasConstants.MAX_STAGES_IN_ROW);
    extended = stages.map((stage, i) => ({
      ...stage,
      titleYOffset: CanvasConstants.STAGE_TITLE_Y_OFFSET,
      width: CanvasConstants.STAGE_WIDTH,
      height: CanvasConstants.STAGE_HEIGHT,
      backgroundColor: CanvasConstants.STAGE_BACKGROUND_COLOR,
      maxDisplayItems: CanvasConstants.STAGE_MAX_DISPLAY_ITEMS,
      containerItems: stage.projects,
      selected: false,
      x: i % CanvasConstants.MAX_STAGES_IN_ROW * CanvasConstants.STAGE_WIDTH +
        (i % CanvasConstants.MAX_STAGES_IN_ROW + 1) *
          CanvasConstants.STAGE_PADDING_X,
      y: rows * CanvasConstants.STAGE_HEIGHT +
        (rows + 1) * CanvasConstants.STAGE_PADDING_Y,
      containerNode: true,
      containerNodeDropItemTypes: [CanvasItemTypes.SCROLL_TOOLBOX_ITEM]
    }));

    // extend stages with UI specific properties
    this.setState({
      nodes: [...extended, ...additionalNodes]
    });
  }

  render() {
    const {
      projectTemplates,
      handleProjectEdit,
      handleProjectDelete
    } = this.props;

    return (
      <CanvasLayout>
        <CanvasToolbar toolboxButtonLabel="Project Templates"
          toolboxButtonClass="btn btn-default"
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
          zoomOutDisabled={this.state.zoomOutDisabled}/>
        <CustomDragLayer canvasClass="stage-canvas"/>
        <CanvasScrollToolbox isOpen={this.state.toolboxOpen}>
          <ul className="toolbox-items-list">
            {projectTemplates.length > 0 &&
              projectTemplates.map((projectTemplate, i) => (
                <DraggableTopAlignedToolboxItem itemAttributes={projectTemplate}
                  canvasSourceItemType={CanvasItemTypes.SCROLL_TOOLBOX_ITEM}
                  key={`drag-item${i}`}
                  index={i}>
                  <div className="toolbox-item-container">
                    <img src={projectTemplate.apps[0].image} alt="provider"/>
                    <span> {projectTemplate.name} </span>
                    <button className="edit-btn icon"
                      onClick={(e) => {
                        handleProjectEdit(e, i);
                      }}>
                      <i className="fa fa-pencil"/>
                    </button>
                    <button className="close-btn icon"
                      onClick={(e) => {
                        handleProjectDelete(e, i);
                      }}>
                      <i className="fa fa-trash-o"/>
                    </button>
                  </div>
                </DraggableTopAlignedToolboxItem>
              ))}
          </ul>
        </CanvasScrollToolbox>
        <Canvas canvasClass="canvas stage-canvas"
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
          canvasDropItemTypes={[CanvasItemTypes.CANVAS_NODE]}/>
      </CanvasLayout>
    );
  }
}

export default DragDropContext(MouseBackEnd)(StagesCanvasManager);
