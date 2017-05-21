import React from 'react';
import moment from 'moment';
import update from 'immutability-helper';
import { deepClone } from '../../core/helpers';
import ListView from './ListView';
import ListViewItem from './ListViewItem';
import ListViewItemContainer from './ListViewItemContainer';
import ListViewItemExpansion from './ListViewItemExpansion';
import BuildCardView from '../CardView/BuildCardView';
import constants from '../../core/constants';

class BuildListView extends React.Component {
  static propTypes = {
    handleBuild: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    builds: React.PropTypes.array
  };

  static getIcon(status) {
    switch (status) {
      case constants.ANSIBLE_JOB_STATUS.SUCCESSFUL:
        return 'pficon pficon-ok list-pf-icon-sm list-pf-icon-success';
      case constants.ANSIBLE_JOB_STATUS.FAILED:
        return 'pficon pficon-error-circle-o list-pf-icon-sm list-pf-icon-danger';
      case constants.ANSIBLE_JOB_STATUS.CANCELLED:
        return 'pficon pficon-error-circle-o list-pf-icon-sm list-pf-icon-danger';
      case constants.ANSIBLE_JOB_STATUS.RUNNING:
        return 'pficon pficon-info list-pf-icon-sm list-pf-icon-info';
      case constants.ANSIBLE_JOB_STATUS.PENDING:
        return 'pficon pficon-info list-pf-icon-sm list-pf-icon-info';
      default:
        return 'pficon pficon-info list-pf-icon-sm list-pf-icon-info';
    }
  }

  state = {
    expandedItem: -1,
    items: [
      {
        name: 'First Level',
        active: false,
        children: [
          {
            name: 'Second Level',
            active: false,
            children: [
              {
                name: 'Third Level'
              }
            ]
          }
        ]
      }
    ],
    builds: []
  };

  componentWillMount() {
    this.setState({ builds: deepClone(this.props.builds) });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ builds: deepClone(nextProps.builds) });
  }

  handleBuild = (e, build) => {
    this.props.handleBuild(e, build);
  };

  handleDelete = (e, build) => {
    this.props.handleDelete(e, build);
  };

  listItemClick = (e, i) => {
    this.setState({ expandedItem: i });
  };

  buildClicked = (e, i) => {
    this.setState(prevState =>
      update(prevState, {
        builds: {
          [i]: {
            active: {
              $set: !prevState.builds[i].active
            }
          }
        }
      })
    );
  };

  stageClicked = (e, i, j) => {
    this.setState(prevState =>
      update(prevState, {
        builds: {
          [i]: {
            topology: {
              promotion_process: {
                [j]: {
                  active: {
                    $set: !prevState.builds[i].topology.promotion_process[j]
                      .active
                  }
                }
              }
            }
          }
        }
      })
    );
  };

  render() {
    return (
      <ListView listViewClass={'list-pf list-pf-stacked'}>
        {this.state.builds.map((build, i) => (
          <ListViewItem isActive={build.active}>
            <ListViewItemContainer isExpansionItem
              isActive={build.active}
              itemClicked={(e) => {
                this.buildClicked(e, i);
              }}>

              <div className="list-pf-left">
                <span className={BuildListView.getIcon(build.status)}/>
              </div>

              <div className="list-pf-content-wrapper">
                <div className="list-pf-main-content"
                  style={{ flexBasis: '60%' }}>
                  <div className="list-pf-title">
                    {build.topology.name}
                  </div>
                  <div className="list-pf-description">
                    {(() => {
                      const content = [];
                      if (
                        build.status ===
                          constants.ANSIBLE_JOB_STATUS.SUCCESSFUL ||
                        build.status === constants.ANSIBLE_JOB_STATUS.FAILED ||
                        build.status === constants.ANSIBLE_JOB_STATUS.CANCELLED
                      ) {
                        content.push(
                          <strong key="finished">Finished: </strong>
                        );
                        content.push(
                          moment(build.datetime_completed).fromNow()
                        );
                      }
                      else if (
                        build.status === constants.ANSIBLE_JOB_STATUS.PENDING ||
                        build.status === constants.ANSIBLE_JOB_STATUS.RUNNING
                      ) {
                        content.push(<strong key="started">Started: </strong>);
                        content.push(moment(build.datetime_started).fromNow());
                      }
                      return content;
                    })()}
                  </div>
                </div>
                <div className="list-pf-additional-content">
                  <div className="list-view-pf-additional-info-item">
                    <span className="pficon pficon-cluster"/>
                    <strong>{build.number_of_stages}</strong>
                    {build.number_of_stages === 1 ? 'Stage' : 'Stages'}
                  </div>
                  <div className="list-view-pf-additional-info-item">
                    <span className="fa fa-code-fork"/>
                    Version &nbsp;
                    <strong>{build.topology_version}</strong>
                  </div>
                </div>
              </div>

              <div className="list-pf-actions">
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
                    <li><a href="#">View Logs</a></li>
                    <li role="separator" className="divider"/>
                    <li>
                      <a onClick={e => this.handleDelete(e, build.id)}>
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </ListViewItemContainer>
            {build.topology.promotion_process.map((stage, j) => (
              <ListViewItemExpansion isActive={build.active}>
                <ListViewItemContainer isExpansionItem
                  isActive={stage.active}
                  itemClicked={(e) => {
                    this.stageClicked(e, i, j);
                  }}>
                  <div className="list-pf-content-wrapper">
                    <div className="list-pf-main-content"
                      style={{ flexBasis: '50%' }}>
                      <div className="list-pf-title">{stage.name}</div>
                    </div>
                    <div className="list-pf-additional-content">
                      <div className="list-view-pf-additional-info-item">
                        <span className="pficon pficon-image"/>
                        <strong>{stage.projects.length}</strong>
                        {stage.projects.length === 1 ? 'Project' : 'Projects'}
                      </div>
                      <div className="list-view-pf-additional-info-item">
                        <span className="fa fa-user"/>
                        <strong>{stage.project_role_bindings.length}</strong>
                        {stage.project_role_bindings.length === 1
                          ? 'User'
                          : 'Users'}
                      </div>
                      <div className="list-view-pf-additional-info-item">
                        <span className="pficon pficon-key"/>
                        <strong>{stage.application_promoters.length}</strong>
                        {stage.application_promoters.length === 1
                          ? 'Promoter'
                          : 'Promoters'}
                      </div>
                    </div>
                  </div>
                </ListViewItemContainer>
                <ListViewItemExpansion isActive={stage.active}>
                  <ListViewItemContainer>
                    <BuildCardView build={build}
                      stage={stage}
                      deploying={
                        build.status === constants.ANSIBLE_JOB_STATUS.PENDING
                      }/>
                  </ListViewItemContainer>
                </ListViewItemExpansion>
              </ListViewItemExpansion>
            ))}
          </ListViewItem>
        ))}
      </ListView>
    );
  }
}

export default BuildListView;
