import React, { PropTypes } from 'react';
import EmptyState from '../EmptyState/EmptyState';
import Link from '../Link';
import TableSelectionView from '../TableView/TableSelectionView';
import CreateUserForm from '../Forms/CreateUserForm'
import CanvasConstants from '../Canvas/CanvasConstants'
import CanvasItemTypes from '../Canvas/CanvasItemTypes';
import labsApi from '../../data/index';
import Stage from '../../data/model/Stage';
import User from '../../data/model/User';
import c from '../../pages/common.css';
import cx from 'classnames';

class CreateStageForm extends React.Component {

  state = {
    createStageView: true,
    createUserView: false,
    users: [],
    newStage: {}
  };

  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    topology: React.PropTypes.object,
    value: React.PropTypes.object
  };

  handleSubmit = (event) => {
    let topologyApi = new labsApi.TopologyApi();
    let topology = Object.assign({}, this.props.topology);
    let users = this.refs.tableSelectiveView.selections();
    let project_role_bindings = [];
    let application_promoters = [];

    users.forEach(function(user){
      let u = new User(user.id, user.first_name, user.last_name, user.user_name, user.password, user.email);
      if(user.role){
        project_role_bindings.push({user: u, role: user.role});
      }
      if(user.promotion){
        application_promoters.push({id: user.id});
      }
    });

    if(this.state.newStage.id){
      let index = topology.promotion_process.findIndex((s) => {
        return s.id === this.state.newStage.id
      });
      if(index > -1){
        //edit existing stage and change its properties in the stage form
        topology.promotion_process[index].name = this.state.newStage.name;
        topology.promotion_process[index].project_role_bindings = project_role_bindings;
        topology.promotion_process[index].application_promoters = application_promoters;
      }
    } else {
      //create new stage and set initial stage attributes for the canvas
      let stage = new Stage();
      stage.name = this.state.newStage.name;
      stage.project_role_bindings = project_role_bindings;
      stage.application_promoters = application_promoters;      
      const rows = Math.floor((topology.promotion_process.length) / (CanvasConstants.MAX_STAGES_IN_ROW))
      stage.index = topology.promotion_process.length;
      stage.projects = [];
      stage.x = ((stage.index % CanvasConstants.MAX_STAGES_IN_ROW) * CanvasConstants.STAGE_WIDTH) 
        + (((stage.index % CanvasConstants.MAX_STAGES_IN_ROW) + 1) * CanvasConstants.STAGE_PADDING_X),
      stage.y = (rows * CanvasConstants.STAGE_HEIGHT) + ((rows + 1) * CanvasConstants.STAGE_PADDING_Y);
      stage.invalid = false;
      stage.selected = false;
      stage.containerNode = true;
      stage.containerNodeDropItemTypes = [CanvasItemTypes.SCROLL_TOOLBOX_ITEM];
      stage.inputConnectors = [];
      stage.validConnectionTypes = [];

      topology.promotion_process.push(stage);
    }

    topologyApi.updateTopology(topology.id, {'body': topology}, (e) => {
      if(e) console.log(e); //todo: handle error
      this.props.handleSubmit(event);
    });
    event.preventDefault();
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  handleChange = (e, prop) => {
    let o = Object.assign({}, this.state.newStage);
    o[prop] = e.target.value;
    this.setState({newStage: o});
  };

  handleCreateUser = (event) => {
    this.setState({user: {}, createUserView: true, createStageView: false});
    event.preventDefault();
  };

  componentWillMount(){
    let newStage = Object.assign({}, this.props.value);
    this.setState({newStage: newStage});
    this.getUsers();
  }

  getUsers(cb) {
    let userApi = new labsApi.UserApi();
    userApi.usersGet((error, users, res) => {
      this.setState({users: users});
      if(cb) cb();
    });
  }

  handleCreateUserSubmit = (event, u) => {
    let userApi = new labsApi.UserApi();
    let user = new labsApi.User();
    Object.assign(user, u);
    userApi.addUser({'body': user}, (e) => {
      //todo: display an error
      if (e) console.error(e);
      this.getUsers(() => {
        this.setState({createUserView: false, createStageView: true});
      });
    });
    event.preventDefault();
  };

  handleCreateUserCancel = (event) => {
    event.preventDefault();
    this.setState({createUserView: false, createStageView: true});
  };

  render() {
    let columns = [
      {
        'field': 'user_name',
        'displayName':'Username'
      },
      {
        'field': 'email',
        'displayName':'Email'
      },
      {
        'field': 'first_name',
        'displayName':'First Name'
      },
      {
        'field': 'last_name',
        'displayName':'Last Name'
      },
      {
        'field': 'role',
        'displayName': 'Role'
      },
      {
        'field': 'promotion',
        'displayName': 'Promotion Rights'
      }
    ];

    if(this.state.createStageView) {
      return (
          <form role="form">
            <div className="page-header" key="define-stages-page-header">
              <ol className="breadcrumb">
                <li>
                  <Link to="/home">Topologies</Link>
                </li>
                <li>
                  <a href="#" onClick={this.handleCancel}>
                    {this.props.topology.name}
                  </a>
                </li>
                <li className="active">
                  Define Promotion Stage
                </li>                
              </ol>
            </div>
            <div className="form-group">
              <label  htmlFor="input1">Stage Name</label>
              <input type="text" className="form-control" id="input1" required="" placeholder="stage-name"
                     value={this.state.newStage.name}
                     onChange={(e) => { this.handleChange(e,'name')}}/>
            </div>
            <br/>
            <div className="form-group">
              <label>
                Users and Roles
              </label>
              {(() => {
                if(this.state.users.length){
                  return [
                    <div className={cx(c.float_right)}>
                      <button type="submit" className="btn btn-default" onClick={this.handleCreateUser}>Create</button>
                    </div>,
                    <br/>,
                    <br/>,
                    <TableSelectionView ref="tableSelectiveView" columns={ columns }
                                        users={ this.state.users }
                                        stage={ this.state.newStage }
                                        handleRowClick={this.handleRowClick}/>
                  ]
                } else {
                  return <EmptyState hideTitle={true}>
                    <div className="text-center">
                      <h4>No users exist for the topology.</h4>
                      <p>You must have at least one user defined to build your topology onto a stage.</p>
                      <button type="submit" className="btn btn-default" onClick={this.handleCreateUser}>Create User</button>
                    </div>
                  </EmptyState>
                }
              })()}
            </div>
            <br/>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              &nbsp;&nbsp;
              <button type="submit" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
            </div>
          </form>
      )
    } else if (this.state.createUserView){
      return (
        <div>
          <div className="page-header" key="define-stages-page-header">
            <ol className="breadcrumb">
              <li>
                <Link to="/home">Topologies</Link>
              </li>
              <li>
                <a href="#" onClick={this.handleCancel}>
                  {this.props.topology.name}
                </a>
              </li>
              <li>
                <a href="#" onClick={this.handleCreateUserCancel}>
                  Define Promotion Stage
                </a>
              </li>              
              <li className="active">
                Create User
              </li>                
            </ol>
          </div>        
          <CreateUserForm handleSubmit={this.handleCreateUserSubmit}
                          handleCancel={this.handleCreateUserCancel}
                          value={this.state.user}
                          hideHeading={true}/>
        </div>
      )
    }
  }
}

export default CreateStageForm;