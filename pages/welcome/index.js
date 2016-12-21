import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import EmptyState from '../../components/EmptyState/EmptyState';
import CreateTopologyView from '../../components/CommonViews/CreateTopologyView';
import labsApi from '../../data/index';
import history from '../../core/history';
import constants from '../../core/constants';

class WelcomePage extends React.Component {

  state = { createTopologyView: false };

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  handleCreate = (event) => {
    this.setState({createTopologyView: true});
  };

  handleSubmit = (event) => {
    history.push('/home');
  };
  
  handleCancel = (event) => {
    event.preventDefault();
    this.setState({createTopologyView: false});
  };

  componentWillMount(){
    this.checkTopologies();
  }

  checkTopologies(){
    //if we already have topologies - relocate to the home view
    let topologyApi = new labsApi.TopologyApi();
    topologyApi.topologiesGet((error, topologies, res) => {
      if(topologies && topologies.length){
        history.push('/home');
      }
    });
  }

  render() {
    return (
      <Layout className="container-fluid">
        {(() => {
          if(this.state.createTopologyView){
            return <CreateTopologyView handleSubmit={this.handleSubmit.bind(this)}
                                       handleCancel={this.handleCancel.bind(this)}
                                       value={{}}/>;
          } else {
            return <EmptyState>
              <div className="blank-slate-pf-icon">
                <i className="fa fa-rocket"></i>
              </div>
              <h1>Welcome to Red Hat Open Innovation Labs</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>To begin, create an application topology for your environment.</p>
              <div className="blank-slate-pf-main-action">
                <button className="btn btn-primary btn-lg" onClick={this.handleCreate}>
                  Create Application Topology
                </button>
              </div>
            </EmptyState>;
          }
        })()}
      </Layout>
    );
  }
}

export default WelcomePage;
