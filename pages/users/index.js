import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import TableView from '../../components/TableView/TableView';
import ToolbarView from '../../components/Toolbar/ToolbarView';
import CreateUserForm from '../../components/Forms/CreateUserForm';
import CreateGroupForm from '../../components/Forms/CreateGroupForm';
import Tabs from '../../components/Tabs/Tabs'
import Tab from '../../components/Tabs/Tab';
import labsApi from '../../data/index';
import constants from '../../core/constants';

class UsersPage extends React.Component {

  state = {
    users: [],
    groups: [],
    groupsJoined: [],
    createUserView: false,
    createGroupView: false,
    user:{},
    group: {},
    activeTab: 'Users',
    usersFilterColumn: '',
    usersFilterText: '',
    usersRowCount: 0,
    groupsFilterColumn: '',
    groupsFilterText: '',
    groupsRowCount: 0
  };

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillMount() {
    this.getUsers();
    this.getGroups();
  }

  getUsers() {
    let userApi = new labsApi.UserApi();
    userApi.usersGet((error, users, res) => {
      this.setState({users: users});
    });
  }

  getGroups() {
    //mock UI data for now, will have to translate backend model to this format later
    let groups = [
      {id: 1, name: 'loyalty-developers', users: [{id: 1, username:'jholmes'}, {id:2, username:'priley'}]},
      {id: 2, name: 'loyalty-admins', users: [{id: 1, username:'jholmes'}, {id:2, username:'priley'}, {id:3, username: 'jlabocki'}]},
      {id: 3, name: 'loyalty-users', users: [{id: 4, username:'vconzola'}]},
      {id: 4, name: 'cloud-admins', users: [{id: 1, username:'jholmes'}]},
      {id: 5, name: 'cloud-users', users: [{id:2, username:'priley'}, {id:3, username: 'jlabocki'}]},
      {id: 6, name: 'cloud-viewers', users: []}
    ];

    //for table visualization we join groups into a comma separated string
    let groupsJoined = groups.map((g) => {
      let users = g.users.map((u) => { return u.username });
      return {name: g.name, users: users.join()}
    });

    this.setState({groups: groups, groupsJoined: groupsJoined});
  }

  handleTabChanged(e){
    if(this.state.activeTab != e.detail){
      this.setState({activeTab: e.detail});
    }
  }

  /**
   * Users Tab event handlers
   */
  handleUserRowClick = (event, user) => {
    this.setState({user: user, createUserView: true});
  };

  handleCreateUser = (event) => {
    this.setState({user: {}, createUserView: true});
  };

  handleCreateUserSubmit = (event, u) => {
    this.getUsers();
    this.setState({createUserView: false, activeTab: 'Users', usersFilterText: ''});
  };


  handleCreateUserCancel = (event) => {
    event.preventDefault();
    this.setState({createUserView: false, activeTab: 'Users', usersFilterText: ''});
  };

  handleUserFilterChanged = (event, filter, filterText) => {
    event.preventDefault();
    this.setState({usersFilterColumn: filter.field, usersFilterText: filterText});
  };

  handleUserSearch = (event) => {
    this.setState({usersFilterColumn: "*", usersFilterText: event.target.value});
  };

  handleUserSearchClose = (event) => {
    this.setState({usersFilterColumn: '', usersFilterText: ''});
  };

  observeUsersRowCount = (count) => {
    this.setState({usersRowCount: count});
  };

  /**
   * Groups Tab event handlers
   */
  handleGroupRowClick = (event, group, row) => {
    this.setState({group: this.state.groups[row], createGroupView: true});
  };

  handleCreateGroup = (event) => {
    this.setState({group: {}, createGroupView: true});
  };

  handleCreateGroupSubmit = (event, u) => {
    this.getGroups();
    this.setState({createGroupView: false, activeTab: 'Groups', groupsFilterText: ''});
  };

  handleCreateGroupCancel = (event) => {
    event.preventDefault();
    this.setState({createGroupView: false, activeTab: 'Groups', groupsFilterText: ''});
  };

  handleGroupFilterChanged = (event, filter, filterText) => {
    event.preventDefault();
    this.setState({groupsFilterColumn: filter.field, groupsFilterText: filterText});
  };

  handleGroupSearch = (event) => {
    this.setState({groupsFilterColumn: "*", groupsFilterText: event.target.value});
  };

