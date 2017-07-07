import React from 'react';
import cx from 'classnames';
import Link from '../Link';
import history from '../../core/history';
import './PfBreakpoints';
import './PfVerticalNavigation';

class Navigation extends React.Component {
  state = { explicitCollapse: false };

  componentWillMount() {
    const location = history.getCurrentLocation();
    this.checkRoutes(location);
  }

  componentDidMount() {
    // Initialize the vertical navigation
    $().setupVerticalNavigation(true, this.props.explicitCollapse);
  }

  checkRoutes(location) {
    const infrastructurePipelineRoutes = ['/infrastructure-pipeline'];
    this.setState({
      infrastructurePipelineTabActive: infrastructurePipelineRoutes.some(
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
          <li className={`list-group-item${this.state.infrastructurePipelineTabActive ? ' active' : ''}`}>
            <Link to="/infrastructure-pipelines">
              <span className="pficon pficon-equalizer"
                data-toggle="tooltip"
                title="Infrastructure Pipelines"/>
              <span className="list-group-item-value">
                Pipelines
              </span>
            </Link>
          </li>
          <li className={`list-group-item${location.pathname.indexOf('/project-templates') >= 0 ? ' active' : ''}`}>
            <Link to="/project-templates">
              <span className="pficon pficon-image"
                data-toggle="tooltip"
                title="Project Templates"/>
              <span className="list-group-item-value">Project Templates</span>
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
