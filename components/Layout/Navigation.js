import React from 'react';
import cx from 'classnames';
import Link from '../Link';
import history from '../../core/history';
import './PfBreakpoints';
import './PfVerticalNavigation';

class Navigation extends React.Component {
  state = { topologyTabActive: false, explicitCollapse: false };

  componentWillMount() {
    const location = history.getCurrentLocation();
    this.checkRoutes(location);
  }

  componentDidMount() {
    // Initialize the vertical navigation
    $().setupVerticalNavigation(true, this.props.explicitCollapse);
  }

  checkRoutes(location) {
    const topologyRoutes = ['/topologies', '/topology'];
    this.setState({
      topologyTabActive: topologyRoutes.some(
        route => location.pathname.indexOf(route) > -1
      )
    });
  }

  render() {
    const location = history.getCurrentLocation();

    return (
      <div className={cx('nav-pf-vertical', {
        collapsed: this.props.explicitCollapse
      })}>
        <ul className="list-group">
          <li className={`list-group-item${location.pathname.indexOf('/infrastructures') >= 0 ? ' active' : ''}`}>
            <Link to="/infrastructures">
              <span className="pficon pficon-network"
                data-toggle="tooltip"
                title="Infrastructures"/>
              <span className="list-group-item-value">Infrastructures</span>
            </Link>
          </li>
          <li className={`list-group-item${this.state.topologyTabActive ? ' active' : ''}`}>
            <Link to="/topologies">
              <span className="pficon pficon-topology"
                data-toggle="tooltip"
                title="Topology"/>
              <span className="list-group-item-value">Topologies</span>
            </Link>
          </li>
          <li className={`list-group-item${location.pathname === '/builds' ? ' active' : ''}`}>
            <Link to="/builds">
              <span className="fa fa-tasks"
                data-toggle="tooltip"
                title="Apps"/>
              <span className="list-group-item-value">Builds</span>
            </Link>
          </li>
          <li className={`list-group-item${location.pathname === '/users' ? ' active' : ''}`}>
            <Link to="/users">
              <span className="fa fa-users"
                data-toggle="tooltip"
                title="Users"/>
              <span className="list-group-item-value">Users & Groups</span>
            </Link>

          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
