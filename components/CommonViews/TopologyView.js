import React, { PropTypes } from 'react';
import Layout from '../Layout';
import Link from '../Link';
import Modal from '../Modal/Modal';
import ProjectCardView from '../CardView/ProjectCardView';
import StagesCardView from '../CardView/StagesCardView';
import history from '../../core/history';
import constants from '../../core/constants';
import c from '../../pages/common.css';
import cx from 'classnames';


const TopologyView = ({topology, handleDownload, handleBuild, projects, stages,
              handleDefine, handleStageEdit, handleStageDelete, handleCreateProject,
              handleProjectEdit, handleProjectDelete, startBuildModal, cancelStart, 
              startBuild, startBuildModalId }) => {

  let content = [];

  //Home View Content
  content.push(
    <div className="page-header" key="topologies-page-header">
      <ol className="breadcrumb">
        <li>
          <Link to="/home">Topologies</Link>
        </li>
        <li className="active"> <strong>Topology:</strong>
          &nbsp; { topology.name }
        </li>
        <div className={c.float_right}>
          <button type="submit" className="btn btn-default" onClick={handleDownload} disabled={!projects.length || !stages.length}>Download JSON</button>
          &nbsp;&nbsp;
          <button type="submit" className="btn btn-primary" onClick={handleBuild} disabled={!projects.length || !stages.length}>Build</button>
        </div>
      </ol>
    </div>);

  content.push(
    <h3 key="topologies-build-stages"> Promotion Stages
      <span className={c.float_right}>
        <button type="submit" className="btn btn-default" onClick={handleDefine}>Define</button>
      </span>
    </h3>
  );
  content.push(
    <br key="br-stages"/>
  );

  if(stages.length){
    content.push(<StagesCardView stages={ stages } 
                                handleStageEdit={handleStageEdit} 
                                handleStageDelete={handleStageDelete} 
                                key="topologies-stages" />);
  } else if(!stages.length) {
    content.push(<h4 key="topologies-no-topologies">No stages defined.</h4>);
    content.push(<p key="topologies-no-topologies-message">An application topology can't be built until it contains at least one stage. Create a stage first.</p>)
  } else {
    content.push(<h4 key="topologies-ready">Ready to build topology.</h4>);
    content.push(<p key="topologies-ready-message">Hit the build button when ready to build your application topology.</p>)
  }

  content.push(<hr key="topologies-hr"/>);
  content.push(
    <h3 key="topologies-projects"> Project Templates
      <div className={c.float_right}>
        <button type="submit" className="btn btn-default" onClick={handleCreateProject}>Create</button>
      </div>
    </h3>);

  content.push(
    <br key="br-projects"/>
  );
  if(projects.length){
    content.push(<ProjectCardView projects={ projects }
                                  handleProjectEdit = {handleProjectEdit}
                                  handleProjectDelete={handleProjectDelete}
                                  key="topologies-project-card-view"/>);
  } else{
    content.push(<h4 key="topologies-no-projects">No projects exist.</h4>);
    content.push(<p key="topologies-no-projects-message">A topology must contain at least one project. Create a project to begin.</p>)
  }

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
    <Layout className="container-fluid container-pf-nav-pf-vertical" nav= { true }>
      {content}
      {startBuildModal && modal}
    </Layout>
  )
}

export default TopologyView;