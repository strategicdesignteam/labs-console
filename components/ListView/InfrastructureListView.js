import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import { infraImage } from '../Canvas/CanvasHelpers';
import ListExpansionView from './ListExpansionView';
import ListExpansionContainer from './ListExpansionContainer';
import constants from '../../core/constants';

class InfrastructureListView extends React.Component {
  static propTypes = {
    handleView: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    infrastructures: React.PropTypes.array
  };

  static getIcon(status) {
    switch (status) {
      case constants.ANSIBLE_JOB_STATUS.SUCCESSFUL:
        return 'pficon pficon-ok list-view-pf-icon-sm list-view-pf-icon-success';
      case constants.ANSIBLE_JOB_STATUS.FAILED:
        return 'pficon pficon-error-circle-o list-view-pf-icon-sm list-view-pf-icon-danger';
      case constants.ANSIBLE_JOB_STATUS.CANCELLED:
        return 'pficon pficon-error-circle-o list-view-pf-icon-sm list-view-pf-icon-danger';
      case constants.ANSIBLE_JOB_STATUS.RUNNING:
        return 'pficon pficon-info list-view-pf-icon-sm list-view-pf-icon-info';
      case constants.ANSIBLE_JOB_STATUS.PENDING:
        return 'pficon pficon-info list-view-pf-icon-sm list-view-pf-icon-info';
      default:
        return 'pficon pficon-info list-view-pf-icon-sm list-view-pf-icon-info';
    }
  }

  state = {
    expandedItem: -1
  };

  listItemClick = (e, i) => {
    this.setState({ expandedItem: i });
  };

