import React, { PropTypes } from 'react';
import pfTabs from './pf-tabs.component';

/**
 * React <b>Tabs</b> Component for Patternfly Web Components
 *
 * @example {@lang xml}
 * <Tabs tabChanged={ this.tabChanged(e) }>
 *  <Tab tabTitle={"Tab1"} active={true}>
 *    <p>Tab1 content here</p>
 *  </Tab>
 *  <Tab tabTitle={"Tab2"}>
 *    <p>Tab2 content here</p>
 *  </Tab>
 * </Tabs>
 *
 */
class Tabs extends React.Component {

  state = {};

  static propTypes = {
    tabsClass: React.PropTypes.string,
    tabChanged: React.PropTypes.func,
    tabsKey: React.PropTypes.string
  };

  componentDidMount() {
    this.refs[this.props.tabsKey].addEventListener('tabChanged', (e) =>{
      if(this.props.tabChanged){
        this.props.tabChanged(e);
      }
    });
  }

  render() {
    const {tabsClass, tabsKey} = this.props;

    return (
      <pf-tabs key={tabsKey} ref={tabsKey} class={tabsClass}>
        {this.props.children}
      </pf-tabs>
    )
  }
}
Tabs.defaultProps = {
  tabsClass: 'nav nav-tabs',
  tabsKey: 'tabs'
}

export default Tabs;