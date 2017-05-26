import cx from 'classnames';
import React, { PropTypes } from 'react';

/**
 * ListViewItemExpansion Component for Patternfly React
 */
const ListViewItemExpansion = ({
  children,
  isActive,
  listViewItemExpansionClass
}) => {
  const itemClass = cx(listViewItemExpansionClass, isActive ? 'in' : '');

  return (
    <div className={itemClass}>
      {children}
    </div>
  );
};
ListViewItemExpansion.propTypes = {
  /** children nodes  */
  children: PropTypes.node,
  /** whether item is active  */
  isActive: PropTypes.bool,
  /** list view item expansion class */
  listViewItemExpansionClass: PropTypes.string
};
ListViewItemExpansion.defaultProps = {
  isActive: false,
  listViewItemExpansionClass: 'list-pf-expansion collapse'
};

export default ListViewItemExpansion;
