import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import EmptyState from '../../components/EmptyState/EmptyState';
import labsApi from '../../data/index';
import history from '../../core/history';
import constants from '../../core/constants';

class WelcomePage extends React.Component {

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  handleCreate = (event) => {
    history.push('/infrastructures/create');
  };

  componentWillMount(){
    this.checkInfra();
  }

  checkInfra(){
    //if we already have infra - relocate to the infra view
    let infrastructureApi = new labsApi.InfrastructureApi();
    infrastructureApi.infrastructuresGet((error, infrastructures, res) => {
      if(infrastructures && infrastructures.length){
        history.push('/infrastructures');
      }
    });
  }

  render() {
    return (
      <Layout className="container-fluid">
        <EmptyState>
          <div className="blank-slate-pf-icon">
            <i className="fa fa-rocket"></i>
          </div>
          <h1>Welcome to Red Hat Open Innovation Labs</h1>
          <p>The Labs Console serves as a starting point to developing your Open Shift applications.</p>
          <p>To begin, create an infrastructure for hosting your application topologies.</p>
          <div className="blank-slate-pf-main-action">
            <button className="btn btn-primary btn-lg" onClick={this.handleCreate}>
              Create Infrastructure
            </button>
          </div>
        </EmptyState>      
      </Layout>
    );
  }
}

export default WelcomePage;
