import React from 'react';
import c from '../../pages/common.css';

class CreateAppForm extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    value: React.PropTypes.object
  };

  state = {
    json: '',
    jsonForm: false,
    newApp: { build_application_commands: [''] }
  };

  componentWillMount() {
    try {
      // try to stringify our app json
      if (this.props.value.json) {
        const json = JSON.stringify(this.props.value.json);
        this.setState({ json });
      }
    }
    catch (e) {
      // todo: show error
      console.log(e);
    }
  }

  handleSubmit = (event) => {
    try {
      // try to parse our app json, if it can't be parsed, bail and let them try again
      const json = JSON.parse(this.state.json);
      this.props.handleSubmit(event, { json, index: this.props.value.index });
    }
    catch (e) {
      // todo: show error
      console.log(e);
      event.preventDefault();
    }
  };

  handleCancel = (event) => {
    this.props.handleCancel(event);
  };

  handleJsonChange(event) {
    this.setState({ json: event.target.value });
  }

  handleChange = (e, prop) => {
    const o = Object.assign({}, this.state.newApp);
    o[prop] = e.target.value;
    this.setState({ newApp: o });
  };

  addBuildCommand = (event, value) => {
    const a = Object.assign({}, this.state.newApp);
    a.build_application_commands.push(value || '');
    this.setState({ newApp: a });
  };

  handleChangeBuildCommand = (event, i) => {
    const a = Object.assign({}, this.state.newApp);
    a.build_application_commands[i] = event.target.value;
    this.setState({ newApp: a });
  };

  render() {
    let applicationForm = null;

    if (this.state.jsonForm) {
      applicationForm = (
        <form role="form">
          <div className={c.float_right}>
            <a href="#"
              onClick={() => {
                this.setState({ jsonForm: false });
              }}>
              Use Form Fields
            </a>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="input1" className="required-pf">Application</label>
            <textarea type="text"
              className="form-control"
              id="input1"
              required=""
              rows="10"
              placeholder="paste application json..."
              value={this.state.json}
              onChange={(e) => {
                this.handleJsonChange(e);
              }}/>
          </div>
          <br/>
          <div className="form-group text-center">
            <button type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}>
              Save
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
    else {
      applicationForm = (
        <form className="form-horizontal" role="form">
          <div className={c.float_right}>
            <a href="#"
              onClick={() => {
                this.setState({ jsonForm: true });
              }}>
              Use JSON
            </a>
          </div>
          <br/>
          <br/>
          <div className="form-group">
            <label htmlFor="input1"
              className="col-sm-2 control-label required-pf">
              Application Name
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                id="input1"
                required=""
                placeholder="application-name"
                value={this.state.newApp.name}
                onChange={(e) => {
                  this.handleChange(e, 'name');
                }}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="input2"
              className="col-sm-2 control-label required-pf">
              Base Image URL
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                id="input2"
                required=""
                placeholder="container image git url"
                value={this.state.newApp.base_image}
                onChange={(e) => {
                  this.handleChange(e, 'base_image');
                }}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="input3" className="col-sm-2 control-label">
              Build Tool
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                id="input3"
                required=""
                placeholder="node4"
                value={this.state.newApp.build_tool}
                onChange={(e) => {
                  this.handleChange(e, 'build_tool');
                }}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="command1" className="col-sm-2 control-label">
              Build Commands
            </label>
            <div className="col-sm-10">
              {this.state.newApp.build_application_commands &&
                this.state.newApp.build_application_commands.length &&
                this.state.newApp.build_application_commands.map(
                  (build_command, i) => (
                    <input type="text"
                      className={`${c.space_inputs} form-control`}
                      id={`command${i}`}
                      key={i}
                      required=""
                      placeholder="npm install"
                      value={build_command}
                      onChange={(e) => {
                        this.handleChangeBuildCommand(e, i);
                      }}/>
                  )
                )}
              {!this.state.newApp.build_application_commands &&
                <input type="text"
                  className={`${c.space_inputs} form-control`}
                  id="input3"
                  required=""
                  placeholder="npm install"
                  value=""
                  onChange={(e) => {
                    this.handleChangeBuildCommand(e, 0);
                  }}/>}
              <a href="#"
                className={c.space_inputs}
                onClick={(e) => {
                  this.addBuildCommand(e, null);
                }}>
                Add Build Command
              </a>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="input4" className="col-sm-2 control-label">
              Git Repository URL
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                id="input4"
                required=""
                placeholder="https://github.com/openshift/nodejs-ex.git"
                value={this.state.newApp.scm_url}
                onChange={(e) => {
                  this.handleChange(e, 'scm_url');
                }}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="input5" className="col-sm-2 control-label">
              Git Reference
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                id="input5"
                required=""
                placeholder="master"
                value={this.state.newApp.scm_ref}
                onChange={(e) => {
                  this.handleChange(e, 'scm_ref');
                }}/>
            </div>
          </div>
          <br/>
          <h3>Routes</h3>
          <div className="form-group form-inline">
            <label htmlFor="input6" className="col-sm-2 control-label">
              Hostname
            </label>
            <div className="col-sm-10 inline-elements">
              <input type="text"
                className="form-control"
                id="input6"
                required=""
                placeholder="my-app"
                value={this.state.newApp.name}
                onChange={(e) => {
                  this.handleChange(e, 'hostname_app');
                }}/>
              <span className={c.dot}>{'.'}</span>
              <input type="text"
                className="form-control"
                id="input6"
                required=""
                placeholder="my-app"
                value="{stage}"
                disabled="true"/>
              <span className={c.dot}>{'.'}</span>
              <input type="text"
                className="form-control"
                id="input7"
                required=""
                placeholder="subdomain"
                value={this.state.newApp.hostname_subdomain}
                onChange={(e) => {
                  this.handleChange(e, 'hostname_subdomain');
                }}/>
              <span className={c.dot}>{'.'}</span>
              <input type="text"
                className="form-control"
                id="input8"
                required=""
                placeholder="com"
                value={this.state.newApp.hostname_domain}
                onChange={(e) => {
                  this.handleChange(e, 'hostname_domain');
                }}/>
            </div>
          </div>
          <br/>
          <div className="form-group text-center">
            <button type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}>
              Save
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

    return (
      <section>
        <h2>
          {this.props.value.json
            ? 'Edit Application Template'
            : 'Create Application Template'}
        </h2>
        <hr/>
        {applicationForm}
      </section>
    );
  }
}

export default CreateAppForm;
