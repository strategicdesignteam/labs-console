import React from 'react';
import Link from '../Link';
import history from '../../core/history';
import PfBreakpoints from './PfBreakpoints';
import PfVerticalNavigation from './PfVerticalNavigation';

class Navigation extends React.Component {

  state = { topologyActive: false };

  componentDidMount() {
    // Initialize the vertical navigation
    $().setupVerticalNavigation(true);
  }

  checkRoutes(location){
    let topologyRoutes = ['/home','/topology'];
    for(var i =0; i< topologyRoutes.length; i++){
      if(location.pathname.indexOf(topologyRoutes[i]) > -1){
        this.setState({topologyActive: true});
        return;
      }
    }
    this.setState({topologyActive: false});
  }

  componentWillMount(){
    let location = history.getCurrentLocation();
    this.checkRoutes(location);
  }

  render() {
    let location = history.getCurrentLocation();

    return (
      <div className="nav-pf-vertical">
        <ul className="list-group">
          <li className={"list-group-item" + (this.state.topologyActive ? ' active' : '')}>
            <Link to="/home">
              <span className="fa fa-rocket" data-toggle="tooltip" title="Topology"></span>
              <span className="list-group-item-value">Topologies</span>
            </Link>
          </li>
          <li className={"list-group-item" + (location.pathname == '/builds' ? ' active' : '')}>
            <Link to="/builds">
              <span className="fa fa-tasks" data-toggle="tooltip" title="Apps"></span>
              <span className="list-group-item-value">Builds</span>
            </Link>
          </li>
          <li className={"list-group-item" + (location.pathname == '/users' ? ' active' : '')}>
            <Link to="/users">
              <span className="fa fa-users" data-toggle="tooltip" title="Users"></span>
              <span className="list-group-item-value">Users & Groups</span>
            </Link>

          </li>
        </ul>
      </div>
    );
  }

}

export default Navigation;
