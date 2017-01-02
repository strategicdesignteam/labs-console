import React, { PropTypes } from 'react';
import labsApi from '../../data/index';
import DualPaneSelector from '../DualPaneSelector/DualPaneSelector';

class CreateGroupForm extends React.Component {

  state = { newGroup : {}, availableUsers: [], selectedUsers: [] };

  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    value: React.PropTypes.object
  };

  componentWillMount(){
    //mock data for now
    let availableUsers = [
      {id: 1, username: 'jholmes'},
      {id: 2, username: 'priley'},
      {id: 4, username: 'vconzola'}
    ];
    let selectedUsers = [
      {id: 3, username: 'jlabocki'}
    ];
    this.setState({
      newGroup: this.props.value,
      availableUsers: availableUsers,
      selectedUsers: selectedUsers
    });
  }

  handleSelectItems = (event, items) => {
    event.preventDefault();
    let availableUsers = this.state.availableUsers.slice(0); //copies to be changed
    let selectedUsers  = this.state.selectedUsers.slice(0);

    for(let i =0; i < items.length; i++){
      let index = availableUsers.findIndex((u) => { return u.id == items[i].id });

      //add item to selectedUsers & remove it from availableUser
      selectedUsers.push(availableUsers[index]);
      availableUsers.splice(index,1);
    }
    this.setState({availableUsers: availableUsers, selectedUsers: selectedUsers});
  };

  handleUnselectItems = (event, items) => {
    event.preventDefault();
    let availableUsers = this.state.availableUsers.slice(0); //copies to be changed
    let selectedUsers  = this.state.selectedUsers.slice(0);

    for(let i =0; i < items.length; i++){
      let index = selectedUsers.findIndex((u) => { return u.id == items[i].id });

      //add item to availableUser & remove it from selectedUsers
      availableUsers.push(selectedUsers[index]);
      selectedUsers.splice(index,1);
    }
    this.setState({availableUsers: availableUsers, selectedUsers: selectedUsers});
  };

  handleSubmit = (event) => {
    //todo: handle group persistence
    this.props.handleSubmit(event, {});
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  handleChange = (e, prop) => {
    let o = Object.assign({}, this.state.newGroup);
    o[prop] = e.target.value;
    this.setState({newGroup: o});
  };
  ;

  render() {
    return (
      <form className="form-horizontal" role="form">
        <h2>{Object.keys(this.props.value).length === 0 ? 'Create Group' : 'Edit Group'}</h2>
        <hr/>
        <div className="form-group">
          <label htmlFor="group_name" className="col-sm-2 control-label required-pf">Group Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="group_name" required=""
                   value={this.state.newGroup.name}
                   onChange={(e) => { this.handleChange(e,'name')}}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="id" className="col-sm-2 control-label">Group ID</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="id" required=""
                   value={this.state.newGroup.id}
                   onChange={(e) => { this.handleChange(e,'id')}}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="membership" className="col-sm-2 control-label">Membership</label>
          <div className="col-sm-10">
            <DualPaneSelector availableItems={this.state.availableUsers}
                              selectedItems={this.state.selectedUsers}
                              selectItems={this.handleSelectItems.bind(this)}
                              unselectItems={this.handleUnselectItems.bind(this)}
                              availableTitle="Available Users"
                              selectedTitle="Group Members"/>
          </div>
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
          &nbsp;&nbsp;
          <button type="submit" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
        </div>
      </form>
    )
  }
}

export default CreateGroupForm;