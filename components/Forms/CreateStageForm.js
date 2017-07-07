import React from 'react';
import cx from 'classnames';
import EmptyState from '../EmptyState/EmptyState';
import TableSelectionView from '../TableView/TableSelectionView';
import CreateUserForm from '../Forms/CreateUserForm';
import labsApi from '../../data/index';
import Stage from '../../data/model/Stage';
import User from '../../data/model/User';
import c from '../../pages/common.css';

class CreateStageForm extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    infrastructurePipeline: React.PropTypes.object,
    value: React.PropTypes.object,
    infrastructures: React.PropTypes.array
  };

  state = {
    createStageView: true,
    createUserView: false,
    users: [],
    newStage: {}
  };

  componentWillMount() {
    const newStage = Object.assign({}, this.props.value);
    this.setState({ newStage });
    this.getUsers();
  }

  getUsers(cb) {
    const userApi = new labsApi.UserApi();
    userApi.usersGet((error, users) => {
      this.setState({ users });
      if (cb) cb();
    });
  }

  handleSubmit = (event) => {
    const infrastructurePipeline = Object.assign(
      {},
      this.props.infrastructurePipeline
    );
    infrastructurePipeline.promotion_process = infrastructurePipeline.promotion_process || [
    ];
    const users = this.tableSelectiveView.selections();
    const project_role_bindings = [];
    const application_promoters = [];

    users.forEach((user) => {
      const u = new User(
        user.id,
        user.first_name,
        user.last_name,
        user.user_name,
        user.password,
        user.email
      );
      if (user.role) {
        project_role_bindings.push({ user: u, role: user.role });
      }
      if (user.promotion) {
        application_promoters.push({ id: user.id });
      }
    });

    const index = this.state.newStage.index || -1;

    if (index > -1) {
      // edit existing stage and change its properties in the stage form
      infrastructurePipeline.promotion_process[
        index
      ].name = this.state.newStage.name;
      infrastructurePipeline.promotion_process[
        index
      ].project_role_bindings = project_role_bindings;
      infrastructurePipeline.promotion_process[
        index
      ].application_promoters = application_promoters;
      infrastructurePipeline.promotion_process[
        index
      ].infrastructure = this.state.newStage.infrastructure;
      infrastructurePipeline.promotion_process[
        index
      ].infrastructureName = this.state.newStage.infrastructureName;
      infrastructurePipeline.promotion_process[
        index
      ].infrastructureProvider = this.state.newStage.infrastructureProvider;
    }
    else {
      // create new stage and set initial stage attributes for the canvas
      const stage = new Stage();
      stage.index = infrastructurePipeline.promotion_process.length;
      stage.name = this.state.newStage.name;
      stage.project_role_bindings = project_role_bindings;
      stage.application_promoters = application_promoters;
      stage.infrastructure = this.state.newStage.infrastructure;
      stage.infrastructureName = this.state.newStage.infrastructureName;
      stage.infrastructureProvider = this.state.newStage.infrastructureProvider;
      stage.projects = [];

      infrastructurePipeline.promotion_process.push(stage);
    }

    this.props.handleSubmit(event, infrastructurePipeline);
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  handleChange = (e, prop) => {
    const o = Object.assign({}, this.state.newStage);
    o[prop] = e.target.value;

    if (prop === 'infrastructure') {
      const infra = this.props.infrastructures.find(
        infrastructure => infrastructure.id === e.target.value
      );
      o.infrastructureProvider = infra.provider;
      o.infrastructureName = infra.name;
    }
    this.setState({ newStage: o });
  };

  handleCreateUser = (event) => {
    this.setState({ user: {}, createUserView: true, createStageView: false });
    event.preventDefault();
  };

  handleCreateUserSubmit = (event, u) => {
    const userApi = new labsApi.UserApi();
    const user = new labsApi.User();
    Object.assign(user, u);
    userApi.addUser({ body: user }, (e) => {
      // todo: display an error
      if (e) console.error(e);
      this.getUsers(() => {
        this.setState({ createUserView: false, createStageView: true });
      });
    });
    event.preventDefault();
  };

  handleCreateUserCancel = (event) => {
    event.preventDefault();
    this.setState({ createUserView: false, createStageView: true });
  };

  render() {
    const columns = [
      {
        field: 'user_name',
        displayName: 'Username'
      },
      {
        field: 'email',
        displayName: 'Email'
      },
      {
        field: 'first_name',
        displayName: 'First Name'
      },
      {
        field: 'last_name',
        displayName: 'Last Name'
      },
      {
        field: 'role',
        displayName: 'Role'
      },
      {
        field: 'promotion',
        displayName: 'Promotion Rights'
      }
    ];

    if (this.state.createStageView) {
      return (
        <form role="form">
          <div className="form-group">
            <label htmlFor="input1">Stage Name</label>
            <input type="text"
              className="form-control"
              id="input1"
              required=""
              placeholder="stage-name"
              value={this.state.newStage.name}
              onChange={(e) => {
                this.handleChange(e, 'name');
              }}/>
          </div>
          <div className="form-group">
            <label htmlFor="infrastructure" className="required-pf">
              Infrastructure
            </label>
            <br/>
            <select value={this.state.newStage.infrastructure}
              id="infrastructure"
              className="selectpicker form-control"
              onChange={(e) => {
                this.handleChange(e, 'infrastructure');
              }}>
              <option/>
              {this.props.infrastructures.map((infra, i) => (
                <option value={infra.id} key={i}>{infra.name}</option>
              ))}
            </select>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="usersLabel">
              <span id="usersLabel">Users and Roles</span>
            </label>
            {(() => {
              if (this.state.users && this.state.users.length) {
                return [
                  <div className={cx(c.float_right)}>
                    <button type="submit"
                      className="btn btn-default"
                      onClick={this.handleCreateUser}>
                      Create
                    </button>
                  </div>,
                  <br/>,
                  <br/>,
                  <TableSelectionView ref={(tsv) => {
                    this.tableSelectiveView = tsv;
                  }}
                    columns={columns}
                    users={this.state.users}
                    stage={this.state.newStage}
                    handleRowClick={this.handleRowClick}/>
                ];
              }
              return (
                <EmptyState hideTitle>
                  <div className="text-center">
                    <h4>No users exist for this stage.</h4>
                    <p>
                      You must have at least one user defined to build your infrastructurePipeline onto a stage.
                    </p>
                    <button type="submit"
                      className="btn btn-default"
                      onClick={this.handleCreateUser}>
                      Create User
                    </button>
                  </div>
                </EmptyState>
              );
            })()}
          </div>
          <br/>
          <div className="form-group text-center">
            <button type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}>
              Submit
            </button>
            &nbsp;&nbsp;
            <button type="submit"
              className="btn btn-default"
              onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      );
    }
    else if (this.state.createUserView) {
      return (
        <div>
          <CreateUserForm handleSubmit={this.handleCreateUserSubmit}
            handleCancel={this.handleCreateUserCancel}
            value={this.state.user}
            hideHeading/>
        </div>
      );
    }
  }
}

export default CreateStageForm;
