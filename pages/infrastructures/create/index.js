import React from 'react';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import CreateInfrastructureForm
  from '../../../components/Forms/CreateInfrastructureForm';
import labsApi from '../../../data/index';
import history from '../../../core/history';
import constants from '../../../core/constants';

class CreateInfrastructurePage extends React.Component {
  static propTypes = {
    route: React.PropTypes.object
  };

  static route() {
    history.push('/infrastructures');
  }

  state = { infrastructure: {}, loading: true };

  componentWillMount() {
    this.getInfrastructure(this.props.route.params.id);
  }

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  getInfrastructure(id) {
    if (id) {
      const infrastructureApi = new labsApi.InfrastructureApi();
      infrastructureApi.infrastructuresIdGet(id, (error, infrastructure) => {
        this.setState({ infrastructure, loading: false });
      });
    }
    else {
      this.setState({ loading: false });
    }
  }

  handleSubmit = () => {
    CreateInfrastructurePage.route();
  };

  handleCancel = (event) => {
    event.preventDefault();
    CreateInfrastructurePage.route();
  };

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>
        {!this.state.loading &&
          <div className="page-header" key="breadcrumb-header">
            <ol className="breadcrumb">
              <li>
                <Link to="/infrastructures">Infrastructures</Link>
              </li>
              {(() => {
                const content = [];
                if (this.props.route.params.id && this.state.infrastructure) {
                  content.push(
                    <li className="active">
                      {' '}<strong>Infrastructure:</strong>
                      &nbsp; {this.state.infrastructure.name}
                    </li>
                  );
                }
                else {
                  content.push(
                    <li className="active">Create Infrastructure</li>
                  );
                }
                return content;
              })()}
            </ol>
          </div>}
        {!this.state.loading &&
          <CreateInfrastructureForm handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            value={this.state.infrastructure}/>}
      </Layout>
    );
  }
}

export default CreateInfrastructurePage;
