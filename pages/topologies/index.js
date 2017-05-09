import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import TopologyListView from '../../components/ListView/TopologyListView';
import CreateTopologyView from '../../components/CommonViews/CreateTopologyView';
import history from '../../core/history';
import constants from '../../core/constants';
import labsApi from '../../data/index';
import c from '../common.css'

class HomePage extends React.Component {

  state = { topologies: [], createTopologyView: false};

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillMount() {
    this.topologyApi = new labsApi.TopologyApi();
    this.getTopologies();
  }

  getTopologies(){
    //todo: show spinners here
    this.topologyApi.topologiesGet((error, topologies, res) => {
      this.setState({topologies: topologies});
    });
  }

  handleCreate = (event) => {
    event.preventDefault();
    this.setState({createTopologyView: true});
  };

  handleSubmit = (event) => {
    this.setState({createTopologyView: false});

    //refresh topology list
    this.getTopologies();
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState({createTopologyView: false});
  };

  handleTopologyClick = (event, topologyId) => {
    event.preventDefault();
    history.push('/topology/' + topologyId);
  };

  handleDeleteTopology = (event, topologyId) => {
    event.preventDefault();
    this.topologyApi.deleteTopology(topologyId, (error, data, res) => {
      this.getTopologies();
    });
  };

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav={ true }>
        {(() => {
          if(this.state.createTopologyView){
            return <CreateTopologyView handleSubmit={this.handleSubmit.bind(this)}
                                       handleCancel={this.handleCancel.bind(this)}
                                       value={{}}/>;
          } else {
            let content = [];
            content.push(<div className="page-header" key="page-header">
                <h2> Application Topologies
                  <div className={c.float_right}>
                    <button type="submit" className="btn btn-primary"
                            onClick={this.handleCreate}>Create</button>
                  </div>
                </h2>
              </div>
            );

            if (this.state.topologies.length) {
              content.push(<TopologyListView topologies={ this.state.topologies }
                                             handleTopologyClick={this.handleTopologyClick.bind(this)}
                                             handleDeleteTopology={this.handleDeleteTopology.bind(this)}
                                             key="topology-list-view"/>);
            } else {
              content.push(<h4 key="none-exist">No topologies exist.</h4>);
              content.push(<p key="hit-create">Hit the create button to construct a new application topology.</p>);
            }
            return content;
          }
        })()}
      </Layout>
    );
  }
}

export default HomePage;
