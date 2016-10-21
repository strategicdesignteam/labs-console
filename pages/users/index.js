import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import TableView from '../../components/TableView/TableView';
import CreateUserForm from '../../components/Forms/CreateUserForm';
import labsApi from '../../data/index';
import constants from '../../core/constants';
import c from '../common.css'

class UsersPage extends React.Component {

  state = { users: [], createUserView: false, user:{}, edit: false };

  componentDidMount() {
    document.title = constants.app_title;
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    let userApi = new labsApi.UserApi();
    userApi.usersGet((error, users, res) => {
      this.setState({users: users});
    });
  }

  handleRowClick = (event, user) => {
    this.setState({user: user, createUserView: true, edit: true});
  };

  handleCreate = (event) => {
    this.setState({user: {}, createUserView: true, edit: false});
  };

  handleCreateUserSubmit = (event, u) => {
    let userApi = new labsApi.UserApi();
    let user = new labsApi.User();
    Object.assign(user, u);
    if(this.state.edit){
      //edit mode
      userApi.updateUser(u.id, {'body': user}, (e) => {
          //todo: display an error
          if (e) console.error(e);
          this.refresh();
        });
    } else {
      //create mode
      userApi.addUser({'body': user}, (e) => {
          //todo: display an error
          if (e) console.error(e);
          this.refresh();
        });
    }
    event.preventDefault();
  };

  refresh() {
    this.setState({createUserView: false});
    this.getUsers();
  }

  handleCreateUserCancel = (event) => {
    event.preventDefault();
    this.setState({createUserView: false});
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
      }
    ];

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav= { true }>
        {(() => {
          if(this.state.createUserView){
            return <CreateUserForm handleSubmit={this.handleCreateUserSubmit.bind(this)}
                                  handleCancel={this.handleCreateUserCancel.bind(this)}
                                  value={this.state.user}/>;
          } else {
            let content = [];
            content.push(<div className="page-header" key="users-page-header">
                <h2> Users
                  <div className={c.float_right}>
                    <button type="submit" className="btn btn-primary" onClick={this.handleCreate}>Create</button>
                  </div>
                </h2>
              </div>
            );
            content.push(<br key="users-page-br"/>);

            if (this.state.users.length) {
              content.push(<TableView columns={ columns } data ={ this.state.users } handleRowClick={this.handleRowClick}
                                      key="users-table-view"/>);
            } else {
              content.push(<h4 key="users-no-users">No users exist.</h4>);
              content.push(<p key="users-add-users-message">Hit the create button to add users.</p>);
            }
            return content;
          }
        })()}
      </Layout>
    );
  }
}

export default UsersPage;
