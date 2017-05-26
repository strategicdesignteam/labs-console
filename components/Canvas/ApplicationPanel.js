import React from 'react';

class ApplicationPanel extends React.Component {
  static propTypes = {
    handleChange: React.PropTypes.func,
    value: React.PropTypes.string
  };

  render() {
    const { handleChange, value } = this.props;

    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="input1" className="required-pf">Application</label>
          <textarea type="text"
            className="form-control"
            id="input1"
            required=""
            rows="10"
            placeholder="paste application json..."
            value={value}
            onChange={handleChange}/>
        </div>
      </form>
    );
  }
}

export default ApplicationPanel;
