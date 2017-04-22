import React, { PropTypes } from 'react';
import c from '../../pages/common.css';
import cx from 'classnames';

class ProjectPanel extends React.Component {

  static propTypes = {
    handleChange: React.PropTypes.func,
    value: React.PropTypes.object
  };

  render() {
    const {handleChange, value} = this.props;
    
    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="input1" className="required-pf">Project Name</label>
          <input type="text" className="form-control" id="input1" required="" placeholder="project-name"
            value={value.name}
            onChange={(e) => { handleChange(e, 'name') } } />
        </div>
        <div className="form-group">
          <label htmlFor="input2" className="required-pf">Display Name</label>
          <input type="text" className="form-control" id="input2" required="" placeholder="Display Name"
            value={value.display_name}
            onChange={(e) => { handleChange(e, 'display_name') } } />
        </div>
        <div className="form-group">
          <label className="required-pf">Infrastructure</label>
          <br />
          <select value={value.type} className="selectpicker form-control"
            onChange={(e) => { handleChange(e, 'type') } }>
            <option>OpenStack</option>
            <option>AWS</option>
            <option>Google Cloud</option>
            <option>Azure</option>
            <option>RHEV</option>
            <option>VMWare</option>
          </select>
        </div>
      </form>
    )

  }
}

export default ProjectPanel;