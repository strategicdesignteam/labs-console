import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Navigation from './Navigation';
import s from './Layout.css';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    nav: PropTypes.bool
  };

  render() {
    return (
      <div>
        <Header />
        {(() => {
          if(this.props.nav) {
            return <Navigation />;
          }
        })()}
        <div className={cx(s.content, this.props.className)}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Layout;
