import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import InfrastructureListView from '../../components/ListView/InfrastructureListView';
import ToastNotificationService from '../../components/ToastNotification/ToastNotificationService';
import Alert from '../../components/Alert/Alert';
import Modal from '../../components/Modal/Modal';
import labsApi from '../../data/index';
import history from '../../core/history';
import constants from '../../core/constants';
import c from '../common.css';

class InfrastructurePage extends React.Component {

  state = { infrastructures: [], infrastructure: {}, alertDismissed: false };

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillMount() {
    this.getInfrastructures();

    //requery infrastructures after ToastNotificationService notifies us of a change
    ToastNotificationService.monitorNotifications(
      constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD, this.getInfrastructures
    );
  }

  getInfrastructures = () => {
    let infrastructureApi = new labsApi.InfrastructureApi();
    infrastructureApi.infrastructuresGet((error, infrastructures, res) => {
      this.setState({infrastructures: infrastructures});
    });
  }

  handleCreate = (event) => {
    event.preventDefault();
    history.push('/infrastructures/create');
  }; 

  handleViewInfrastructure = (event, id) => {
    event.preventDefault();
    history.push('/infrastructures/' + id);
  }

  handleDeleteInfrastructure = (event, infrastructureId) => {
    let infrastructureApi = new labsApi.InfrastructureApi();
    infrastructureApi.deleteInfrastructure(infrastructureId, (error, data, res) => {
      this.getInfrastructures();
    });    
    event.preventDefault();
  }

  alertDismiss = (e) => {
    this.setState({alertDismissed: true})
  }

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={ true }>
        {(() => {
          let content = [];
          content.push(<div className="page-header" key="infrastructures-page-header">
              <h2> Infrastructures 
                <div className={c.float_right}>
                  <button type="submit" className="btn btn-primary"
                          onClick={this.handleCreate}>Create</button>
                </div>
              </h2>
            </div>
          );

          if(this.state.infrastructures.length && !this.state.alertDismissed &&
            this.state.infrastructures.some((infra) => { 
              return infra.status === constants.ANSIBLE_JOB_STATUS.PENDING || infra.status === constants.ANSIBLE_JOB_STATUS.RUNNING
            })){
            content.push(<Alert onDismiss={this.alertDismiss} type="info">
              <span>Building new infrastructure can take up to 90 minutes. You can continue working during this time.</span>
            </Alert>);
          }

          if (this.state.infrastructures.length) {
            content.push(<InfrastructureListView infrastructures={ this.state.infrastructures }
                                        handleView={this.handleViewInfrastructure}
                                        handleDelete={this.handleDeleteInfrastructure}
                                        key="infrastructures-list-view"/>);
          } else {
            content.push(<h4 key="infrastructures-no-infrastructures">No current infrastructures.</h4>);
            content.push(<p key="infrastructures-no-topology-message">An application topology requires an infrastructure. Create an infrastructure to begin.</p>);
          }

          return content;
        })()}
      </Layout>
    );
  }
}

export default InfrastructurePage;
