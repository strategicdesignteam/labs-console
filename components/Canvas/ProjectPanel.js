import React from 'react';

class ProjectPanel extends React.Component {
  static propTypes = {
    handleChange: React.PropTypes.func,
    value: React.PropTypes.object
  };

  render() {
    const { handleChange, value } = this.props;

    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="input1" className="required-pf">Project Name</label>
          <input type="text"
            className="form-control"
            id="input1"
            required=""
            placeholder="project-name"
            value={value.name}
            onChange={(e) => {
              handleChange(e, 'name');
            }}/>
        </div>
        <div className="form-group">
          <label htmlFor="input2" className="required-pf">Display Name</label>
          <input type="text"
            className="form-control"
            id="input2"
            required=""
            placeholder="Display Name"
            value={value.display_name}
            onChange={(e) => {
              handleChange(e, 'display_name');
            }}/>
        </div>
      </form>
    );
  }
}

export default ProjectPanel;
