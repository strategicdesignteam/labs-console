import React from 'react';
import cx from 'classnames';
import s from './Layout.css';
import labsApi from '../../data/index';
import history from '../../core/history';

class Header extends React.Component {
  logout = (event) => {
    event.preventDefault();
    labsApi.LoginApi.instance.logoutUser();
    history.push('/');
  };
  render() {
    return (
      <nav className="navbar navbar-pf-vertical">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <a href="/" className="navbar-brand">
            <img className={cx(s.labs_logo, 'navbar-brand-icon')}
              src="/img/labs-logo-icon.svg"
              alt=""/>
            <img className={cx(s.labs_brand, 'navbar-brand-name')}
              src="/img/labs-logo-text.svg"
              alt="Red Hat Open Innovation Labs"/>
          </a>
        </div>
        <nav className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right navbar-iconic">
            <li className="dropdown">
              <a className="dropdown-toggle nav-item-iconic"
                id="notifications"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true">
                <span title="Notifications" className="fa pficon-flag"/>
                <span className="badge">2</span>
              </a>
              <div className="dropdown-menu infotip bottom-right">
                <div className="arrow"/>
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="i pficon pficon-info"/>
                    {' '}
                    Modified Datasources ExampleDS
                  </li>
                  <li className="list-group-item">
                    <span className="i pficon pficon-info"/>
                    {' '}
                    Error: System Failure
                  </li>
                </ul>
                <div className="footer">
                  <a>Clear Messages</a>
                </div>
              </div>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle nav-item-iconic"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true">
                <span title="Help" className="fa pficon-help"/>
                <span className="caret"/>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a href="#">Help</a></li>
                <li><a href="#">About</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle nav-item-iconic"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true">
                <span title="Username" className="fa pficon-user"/>
                <span className="caret"/>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><a href="#">Preferences</a></li>
                <li><a href="#" onClick={this.logout}>Logout</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </nav>
    );
  }
}

export default Header;
