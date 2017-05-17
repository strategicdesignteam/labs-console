import React from 'react';
import CreateTopologyForm from '../Forms/CreateTopologyForm';
import labsApi from '../../data/index';

class CreateTopologyView extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    value: React.PropTypes.object
  };

  handleSubmit = (event, t) => {
    const topologyApi = new labsApi.TopologyApi();
    const topology = new labsApi.ApplicationTopology();
    topology.name = t.name;
    topology.description = t.description;

    topologyApi.addTopology({ body: topology }, (e) => {
      // todo: display an error
      if (e) console.error(e);

      // return to parent after success
      this.props.handleSubmit(event);
    });

    event.preventDefault();
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  render() {
    return (
      <CreateTopologyForm handleSubmit={this.handleSubmit.bind(this)}
        handleCancel={this.handleCancel.bind(this)}
        value={this.props.value}/>
    );
  }
}

export default CreateTopologyView;
