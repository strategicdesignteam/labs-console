import React, { PropTypes } from 'react'

/**
 * Canvas Scroll Toolbox for Patternfly React
 */
const CanvasScrollToolbox = ({ isOpen, children }) => {
  if (isOpen) {
    return (
      <div className='canvas-editor-toolbox'>
        <div className='canvas-scroll-toolbox'>
          {children}
        </div>
      </div>
    )
  } else {
    return null
  }
}
CanvasScrollToolbox.propTypes = {
  /** toolbox is open  */
  isOpen: PropTypes.bool,
  /** children nodes  */
  children: PropTypes.node
}
CanvasScrollToolbox.defaultProps = {
  isOpen: false
}

export default CanvasScrollToolbox