  handleGroupSearchClose = (event) => {
    this.setState({groupsFilterColumn: '', groupsFilterText: ''});
  };

  observeGroupsRowCount = (count) => {
    this.setState({groupsRowCount: count});
  };

  render() {

    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav= { true }>
        {(() => {
          if(this.state.createUserView){
            return <CreateUserForm handleSubmit={this.handleCreateUserSubmit.bind(this)}
                                   handleCancel={this.handleCreateUserCancel.bind(this)}
                                   value={this.state.user}/>;
          } else if(this.state.createGroupView){
            return <CreateGroupForm handleSubmit={this.handleCreateGroupSubmit.bind(this)}
                                    handleCancel={this.handleCreateGroupCancel.bind(this)}
                                    value={this.state.group}/>;
          }
          else {
            let pageHeader = <div className="page-header" key="users-page-header">
              <h2> Users & Groups</h2>
            </div>;

            /**
             * Users Tab Content
             */
            let userTab = [];

            if (this.state.users.length) {
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
              userTab = [
                <ToolbarView key="users-toolbar"
                             primaryAction={{label: 'Create User', action: this.handleCreateUser.bind(this)}}
                             columns={ columns }
                             filterChanged={this.handleUserFilterChanged.bind(this)}
                             handleSearch={this.handleUserSearch.bind(this)}
                             handleSearchClose={this.handleUserSearchClose.bind(this)}
                             resultsCount={this.state.usersRowCount}/>,
                <TableView key="users-table-view"
                           columns={ columns }
                           data ={ this.state.users }
                           filterColumn={ this.state.usersFilterColumn }
                           filterText={ this.state.usersFilterText }
                           handleRowClick={this.handleUserRowClick}
                           observeRowCount={this.observeUsersRowCount.bind(this)}/>,
              ];
            } else {
              userTab = [
                <div className="blank-slate-pf table-view-pf-empty" key="no-users-div">
                  <div className="blank-slate-pf-icon">
                    <span className="pficon pficon pficon-add-circle-o"></span>
                  </div>
                  <h2 key="users-no-users">No users exist.</h2>
                  <br/>
                  <button type="submit" className="btn btn-primary" onClick={this.handleCreateUser}>Create User</button>
                </div>
              ];
            }

            /**
             * Groups Tab Content
             */
            let groupTab = [];

            if (this.state.groups.length) {
              let columns = [
                {
                  'field': 'name',
                  'displayName':'Name'
                },
                {
                  'field': 'users',
                  'displayName':'Members'
                }
              ];
              groupTab = [
                <ToolbarView key="groups-toolbar"
                             primaryAction={{label: 'Create Group', action: this.handleCreateGroup.bind(this)}}
                             columns={ columns }
                             filterChanged={this.handleGroupFilterChanged.bind(this)}
                             handleSearch={this.handleGroupSearch.bind(this)}
                             handleSearchClose={this.handleGroupSearchClose.bind(this)}
                             resultsCount={this.state.groupsRowCount}/>,
                <TableView key="groups-table-view"
                           columns={ columns }
                           data ={ this.state.groupsJoined }
                           filterColumn={ this.state.groupsFilterColumn }
                           filterText={ this.state.groupsFilterText }
                           handleRowClick={this.handleGroupRowClick}
                           observeRowCount={this.observeGroupsRowCount.bind(this)}/>,
              ];
            } else {
              groupTab = [
                <div className="blank-slate-pf table-view-pf-empty" key="no-users-div">
                  <div className="blank-slate-pf-icon">
                    <span className="pficon pficon pficon-add-circle-o"></span>
                  </div>
                  <h2 key="users-no-users">No groups exist.</h2>
                  <br/>
                  <button type="submit" className="btn btn-primary" onClick={this.handleCreateGroup}>Create Group</button>
                </div>
              ];
            }

            return [
              pageHeader,
              <br key="users-page-br"/>,
              <Tabs key="pf-tabs" ref="pfTabs" tabChanged={this.handleTabChanged.bind(this)} tabsClass='nav nav-tabs user-tabs'>
                <Tab tabTitle="Users" active={this.state.activeTab == 'Users'}>
                  {userTab}
                </Tab>
                <Tab tabTitle="Groups" active={this.state.activeTab == 'Groups'}>
                  {groupTab}
                </Tab>
              </Tabs>
            ];
          }
        })()}
      </Layout>
    );
  }
}

export default UsersPage;
