import React, { PropTypes } from 'react';

/**
 * ListView Component for Patternfly React
 */
const ListView = ({ children, listViewClass }) => (
  <div className={listViewClass}>
    {children}
  </div>
);
ListView.propTypes = {
  /** children nodes  */
  children: PropTypes.node,
  /** list view class */
  listViewClass: PropTypes.string
};
ListView.defaultProps = {
  isActive: false,
  listViewClass: 'list-pf'
};

export default ListView;
