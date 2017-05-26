import React from 'react';
import './pf-tooltip.js';

/**
 * React <b>Tooltip</b> Component for Patternfly Web Components
 *
 * @requires <b>pf-tooltip</b> web component:
 * https://github.com/patternfly-webcomponents/patternfly-webcomponents/tree/master/src/pf-tooltip
 *
 * @prop {string} animation the animation class
 * @prop {string} targetSelector the target element selector
 * @prop {string} placement left, right, top, bottom
 * @prop {number} delay animation delay (ms)
 * @prop {number} duration animation duration (ms)
 * @prop {string} containerSelector the container element selector
 *
 *
 * @example {@lang xml}
 * <Tooltip animation="fade" targetSelector="#input1" placement="right" delay={50} duration={150} containerSelector="#container">
 *  <span>Tooltip content</span>
 * </Tooltip>
 *
 */
class Tooltip extends React.Component {
  static propTypes = {
    animation: React.PropTypes.string,
    targetSelector: React.PropTypes.string,
    placement: React.PropTypes.string,
    delay: React.PropTypes.number,
    duration: React.PropTypes.number,
    containerSelector: React.PropTypes.string
  };

  componentDidMount() {
    this.handleContentChanged();
  }

  componentDidUpdate() {
    this.handleContentChanged();
  }

  handleContentChanged() {
    const event = new CustomEvent('handleContentChanged', {});
    this.pfTooltip.dispatchEvent(event);
  }

  render() {
    return (
      <pf-tooltip ref={(t) => {
        this.pfTooltip = t;
      }}
        animation={this.props.animation}
        targetSelector={this.props.targetSelector}
        placement={this.props.placement}
        delay={this.props.delay}
        duration={this.props.duration}
        containerSelector={this.props.containerSelector}>
        {this.props.children}
      </pf-tooltip>
    );
  }
}

export default Tooltip;
