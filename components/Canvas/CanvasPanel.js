  import React, { PropTypes } from 'react'

  /**
   * Canvas Panel for Patternfly React
   */
  const CanvasPanel = ({ panelClass, panelTitle, children }) => {
    return (
      <div className={panelClass}>
        <div className='canvas-panel-heading'>{panelTitle + ' Properties'}</div>
        <div className='canvas-panel-body'>
          {children}
        </div>
      </div>
    )
  }
  CanvasPanel.propTypes = {
    /** panel class */
    panelClass: PropTypes.string,
    /** children nodes  */
    children: PropTypes.node
  }
  CanvasPanel.defaultProps = {
    panelClass: 'canvas-panel',
    panelTitle: 'Properties'
  }

  export default CanvasPanel
