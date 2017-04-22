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

  constructor(props) {
    super(props) 
    this.state = {
      explicitCollapse: location.pathname.indexOf('/topology') > -1
    } 
  }

  render() {
    return (
      <div>
        <Header />
        {(() => {
          if(this.props.nav) {
            return <Navigation explicitCollapse={this.state.explicitCollapse} />;
          }
        })()}
        <div className={cx(s.content, this.props.className, {'collapsed-nav': this.state.explicitCollapse})}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Layout;
