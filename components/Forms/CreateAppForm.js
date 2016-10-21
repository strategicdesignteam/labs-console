import React, { PropTypes } from 'react';
import EmptyState from '../EmptyState/EmptyState';

class CreateAppForm extends React.Component {

  state = { json : '' };

  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    value: React.PropTypes.object
  };

  handleSubmit = (event) => {
    try {
      //try to parse our app json, if it can't be parsed, bail and let them try again
      let json = JSON.parse(this.state.json);
      this.props.handleSubmit(event, {json: json, index: this.props.value.index });
    } catch(e){
      //todo: show error
      console.log(e);
      event.preventDefault();
    }
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  handleChange(event) {
    this.setState({json: event.target.value});
  }

  componentWillMount(){
    try {
      //try to stringify our app json
      if(this.props.value.json){
        let json = JSON.stringify(this.props.value.json);
        this.setState({json: json});
      }
    } catch(e){
      //todo: show error
      console.log(e);
    }
  }

  render() {
    return (
      <EmptyState title="Create App">
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label htmlFor="input1" className="col-sm-2 control-label">Application</label>
            <div className="col-sm-10">
              <textarea type="text" className="form-control" id="input1" required="" rows="10"
                        placeholder="paste application json..."
                        value={this.state.json}
                        onChange={(e) => {this.handleChange(e)}}/>
            </div>
          </div>
          <br/>
          <br/>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
            &nbsp;&nbsp;
            <button type="submit" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
          </div>
        </form>
      </EmptyState>
    )
  }
}

export default CreateAppForm;
