import ClassNames from 'classnames';
import React, { PropTypes } from 'react';

/**
 * ToastNotification Component for Patternfly React
 */
const ToastNotification = ({ children, onDismiss, type }) => {
  const toastNotificationClass = ClassNames({
    'toast-pf alert': true,
    'alert-danger': type === 'danger' || type === 'error',
    'alert-warning': type === 'warning',
    'alert-success': type === 'success',
    'alert-info': type === 'info',
    'alert-dismissable': onDismiss
  });
  const iconClass = ClassNames({
    pficon: true,
    'pficon-error-circle-o': type === 'danger' || type === 'error',
    'pficon-warning-triangle-o': type === 'warning',
    'pficon-ok': type === 'success',
    'pficon-info': type === 'info'
  });

  return (
    <div className={toastNotificationClass}>
      {onDismiss &&
        <button type="button"
          className="close"
          aria-hidden="true"
          onClick={onDismiss}>
          <span className="pficon pficon-close"/>
        </button>}
      <span className={iconClass}/>
      {children}
    </div>
  );
};
ToastNotification.propTypes = {
  /** children nodes  */
  children: PropTypes.node,
  /** callback when ToastNotification is dismissed  */
  onDismiss: PropTypes.func,
  /** the type of ToastNotification  */
  type: PropTypes.oneOf(['danger', 'error', 'warning', 'success', 'info'])
    .isRequired
};
ToastNotification.defaultProps = {
  type: 'error'
};

export default ToastNotification;
