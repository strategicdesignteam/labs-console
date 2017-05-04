import React, { PropTypes } from 'react';
import BuildCardView from '../CardView/BuildCardView';
import ListExpansionView from './ListExpansionView';
import ListExpansionContainer from './ListExpansionContainer';
import constants from '../../core/constants';
import moment from 'moment';
import cx from 'classnames';

class BuildListView extends React.Component {

  static propTypes = {
    handleBuild: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    builds: React.PropTypes.array
  };

  state = {
    expandedItem: -1
  }

  getIcon(status){
    switch(status){
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

  handleBuild = (e, build) => {
    this.props.handleBuild(e, build);
  };

  handleDelete = (e, build) => {
    this.props.handleDelete(e, build);
  };

  listItemClick = (e, i) => {
    this.setState({expandedItem: i})
  }

  render() {
    return (
      <ListExpansionView key="list-expansion-view">
        {this.props.builds.map((build,i) =>
        <div className="list-group-item list-view-pf-stacked list-view-pf-top-align" key={i} onClick={(e) => this.listItemClick(e, i)}>
          <div className="list-group-item-header">
            <div className="list-view-pf-expand">
              <span className="fa fa-angle-right"></span>
          </div>
          <div className="list-view-pf-actions">
            <div className="dropdown pull-right dropdown-kebab-pf">
              <button className="btn btn-link dropdown-toggle" type="button" id="dropupKebabRight2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="fa fa-ellipsis-v"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropupKebabRight2">
                <li><a href="#">View Logs</a></li>
                <li role="separator" className="divider"></li>
                <li><a onClick={ (e) => this.handleDelete(e, build.id)}>Delete</a></li>
              </ul>
            </div>
            <button className="btn btn-default"
                    onClick={ (e) => this.handleBuild(e, build) }>Rebuild</button>
          </div>
          <div className="list-view-pf-main-info">
            <div className="list-view-pf-left">
              <span className={ this.getIcon(build.status)}></span>
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">
                  { build.topology.name }
                </div>
                <div className="list-group-item-text">
                  {(() => {
                    let content = [];
                    if(build.status === constants.ANSIBLE_JOB_STATUS.SUCCESSFUL 
                      || build.status === constants.ANSIBLE_JOB_STATUS.FAILED 
                      || build.status === constants.ANSIBLE_JOB_STATUS.CANCELLED){
                      content.push(<strong key="finished">Finished: </strong>);
                      content.push(moment(build.datetime_completed).fromNow());
                    }
                    else if (build.status === constants.ANSIBLE_JOB_STATUS.PENDING 
                      || build.status === constants.ANSIBLE_JOB_STATUS.RUNNING){
                      content.push(<strong key="started">Started: </strong>);
                      content.push(moment(build.datetime_started).fromNow());
                    }
                    return content;
                  })()}
                </div>
              </div>
              <div className="list-view-pf-additional-info">
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-screen"></span>
                  <strong>{ build.number_of_projects }</strong>
                    { build.number_of_projects == 1 ? 'Project' : 'Projects' }
                </div>
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-cluster"></span>
                  <strong>{ build.number_of_stages }</strong>
                  { build.number_of_stages == 1 ? 'Stage' : 'Stages' }
                </div>
                <div className="list-view-pf-additional-info-item">
                  <span className="fa fa-code-fork"></span>
                  Version &nbsp; 
                  <strong>{build.topology_version}</strong>
                </div>                
              </div>
            </div>
          </div>
        </div>

        <ListExpansionContainer key="list-item-container">
          <br/>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dl className="dl-horizontal">
                <dt>Description</dt>
                <dd>{ build.topology.description }</dd>
                <dt>Ansible</dt>
                <dd><a href={ build.ansible_tower_link } target="_blank">Tower Job</a></dd>            
              </dl>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dl className="dl-horizontal">
                <dt>Started</dt>
                <dd>{ moment(build.datetime_started).format('MMM Do YYYY, h:mm:ss a') }</dd>
                {build.status !== constants.ANSIBLE_JOB_STATUS.PENDING &&
                <dt>Finished</dt>
                }
                {build.status !== constants.ANSIBLE_JOB_STATUS.PENDING &&
                <dd>{ moment(build.datetime_completed).format('MMM Do YYYY, h:mm:ss a') }</dd>
                }
              </dl>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dl className="dl-horizontal">
                <dt>Status</dt>
                <dd className={cx({
                    'text-danger': build.status === constants.ANSIBLE_JOB_STATUS.FAILED 
                      || build.status === constants.ANSIBLE_JOB_STATUS.CANCELLED, 
                    'text-success': build.status === constants.ANSIBLE_JOB_STATUS.SUCCESSFUL
                  })}>{build.status}</dd>                  
              </dl>
            </div>
          </div>
          <BuildCardView build={build} 
            deploying={build.status === constants.ANSIBLE_JOB_STATUS.PENDING} 
            key={i} 
            item={i} 
            expandedItem={this.state.expandedItem}/>
        </ListExpansionContainer>
      </div>
      )}
    </ListExpansionView>
    )
  }
}

export default BuildListView;
