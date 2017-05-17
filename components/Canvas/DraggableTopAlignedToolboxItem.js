import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const defaultItemClass = 'toolbox-item';

const toolboxItemSource = {
  beginDrag(props) {
    return {
      itemClass: props.itemClass || defaultItemClass,
      itemAttributes: props.itemAttributes,
      children: props.children
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

/**
 * Draggable Top Aligned Toolbox Item for Patternfly React
 */
class DraggableTopAlignedToolboxItem extends React.Component {
  render() {
    const { itemClass, key, connectDragSource, children } = this.props;

    let content = (
      <li className={itemClass} key={key}>
        {children}
      </li>
    );
    content = connectDragSource(content, { dropEffect: 'move' });
    return content;
  }
}
DraggableTopAlignedToolboxItem.PropTypes = {
  /** canvas item types */
  canvasSourceItemType: PropTypes.string,
  /** the toolbox item class */
  itemClass: PropTypes.string,
  /** attritubes of the toolbox item used in constructing canvas nodes */
  itemAttributes: PropTypes.string,
  /** the item key */
  key: PropTypes.string,
  /** drag operation has started */
  isDragging: PropTypes.bool,
  /** connects node to DnD backend as a drag source */
  connectDragSource: PropTypes.func,
  /** children nodes */
  children: PropTypes.node
};
DraggableTopAlignedToolboxItem.defaultProps = {
  itemClass: defaultItemClass,
  itemAttributes: {}
};
const dragType = props => props.canvasSourceItemType;
export default DragSource(dragType, toolboxItemSource, collect)(
  DraggableTopAlignedToolboxItem
);
