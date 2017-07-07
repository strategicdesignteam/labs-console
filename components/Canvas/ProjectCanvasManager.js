import React from 'react';
import { DragDropContext } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend';
import Tabs from '../Tabs/Tabs';
import Tab from '../Tabs/Tab';
import { projectTabs } from './ProjectTabs';
import ApplicationPanel from './ApplicationPanel';
import ProjectPanel from './ProjectPanel';
import Canvas from './Canvas';
import CanvasItemTypes from './CanvasItemTypes';
import CanvasLayout from './CanvasLayout';
import CanvasPanel from './CanvasPanel';
import CanvasToolbar from './CanvasToolbar';
import CanvasTopAlignedToolbox from './CanvasTopAlignedToolbox';
import CustomDragLayer from './CustomDragLayer';
import DraggableTopAlignedToolboxItem from './DraggableTopAlignedToolboxItem';

/**
 * Project Canvas Manager
 */
class ProjectCanvasManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxOpen: false,
      readOnly: false,
      inConnectingMode: false,
      canvasHeight: 756,
      canvasWidth: 1396,
      zoomLevel: 1,
      maxZoom: 1,
      minZoom: parseFloat('.5'),
      zoomIncrement: parseFloat('.25'),
      zoomOutDisabled: false,
      zoomInDisabled: true,
      activeTab: 'Application Development',
      activeAppDevTab: 'Red Hat Enterprise Open Source',
      activeDevOpsTab: 'CI / CD',
      activeContainerPlatformTab: 'RHEL'
    };

    this.toggleToolboxOpen = () => {
      this.setState(prevState => ({
        toolboxOpen: !prevState.toolboxOpen
      }));
    };
    this.closeToolboxClicked = () => {
      this.setState({ toolboxOpen: false });
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
    this.handleTabChanged = (e) => {
      if (this.state.activeTab !== e.detail) {
        this.setState({ activeTab: e.detail });
      }
    };
    this.handleAppDevTabChanged = (e) => {
      if (this.state.activeAppDevTab !== e.detail) {
        this.setState({ activeAppDevTab: e.detail });
      }
    };
    this.handleDevOpsTabChanged = (e) => {
      if (this.state.activeDevOpsTab !== e.detail) {
        this.setState({ activeDevOpsTab: e.detail });
      }
    };
    this.handleContainerPlatformTabChanged = (e) => {
      if (this.state.activeContainerPlatformTab !== e.detail) {
        this.setState({ activeContainerPlatformTab: e.detail });
      }
    };
  }

  render() {
    const {
      project,
      handleProjectChange,
      handleAppChange,
      canvasClicked,
      nodes,
      connections,
      nodeActions,
      moveNode,
      selectNode,
      duplicateSelected,
      deleteSelected,
      addNode,
      selectedNodeIndex
    } = this.props;

    return (
      <CanvasLayout>
        <CanvasToolbar toolboxButtonLabel="Applications"
          toolboxClicked={this.toggleToolboxOpen}
          toolboxOpen={this.state.toolboxOpen}
          duplicateClicked={duplicateSelected}
          deleteClicked={deleteSelected}
          zoomInClicked={this.zoomInClicked}
          zoomInDisabled={this.state.zoomInDisabled}
          zoomOutClicked={this.zoomOutClicked}
          zoomOutDisabled={this.state.zoomOutDisabled}/>
        <CustomDragLayer/>
        <Canvas canvasClicked={canvasClicked}
          readOnly={this.state.readOnly}
          inConnectingMode={this.state.inConnectingMode}
          canvasHeight={this.state.canvasHeight}
          canvasWidth={this.state.canvasWidth}
          zoomLevel={this.state.zoomLevel}
          connections={connections}
          nodeActions={nodeActions}
          nodes={nodes}
          moveNode={moveNode}
          selectNode={selectNode}
          deleteSelected={deleteSelected}
          addNode={addNode}
          canvasDropItemTypes={[
            CanvasItemTypes.CANVAS_NODE,
            CanvasItemTypes.TOOLBOX_ITEM
          ]}>
          <CanvasPanel panelTitle={selectedNodeIndex < 0 ? 'Project' : 'Application'}>
            {selectedNodeIndex < 0 &&
              <ProjectPanel handleChange={handleProjectChange}
                value={project}/>}
            {selectedNodeIndex >= 0 &&
              <ApplicationPanel handleChange={handleAppChange}
                value={JSON.stringify(nodes[selectedNodeIndex], null, 2)}/>}
          </CanvasPanel>
          <CanvasTopAlignedToolbox isOpen={this.state.toolboxOpen}
            closeClicked={this.closeToolboxClicked}>
            <Tabs key="pf-tabs" tabChanged={this.handleTabChanged}>
              <Tab tabTitle={projectTabs[0].title}
                active={this.state.activeTab === projectTabs[0].title}>
                <Tabs key="app-tabs"
                  tabsClass={'nav nav-tabs nav-tabs-pf'}
                  tabChanged={this.handleAppDevTabChanged}>
                  {projectTabs[0].categories.map((category, i) => (
                    <Tab tabTitle={category.title}
                      active={this.state.activeAppDevTab === category.title}
                      tabKey={category.title}
                      key={`app-tab${i}`}>
                      {category.applications.map(app => (
                        <DraggableTopAlignedToolboxItem itemAttributes={app}
                          key={app.name}
                          canvasSourceItemType={CanvasItemTypes.TOOLBOX_ITEM}>
                          <img src={app.image} alt="app"/>
                          <span> {app.name} </span>
                        </DraggableTopAlignedToolboxItem>
                      ))}
                    </Tab>
                  ))}
                </Tabs>
              </Tab>
              <Tab tabTitle={projectTabs[1].title}
                active={this.state.activeTab === projectTabs[1].title}>
                <Tabs key="dev-ops-tabs"
                  tabsClass={'nav nav-tabs nav-tabs-pf'}
                  tabChanged={this.handleDevOpsTabChanged}>
                  {projectTabs[1].categories.map((category, i) => (
                    <Tab tabTitle={category.title}
                      active={this.state.activeDevOpsTab === category.title}
                      tabKey={category.title}
                      key={`dev-ops-tab${i}`}>
                      {category.applications.map(app => (
                        <DraggableTopAlignedToolboxItem itemAttributes={app}
                          key={app.name}
                          canvasSourceItemType={CanvasItemTypes.TOOLBOX_ITEM}>
                          <img src={app.image} alt="app"/>
                          <span> {app.name} </span>
                        </DraggableTopAlignedToolboxItem>
                      ))}
                    </Tab>
                  ))}
                </Tabs>
              </Tab>
              <Tab tabTitle={projectTabs[2].title}
                active={this.state.activeTab === projectTabs[2].title}>
                <Tabs key="cp-tabs"
                  tabsClass={'nav nav-tabs nav-tabs-pf'}
                  tabChanged={this.handleContainerPlatformTabChanged}>
                  {projectTabs[2].categories.map((category, i) => (
                    <Tab tabTitle={category.title}
                      active={
                        this.state.activeContainerPlatformTab === category.title
                      }
                      tabKey={category.title}
                      key={`cp-tab${i}`}>
                      {category.applications.map(app => (
                        <DraggableTopAlignedToolboxItem itemAttributes={app}
                          key={app.name}
                          canvasSourceItemType={CanvasItemTypes.TOOLBOX_ITEM}>
                          <img src={app.image} alt="app"/>
                          <span> {app.name} </span>
                        </DraggableTopAlignedToolboxItem>
                      ))}
                    </Tab>
                  ))}
                </Tabs>
              </Tab>
            </Tabs>
          </CanvasTopAlignedToolbox>
        </Canvas>
      </CanvasLayout>
    );
  }
}

export default DragDropContext(MouseBackEnd)(ProjectCanvasManager);
