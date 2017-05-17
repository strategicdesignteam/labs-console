import React from 'react';
import cx from 'classnames';

class EmptyState extends React.Component {
  static propTypes = {
    hideTitle: React.PropTypes.bool
  };

  render() {
    const arrow = cx({
      fa: true,
      'fa-angle-right': this.props.active
    });

    return (
      <div className="row">
        <div className="col-md-12">

          {!this.props.hideTitle &&
            <div className={arrow}>
              <h1>{this.props.title}</h1>
            </div>}

          <div className={`blank-slate-pf ${this.props.class}`}>
            {this.props.children}
          </div>

        </div>
      </div>
    );
  }
}

export default EmptyState;
