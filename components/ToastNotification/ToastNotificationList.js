import React, { PropTypes } from 'react';
import constants from '../../core/constants';
import update from 'immutability-helper';
import ToastNotificationService from './ToastNotificationService';
import ToastNotification from './ToastNotification';

class ToastNotificationList extends React.Component {

  static propTypes = {
    notificationTypes: React.PropTypes.number
  };

  state = {
    notifications: []
  }

  constructor(props) {
    super(props);

    ToastNotificationService.monitorNotifications(
      props.notificationTypes, this.addNotification
    );
  }

  componentWillUnmount() {
    ToastNotificationService.unregisterNotifications(
      this.props.notificationTypes, this.addNotification
    );
  }

  addNotification = (notification) => {
    this.setState(
      update(this.state, {notifications: {$push: [notification]}})
    );
  }

  onDismiss = (event, i) => {
    this.setState(update(this.state, {
      notifications: {$splice: [[i, 1]]}
    }))
  };

  formatNotification(notification, i){
    let type = notification.job.status === constants.ANSIBLE_JOB_STATUS.SUCCESSFUL 
      ? 'success' : 'error';

    switch(notification.notification_type){
      case constants.NOTIFICATION_TYPES.INFRASTRUCTURE_BUILD:
        return <ToastNotification type={type} onDismiss={(e) => {this.onDismiss(e, i)}} key={i}>
          {notification.data.name + ' completed ' + (type === 'success' ? 'successfully' : 'in error.')}
        </ToastNotification>
      case constants.NOTIFICATION_TYPES.INFRASTRUCTURE_DESTROY_BUILD:
        return <ToastNotification type={type} onDismiss={(e) => {this.onDismiss(e, i)}} key={i}>
          {notification.data.name + ' deleted ' + (type === 'success' ? 'successfully' : 'in error.')}
        </ToastNotification>
    }
  }

  render() {
    return (
      <div className='toast-notifications-list-pf'>
        {this.state.notifications.map((notification, i) => {
          return this.formatNotification(notification, i)
        })}
      </div>
    )
  }

}

export default ToastNotificationList;