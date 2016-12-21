import React, { PropTypes } from 'react';
import EmptyState from '../EmptyState/EmptyState';

class CreateTopologyForm extends React.Component {

  state = { newTopology: {} };

  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    value: React.PropTypes.object
  };

  handleSubmit = (event) => {
    this.props.handleSubmit(event, this.state.newTopology);
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  componentDidMount() {
    this.setState({newTopology: this.props.value});
  }
  
  render() {
    return (
        <form role="form">
          <h2>Create Application Topology</h2>
          <hr/>
          <div className="form-group">
            <label htmlFor="input1" className="required-pf">Topology Name</label>
            <input type="text" className="form-control" id="input1" required=""
                   placeholder="topology-name" value={this.state.newTopology.name}
                   onChange={(e) => { this.state.newTopology.name = e.target.value}}/>
          </div>
          <div className="form-group">
            <label htmlFor="input2" className="required-pf">Description</label>
            <input type="text" className="form-control" id="input2" required=""
                   placeholder="A short description." value={this.state.newTopology.description}
                   onChange={(e) => { this.state.newTopology.description = e.target.value}}/>
          </div>
          <br/>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
            &nbsp;&nbsp;
            <button type="submit" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
          </div>
        </form>

    )
  }
}

export default CreateTopologyForm;
