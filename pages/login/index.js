import React from 'react';
import labsApi from '../../data/index';
import history from '../../core/history';
import constants from '../../core/constants';

class LoginPage extends React.Component {
  state = { credentials: {} };

  componentWillMount() {
    document.querySelector('html').classList.add('login-pf');
  }

  componentDidMount() {
    document.title = constants.app_title;
  }

  componentWillUnmount() {
    document.querySelector('html').classList.remove('login-pf');
  }

  handleChange = (e, prop) => {
    const o = Object.assign({}, this.state.credentials);
    o[prop] = e.target.value;
    this.setState({ credentials: o });
  };

  loginClick = (event) => {
    const loginApi = labsApi.LoginApi.instance;
    loginApi.loginUser({ body: this.state.credentials }, (e, data) => {
      if (e) console.log(e);
      if (data && data.hash) {
        loginApi.setCredentials(data);
        history.push('/welcome');
      }
    });

    event.preventDefault();
  };

  render() {
    return (
      <div>
        <span id="badge">
          <img style={{ height: 69 }}
            src="/img/labs-logo-icon.svg"
            alt="logo"/>
        </span>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div id="brand">
                <img src="/img/labs-logo-text.svg"
                  alt="Red Hat Open Innovation Labs"/>
              </div>
            </div>
            <div className="col-sm-7 col-md-6 col-lg-5 login">
              <form className="form-horizontal" role="form" action="index.html">
                <div className="form-group">
                  <label htmlFor="inputUsername"
                    className="col-sm-2 col-md-2 control-label">
                    Username
                  </label>
                  <div className="col-sm-10 col-md-10">
                    <input type="text"
                      value={this.state.credentials.username}
                      onChange={(e) => {
                        this.handleChange(e, 'username');
                      }}
                      className="form-control"
                      id="inputUsername"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword"
                    className="col-sm-2 col-md-2 control-label">
                    Password
                  </label>
                  <div className="col-sm-10 col-md-10">
                    <input type="password"
                      value={this.state.credentials.password}
                      onChange={(e) => {
                        this.handleChange(e, 'password');
                      }}
                      className="form-control"
                      id="inputPassword"/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-8 col-sm-offset-2 col-sm-6 col-md-offset-2 col-md-6">
                    <div className="checkbox">
                      <label htmlFor="remember">
                        <input id="remember" type="checkbox"/>
                        Remember username
                      </label>
                    </div>
                    <span className="help-block">
                      {' '}
                      Forgot
                      {' '}
                      <a href="#">username</a>
                      {' '}
                      or
                      {' '}
                      <a href="#">password</a>
                      ?
                    </span>
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-4 submit">
                    <button id="loginBtn"
                      type="submit"
                      onClick={this.loginClick}
                      className="btn btn-primary btn-lg">
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-sm-5 col-md-6 col-lg-7 details">
              <p><strong>Welcome to Red Hat Innovation Labs</strong></p>
              <p>
                Labs Console is a web interface to drive Push Button Infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
