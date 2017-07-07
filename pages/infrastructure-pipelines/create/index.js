import React from 'react';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import CreateInfrastructurePipelineForm
  from '../../../components/Forms/CreateInfrastructurePipelineForm';
import CreateStageForm from '../../../components/Forms/CreateStageForm';
import labsApi from '../../../data/index';
import history from '../../../core/history';
import constants from '../../../core/constants';

class CreateInfrastructurePipelinePage extends React.Component {
  static propTypes = {
    route: React.PropTypes.object
  };

  static route() {
    history.push('/infrastructure-pipelines');
  }

  state = {
    infrastructurePipeline: {},
    infrastructures: [],
    loading: true,
    createPipelineView: true,
    createStageView: false,
    newStage: {}
  };

  componentWillMount() {
    this.getInfrastructurePipeline(this.props.route.params.id);
  }

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  getInfrastructurePipeline(id) {
    this.infraGet().then((infrastructures) => {
      if (id) {
        const infrastructurePipelineApi = new labsApi.InfrastructurePipelineApi();
        infrastructurePipelineApi.infrastructurePipelineIdGet(
          id,
          (error, infrastructurePipeline) => {
            this.setState({
              infrastructurePipeline,
              infrastructures,
              loading: false
            });
          }
        );
      }
      else {
        this.setState({ infrastructures, loading: false });
      }
    });
  }

  infraGet = () =>
    new Promise((resolve, reject) => {
      const infrastructureApi = new labsApi.InfrastructureApi();
      infrastructureApi.infrastructuresGet((err, infrastructures) => {
        if (err) reject(err);
        resolve(infrastructures);
      });
    });

  handleSubmit = (event, infrastructurePipeline) => {
    event.preventDefault();
    const infrastructurePipelineApi = new labsApi.InfrastructurePipelineApi();
    if (infrastructurePipeline.id >= 0) {
      infrastructurePipelineApi.updateInfrastructurePipeline(
        infrastructurePipeline.id,
        { body: infrastructurePipeline },
        (e) => {
          if (e) console.log(e); // todo: handle error
          CreateInfrastructurePipelinePage.route();
        }
      );
    }
    else {
      infrastructurePipelineApi.addInfrastructurePipeline(
        { body: infrastructurePipeline },
        (e) => {
          // todo: display an error
          if (e) console.error(e);
          CreateInfrastructurePipelinePage.route();
        }
      );
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    CreateInfrastructurePipelinePage.route();
  };

  handleAddStage = (event) => {
    event.preventDefault();
    this.setState({ createStageView: true, createPipelineView: false });
  };

  handleEditStage = (event, index) => {
    event.preventDefault();
    this.setState({
      createStageView: true,
      createPipelineView: false,
      newStage: this.state.infrastructurePipeline.promotion_process[index]
    });
  };

  handleSubmitStage = (event, infrastructurePipeline) => {
    event.preventDefault();
    this.setState({
      infrastructurePipeline,
      createStageView: false,
      createPipelineView: true
    });
  };

  handleCancelStage = (event) => {
    event.preventDefault();
    this.setState({ createStageView: false, createPipelineView: true });
  };

  handleChange = (e, prop) => {
    const o = Object.assign({}, this.state.infrastructurePipeline);
    o[prop] = e.target.value;
    this.setState({ infrastructurePipeline: o });
  };

  render() {
    const breadCrumbs = (
      <div className="page-header" key="breadcrumb-header">
        <ol className="breadcrumb">
          <li>
            <Link to="/infrastructure-pipelines">
              Infrastructure Pipelines
            </Link>
          </li>
          {(() => {
            const content = [];
            if (
              this.props.route.params.id && this.state.infrastructurePipeline
            ) {
              if (this.state.createStageView) {
                content.push(
                  <li>
                    <a href="#" onClick={this.handleCancelStage}>
                      &nbsp; {this.state.infrastructurePipeline.name}
                    </a>
                  </li>
                );
              }
              else {
                content.push(
                  <li className="active">
                    &nbsp; {this.state.infrastructurePipeline.name}
                  </li>
                );
              }
            }
            else if (this.state.createStageView) {
              content.push(
                <li>
                  <a href="#" onClick={this.handleCancelStage}>
                    Create Infrastructure Pipeline
                  </a>
                </li>
              );
            }
            else {
              content.push(
                <li className="active">
                  Create Infrastructure Pipeline
                </li>
              );
            }
            if (this.state.createStageView) {
              content.push(<li className="active">Create Stage</li>);
            }
            return content;
          })()}
        </ol>
      </div>
    );
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
        {!this.state.loading && breadCrumbs}
        {!this.state.loading &&
          this.state.createPipelineView &&
          <CreateInfrastructurePipelineForm handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            handleAddStage={this.handleAddStage}
            handleEditStage={this.handleEditStage}
            handleChange={this.handleChange}
            value={this.state.infrastructurePipeline}/>}
        {!this.state.loading &&
          this.state.createStageView &&
          <CreateStageForm handleSubmit={this.handleSubmitStage}
            handleCancel={this.handleCancelStage}
            infrastructurePipeline={this.state.infrastructurePipeline}
            value={this.state.newStage}
            infrastructures={this.state.infrastructures}/>}
      </Layout>
    );
  }
}

export default CreateInfrastructurePipelinePage;
