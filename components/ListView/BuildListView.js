import React, { PropTypes } from 'react';
import ListExpansionView from './ListExpansionView';
import ListExpansionContainer from './ListExpansionContainer';
import moment from 'moment';

class BuildListView extends React.Component {

  static propTypes = {
    handleBuild: React.PropTypes.func,
    handleDelete: React.PropTypes.func
  };

  getIcon(status){
    switch(status){
      case 'success':
        return 'pficon pficon-ok list-view-pf-icon-sm list-view-pf-icon-success';
      case 'error':
        return 'pficon pficon-error-circle-o list-view-pf-icon-sm list-view-pf-icon-danger';
      case 'started':
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

  render() {
    return (
      <ListExpansionView key="list-expansion-view">
        {this.props.builds.map((build,i) =>
        <div className="list-group-item list-view-pf-stacked list-view-pf-top-align" key={i}>
          <div className="list-group-item-header">
            <div className="list-view-pf-expand">
              <span className="fa fa-angle-right"></span>
          </div>
          <div className="list-view-pf-actions">
            <button className="btn btn-danger"
                    disabled={build.status === 'started'}
                    onClick={ (e) => this.handleDelete(e, build) }>Delete</button>
            <button className="btn btn-default"
                    disabled={build.status === 'started'}
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
                    if(build.status === 'success' || build.status === 'error'){
                      content.push(<strong key="finished">Finished: </strong>);
                      content.push(moment(build.datetime_started).fromNow());
                    } else if (build.status === 'started'){
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
              </div>
            </div>
          </div>
        </div>

        <ListExpansionContainer key="list-item-container">
          <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-9">
              <dl className="dl-horizontal">
                <dt>Description</dt>
                <dd>{ build.topology.description }</dd>
                <dt>Version</dt>
                <dd>{ build.topology_version }</dd>
                <dt>Started</dt>
                <dd>{ moment(build.datetime_started).format('dddd, MMMM Do YYYY, h:mm:ss a') }</dd>
                <dt>Finished</dt>
                <dd>{ moment(build.datetime_started).format('dddd, MMMM Do YYYY, h:mm:ss a') }</dd>
                <dt>Ansible Tower Link</dt>
                <dd><a href={ build.ansible_tower_link }>{ build.ansible_tower_link }</a></dd>
              </dl>
            </div>
          </div>
        </ListExpansionContainer>
      </div>
      )}
    </ListExpansionView>
    )
  }
}

export default BuildListView;
