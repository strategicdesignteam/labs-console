import React, { PropTypes } from 'react';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import CreateInfrastructureForm from '../../../components/Forms/CreateInfrastructureForm';
import labsApi from '../../../data/index';
import history from '../../../core/history';
import constants from '../../../core/constants';
import c from '../../common.css';

class CreateInfrastructurePage extends React.Component {

  state = { infrastructure: {}, loading: true };

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillMount() {
    this.getInfrastructure(this.props.route.params.id);
  }

  getInfrastructure(id){
    if(id){
      let infrastructureApi = new labsApi.InfrastructureApi();
      infrastructureApi.infrastructuresIdGet(id, (error, infrastructure, res) => {
        this.setState({infrastructure: infrastructure, loading: false});
      });
    } else {
      this.setState({loading: false});
    }
  }

  handleSubmit = (event) => {
    this.route();
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.route();
  };

  route () {
    history.push('/infrastructures');
  }  

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={ true }>
        {!this.state.loading && 
        <div className="page-header" key="breadcrumb-header">
          <ol className="breadcrumb">
            <li>
              <Link to="/infrastructures">Infrastructures</Link>
            </li>
            {(() => {
              let content = [];
              if(this.props.route.params.id && this.state.infrastructure){
                content.push(<li className="active"> <strong>Infrastructure:</strong>
                  &nbsp; {this.state.infrastructure.name}
                </li>);
              } else {
                content.push(<li className="active">Create Infrastructure</li>);
              }
              return content;
            })()}
          </ol>
        </div>
        }
        {!this.state.loading &&
        <CreateInfrastructureForm handleSubmit={this.handleSubmit}
                  handleCancel={this.handleCancel}
                  value={this.state.infrastructure}/>
        }        
      </Layout>
    );
  }
}

export default CreateInfrastructurePage;
