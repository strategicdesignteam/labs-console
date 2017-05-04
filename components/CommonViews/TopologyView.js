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
    const {topology, isBuildable, missingInfra, handleDownload, handleBuild, projects, stages,
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
          <button type="submit" className="btn btn-primary" onClick={handleBuild} disabled={!isBuildable}>Build</button>
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

    
    let modal;
    
    if(startBuildModal && missingInfra.length > 0){
      //error modal, topology projects are missing buildable infrastructure 
      modal = <Modal id={startBuildModalId}
        handleClose={cancelStart}
        key="builds-modal">
        <div className="text-center">
          <div className={cx(c.spacing, c.slate_gray)}>
            <i className="fa fa-exclamation-circle fa-3x" style={{color: '#c00'}}></i>
          </div>
          <h3>Infrastructure Not Ready</h3>
          <div className={c.spacing} >
            <p>The following stages have projects with incomplete infrastructure:</p>
            {missingInfra.map((missing) => {
              return <div>
                <b>Stage:</b> &nbsp;<span>{missing.stage.name}</span>  &nbsp;&nbsp;
                <b>Project:</b> &nbsp;<span>{missing.stageProject.name}</span>
              </div>
            })}
          </div>
          <p>Try again when infrastructures are ready.</p>
          <div className={c.spacing}>
            <button className="btn btn-primary btn-lg" onClick={cancelStart}>OK</button>
          </div>
        </div>
      </Modal>
    } else if (startBuildModal) {
      modal = <Modal id={startBuildModalId}
        handleClose={cancelStart}
        key="builds-modal">
        <div className="text-center">
          <div className={cx(c.spacing, c.slate_gray)}>
            <i style={{fontSize: 37, marginTop: 5, color: '#39a5dc'}} className="pficon pficon-topology"></i>
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
    }

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={true}>
        {content}
        {startBuildModal && modal}
      </Layout>
    )
  }
}

export default TopologyView;