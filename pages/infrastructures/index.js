import React from 'react';
import Layout from '../../components/Layout';
import InfrastructureListView
  from '../../components/ListView/InfrastructureListView';
import ToastNotificationService
  from '../../components/ToastNotification/ToastNotificationService';
import Alert from '../../components/Alert/Alert';
import labsApi from '../../data/index';
import history from '../../core/history';
import constants from '../../core/constants';
import c from '../common.css';

class InfrastructurePage extends React.Component {
  state = { infrastructures: [], infrastructure: {}, alertDismissed: false };

  componentWillMount() {
    this.getInfrastructures();

    // requery infrastructures after ToastNotificationService notifies us of a change
    ToastNotificationService.monitorNotifications(
      constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD,
      this.getInfrastructures
    );
  }

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillUnmount() {
    ToastNotificationService.unregisterNotifications(
      constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD,
      this.getInfrastructures
    );
  }

  getInfrastructures = () => {
    const infrastructureApi = new labsApi.InfrastructureApi();
    infrastructureApi.infrastructuresGet((error, infrastructures) => {
      this.setState({ infrastructures });
    });
  };

  handleCreate = (event) => {
    event.preventDefault();
    history.push('/infrastructures/create');
  };

  handleViewInfrastructure = (event, id) => {
    event.preventDefault();
    history.push(`/infrastructures/${id}`);
  };

  handleDeleteInfrastructure = (event, infrastructure) => {
    // start a destroy job in Tower
    const infrastructureApi = new labsApi.InfrastructureApi();
    const jobApi = new labsApi.JobApi();

    jobApi.destroyInfrastructureJob({ body: {} }, (error, job) => {
      if (error) console.error(error);
      infrastructure.status = job.status;
      infrastructure.tower_job_id = job.id;
      infrastructure.datetime_started = job.created;
      infrastructure.destroy_started = true;

      infrastructureApi.updateInfrastructure(
        infrastructure.id,
        { body: infrastructure },
        (e) => {
          // todo: display an error
          if (e) console.error(e);
          this.getInfrastructures();
        }
      );
    });
    event.preventDefault();
  };

  alertDismiss = () => {
    this.setState({ alertDismissed: true });
  };

  handleInsightsRemediate = (event, infrastructure) => {
    event.preventDefault();

    const infrastructureApi = new labsApi.InfrastructureApi();
    const jobApi = new labsApi.JobApi();

    jobApi.addInsightsRemediateJob(
      { body: { infrastructureId: infrastructure.id } },
      (e, job) => {
        if (e) console.error(e);
        infrastructure.rh_insights_status = job.status;
        infrastructure.rh_insights_tower_job_id = job.id;

        infrastructureApi.updateInfrastructure(
          infrastructure.id,
          { body: infrastructure },
          (e) => {
            // todo: display an error
            if (e) console.error(e);
            this.getInfrastructures();
          }
        );
      }
    );
  };

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
        {(() => {
          const content = [];
          content.push(
            <div className="page-header" key="infrastructures-page-header">
              <h2>
                Infrastructures
                <div className={c.float_right}>
                  <button type="submit"
                    className="btn btn-primary"
                    onClick={this.handleCreate}>
                    Create
                  </button>
                </div>
              </h2>
            </div>
          );

          if (
            this.state.infrastructures.length &&
            !this.state.alertDismissed &&
            this.state.infrastructures.some(
              infra =>
                (infra.status === constants.ANSIBLE_JOB_STATUS.PENDING ||
                  infra.status === constants.ANSIBLE_JOB_STATUS.RUNNING) &&
                !infra.destroy_started
            )
          ) {
            content.push(
              <Alert onDismiss={this.alertDismiss} type="info">
                <span>
                  Building new infrastructure can take up to 90 minutes. You can continue working during this time.
                </span>
              </Alert>
            );
          }

          if (this.state.infrastructures.length) {
            content.push(
              <InfrastructureListView infrastructures={this.state.infrastructures}
                handleView={this.handleViewInfrastructure}
                handleDelete={this.handleDeleteInfrastructure}
                handleInsightsRemediate={this.handleInsightsRemediate}
                key="infrastructures-list-view"/>
            );
          }
          else {
            content.push(
              <h4 key="infrastructures-no-infrastructures">
                No current infrastructures.
              </h4>
            );
            content.push(
              <p key="infrastructures-no-infrastructure-pipeline-message">
                An infrastructure pipeline requires an infrastructure. Create an infrastructure to begin.
              </p>
            );
          }

          return content;
        })()}
      </Layout>
    );
  }
}

export default InfrastructurePage;
