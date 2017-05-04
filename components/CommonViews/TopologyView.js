import React, { PropTypes } from 'react';
import Layout from '../Layout';
import Link from '../Link';
import Modal from '../Modal/Modal';
import StagesCanvasManager from '../Canvas/StagesCanvasManager';
import history from '../../core/history';
import constants from '../../core/constants';
import c from '../../pages/common.css';
import cx from 'classnames';


class TopologyView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {topology, handleDownload, handleBuild, projects, stages,
      handleCreateStage, handleStageEdit, handleStageDelete, handleStageMoved, 
      handleAddStage, handleAddStageProject, handleDeleteStageProject,
      handleCreateProject, handleProjectEdit, handleProjectDelete, startBuildModal, cancelStart,
      startBuild, startBuildModalId} = this.props;

    let content = [];

    //Home View Content
    content.push(
      <div className="page-header" key="topologies-page-header">
        <ol className="breadcrumb">
          <li>
            <Link to="/home">Topologies</Link>
          </li>
          <li className="active"> <strong>Topology:</strong>
            &nbsp; {topology.name}
          </li>
          <div className={c.float_right}>
            <button type="submit" className="btn btn-default" onClick={handleCreateProject}>Create Project Template</button>
            &nbsp;&nbsp;
          <button type="submit" className="btn btn-primary" onClick={handleBuild} disabled={!projects.length || !stages.length}>Build</button>
          </div>
        </ol>
      </div>);

    //Stages Canvas Manager
    content.push(<StagesCanvasManager 
                  projects={projects} 
                  stages={stages} 
                  handleProjectEdit={handleProjectEdit}
                  handleProjectDelete={handleProjectDelete}
                  handleCreateProject={handleCreateProject}
                  handleCreateStage={handleCreateStage}
                  deleteStageClicked={handleStageDelete}
                  editStageClicked={handleStageEdit}
                  handleStageMoved={handleStageMoved}
                  handleAddStage={handleAddStage}
                  handleAddStageProject={handleAddStageProject}
                  handleDeleteStageProject={handleDeleteStageProject} />);

    let modal = <Modal id={startBuildModalId}
      handleClose={cancelStart}
      key="builds-modal">
      <div className="text-center">
        <div className={cx(c.spacing, c.slate_gray)}>
          <i className="fa fa-rocket fa-3x"></i>
        </div>
        <h3>Build Application Topology</h3>
        <div className={c.spacing} >
          <strong>Topology:</strong> {topology.name}
        </div>
        <p>Are you sure?</p>
        <div className={c.spacing}>
          <button className="btn btn-default btn-lg" onClick={cancelStart}>No</button>
          &nbsp;
                  <button className="btn btn-primary btn-lg" onClick={startBuild}>Yes</button>
        </div>
      </div>
    </Modal>

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={true}>
        {content}
        {startBuildModal && modal}
      </Layout>
    )
  }
}

export default TopologyView;