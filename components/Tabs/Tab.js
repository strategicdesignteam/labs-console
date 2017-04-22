import React, { PropTypes } from 'react';

/**
 * React <b>Tab</b> Component for Patternfly Web Components
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
class Tab extends React.Component {

  static propTypes = {
    tabTitle: React.PropTypes.string,
    active: React.PropTypes.bool,
    tabKey: React.PropTypes.string
  };

  componentDidUpdate() {
    this.setActive();
  }

  componentDidMount() {
    this.setActive();
  }

  setActive(){
    if(this.props.active){
      this.refs.pfTab.parentElement.setActiveTab(this.props.tabTitle || "");
    }
  }

  render() {
    const {tabKey} = this.props;
    return (
    <pf-tab tabTitle={this.props.tabTitle || ""} active={this.props.active || false} key={tabKey} ref="pfTab">
      {this.props.children}
    </pf-tab>
    )
  }
}

Tab.defaultProps = {
  tabKey: 'tab'
}

export default Tab;