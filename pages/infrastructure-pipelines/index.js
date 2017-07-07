import React from 'react';
import Layout from '../../components/Layout';
import PipelineListView from '../../components/ListView/PipelineListView';
import labsApi from '../../data/index';
import history from '../../core/history';
import constants from '../../core/constants';
import c from '../common.css';

class InfrastructurePipelinesPage extends React.Component {
  state = { infrastructurePipelines: [], alertDismissed: false };

  componentWillMount() {
    this.getInfrastructurePipelines();
  }

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillUnmount() {}

  getInfrastructurePipelines = () => {
    const infrastructurePipelineApi = new labsApi.InfrastructurePipelineApi();
    infrastructurePipelineApi.infrastructurePipelineGet(
      (error, infrastructurePipelines) => {
        this.setState({ infrastructurePipelines });
      }
    );
  };

  handleCreate = (event) => {
    event.preventDefault();
    history.push('/infrastructure-pipelines/create');
  };

  handleClickPipeline = (e, id) => {
    e.preventDefault();
    history.push(`/infrastructure-pipeline/${id}`);
  };

  handleEditPipeline = (e, id) => {
    e.preventDefault();
    history.push(`/infrastructure-pipelines/${id}`);
  };

  handleDeletePipeline = (e, id) => {
    const infrastructurePipelineApi = new labsApi.InfrastructurePipelineApi();
    infrastructurePipelineApi.deleteInfrastructurePipeline(id, () => {
      this.getInfrastructurePipelines();
    });
  };

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>

        {(() => {
          const content = [];
          content.push(
            <div className="page-header" key="infrastructures-page-header">
              <h2>
                Infrastructure Pipelines
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

          if (this.state.infrastructurePipelines.length) {
            content.push(
              <PipelineListView infrastructurePipelines={this.state.infrastructurePipelines}
                handleClick={this.handleClickPipeline}
                handleEdit={this.handleEditPipeline}
                handleDelete={this.handleDeletePipeline}
                key="infrastructures-list-view"/>
            );
          }
          else {
            content.push(
              <h4 key="infrastructures-no-infrastructures">
                No current infrastructure pipelines.
              </h4>
            );
            content.push(
              <p key="infrastructures-no-infrastructure-pipeline-message">
                Create an infrastructure pipeline to begin.
              </p>
            );
          }

          return content;
        })()}

      </Layout>
    );
  }
}

export default InfrastructurePipelinesPage;