  render() {
    return (
      <ListExpansionView key="list-expansion-view">
        {this.props.infrastructures.map((infrastructure, i) => (
          <div className="infra-group-item list-group-item list-view-pf-stacked list-view-pf-top-align"
            key={i}
            onClick={e => this.listItemClick(e, i)}>
            <div className="list-group-item-header">
              <div className="list-view-pf-expand">
                <span className="fa fa-angle-right"/>
              </div>
              <div className="list-view-pf-actions">
                <div className="dropdown pull-right dropdown-kebab-pf">
                  <button className="btn btn-link dropdown-toggle"
                    type="button"
                    id="dropupKebabRight2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <span className="fa fa-ellipsis-v"/>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropupKebabRight2">
                    <li>
                      <a onClick={e =>
                          this.props.handleView(e, infrastructure.id)}>
                        View
                      </a>
                    </li>
                    <li role="separator" className="divider"/>
                    <li>
                      <a onClick={e =>
                          this.props.handleDelete(e, infrastructure)}>
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="list-view-pf-main-info">
                <div className="list-view-pf-left">
                  <span className={InfrastructureListView.getIcon(
                      infrastructure.status
                    )}/>
                  <img style={{
                    height: 40,
                    marginRight: 15,
                    marginLeft: 15,
                    marginTop: -5
                  }}
                    src={infraImage(infrastructure.provider)}
                    alt="provider"/>
                </div>
                <div className="list-view-pf-body">
                  <div className="list-view-pf-description">
                    <div className="list-group-item-heading">
                      <span>{infrastructure.name}</span>
                    </div>
                    <div className="list-group-item-text">
                      {(() => {
                        const content = [];
                        if (
                          infrastructure.status ===
                            constants.ANSIBLE_JOB_STATUS.SUCCESSFUL ||
                          infrastructure.status ===
                            constants.ANSIBLE_JOB_STATUS.FAILED ||
                          infrastructure.status ===
                            constants.ANSIBLE_JOB_STATUS.CANCELLED
                        ) {
                          content.push(
                            <strong key="finished">Finished: </strong>
                          );
                          content.push(
                            moment(infrastructure.datetime_completed).fromNow()
                          );
                        }
                        else if (
                          infrastructure.status ===
                            constants.ANSIBLE_JOB_STATUS.PENDING ||
                          infrastructure.status ===
                            constants.ANSIBLE_JOB_STATUS.RUNNING
                        ) {
                          content.push(
                            <strong key="started">Started: </strong>
                          );
                          content.push(
                            moment(infrastructure.datetime_started).fromNow()
                          );
                        }
                        return content;
                      })()}
                    </div>
                  </div>
                  <div className="list-view-pf-additional-info">
                    {(infrastructure.status ===
                      constants.ANSIBLE_JOB_STATUS.PENDING ||
                      infrastructure.status ===
                        constants.ANSIBLE_JOB_STATUS.RUNNING) &&
                        <div className="list-view-pf-additional-info-item">
                          <div className="progress"
                            style={{ width: 200, margin: 'auto' }}>
                            {infrastructure.destroy_started &&
                            <div className="progress-bar progress-bar-danger progress-bar-striped active"
                              role="progressbar"
                              style={{ width: '100%' }}>
                              <span>Deleting...</span>
                            </div>}
                            {!infrastructure.destroy_started &&
                            <div className="progress-bar progress-bar-striped active"
                              role="progressbar"
                              style={{ width: '100%' }}>
                              <span>Deploying...</span>
                            </div>}

                          </div>
                        </div>}
                    {(infrastructure.status ===
                      constants.ANSIBLE_JOB_STATUS.FAILED ||
                      infrastructure.status ===
                        constants.ANSIBLE_JOB_STATUS.CANCELLED) &&
                        <div className="list-view-pf-additional-info-item">
                          <div className="progress"
                            style={{ width: 200, margin: 'auto' }}>
                            <div className="progress-bar progress-bar-danger"
                              role="progressbar"
                              style={{ width: '100%' }}>
                              <span>Error</span>
                            </div>
                          </div>
                        </div>}
                    {infrastructure.status ===
                      constants.ANSIBLE_JOB_STATUS.SUCCESSFUL &&
                      <div className="list-view-pf-additional-info-item">
                        <span className="pficon pficon-cluster"/>
                        <strong>{infrastructure.master_nodes}</strong>
                        {infrastructure.master_nodes === 1
                          ? 'master node'
                          : 'master nodes'}
                      </div>}
                    {infrastructure.status ===
                      constants.ANSIBLE_JOB_STATUS.SUCCESSFUL &&
                      <div className="list-view-pf-additional-info-item">
                        <span className="pficon pficon-container-node"/>
                        <strong>{infrastructure.compute_nodes}</strong>
                        {infrastructure.compute_nodes === 1
                          ? 'compute node'
                          : 'compute nodes'}
                      </div>}
                  </div>
                </div>
              </div>
            </div>

            <ListExpansionContainer key="list-item-container">
              <br/>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <dl className="dl-horizontal">
                    <dt>Ansible</dt>
                    <dd>
                      <a href={infrastructure.ansible_tower_link}
                        target="_blank"
                        rel="noopener noreferrer">
                        Tower Job
                      </a>
                    </dd>
                    <dt>Public Hosted Zone</dt>
                    <dd>{infrastructure.public_hosted_zone}</dd>
                  </dl>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <dl className="dl-horizontal">
                    <dt>Started</dt>
                    <dd>
                      {moment(infrastructure.datetime_started).format(
                        'MMM Do YYYY, h:mm:ss a'
                      )}
                    </dd>
                    {infrastructure.status !==
                      constants.ANSIBLE_JOB_STATUS.PENDING && <dt>Finished</dt>}
                    {infrastructure.status !==
                      constants.ANSIBLE_JOB_STATUS.PENDING &&
                      <dd>
                        {moment(infrastructure.datetime_completed).format(
                          'MMM Do YYYY, h:mm:ss a'
                        )}
                      </dd>}
                  </dl>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <dl className="dl-horizontal">
                    <dt>Status</dt>
                    <dd className={cx({
                      'text-danger': infrastructure.status ===
                          constants.ANSIBLE_JOB_STATUS.FAILED ||
                          infrastructure.status ===
                            constants.ANSIBLE_JOB_STATUS.CANCELLED,
                      'text-success': infrastructure.status ===
                          constants.ANSIBLE_JOB_STATUS.SUCCESSFUL
                    })}>
                      {infrastructure.status}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <dl className="dl-horizontal">
                    <dt>PaaS</dt>
                    <dd>
                      <img src="/img/OpenShift-logo.svg"
                        style={{ height: 100 }}
                        alt="openshift"/>
                    </dd>
                  </dl>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <dl className="dl-horizontal">
                    <dt>Provider Platform</dt>
                    <dd>{infrastructure.provider}</dd>
                    {infrastructure.provider ===
                      constants.INFRASTRUCTURE_TYPES.AWS.KEY && <dt>Region</dt>}
                    {infrastructure.provider ===
                      constants.INFRASTRUCTURE_TYPES.AWS.KEY &&
                      <dd>{infrastructure.aws_region}</dd>}
                  </dl>
                </div>
              </div>

            </ListExpansionContainer>
          </div>
        ))}
      </ListExpansionView>
    );
  }
}

export default InfrastructureListView;
