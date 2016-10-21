import React from 'react';
import cx from 'classnames';


class EmptyState extends React.Component {

  static propTypes = {
    handleCreate: React.PropTypes.func
  };

  render() {
    let titleClass = cx({
      'page-header': true,
      'no-border': !this.props.title
    });

    return (
        <div className="row">
          <div className="col-md-12">

            <div className={titleClass}>
              <h1>{ this.props.title }</h1>
            </div>

            <div className={'blank-slate-pf ' + this.props.class}>
              { this.props.children }
            </div>

          </div>
        </div>
    );
  }

}

export default EmptyState;
