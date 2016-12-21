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
        //return 'pficon pficon-info list-view-pf-icon-sm list-view-pf-icon-info';
        return 'pficon pficon-ok list-view-pf-icon-sm list-view-pf-icon-success';
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

  findRoute (project, stage){
    //if we find a route for this project, return the route with its {stage} value
    //otherwise don't show it
    //temporary logic until we receive these back and persist them from Engagement POST
    if(project.type === 'OpenShift' && project.apps && project.apps.length){
      for(let i=0; i < project.apps.length; i++){
        if(project.apps[i].routes){
          for(let j=0; j < project.apps[i].routes.length; j++){
            if(project.apps[i].routes[j].hostname){
              if(stage.name.toLowerCase() == 'delivery' || stage.name.toLowerCase() == 'production'){
                return project.apps[i].routes[j].hostname.replace("{stage}.", "");
              } else {
                let a = project.apps[i].routes[j].hostname.replace("{stage}", stage.name);
                return project.apps[i].routes[j].hostname.replace("{stage}", stage.name);
              }
            }
          }
        }
      }
    }
    return "";
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
            {/*<button className="btn btn-danger"
                    disabled={build.status === 'started'}
                    onClick={ (e) => this.handleDelete(e, build) }>Delete</button>
            */}
            <div className="dropdown pull-right dropdown-kebab-pf">
              <button className="btn btn-link dropdown-toggle" type="button" id="dropupKebabRight2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="fa fa-ellipsis-v"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropupKebabRight2">
                <li><a href="#">View Logs</a></li>
                <li role="separator" className="divider"></li>
                <li><a onClick={ (e) => this.handleDelete(e, build)}>Delete</a></li>
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
                    if(build.status === 'success' || build.status === 'error'){
                      content.push(<strong key="finished">Finished: </strong>);
                      content.push(moment(build.datetime_started).fromNow());
                    }
                    else if (build.status === 'started'){
                      content.push(<strong key="started">Finished: </strong>);
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
          <br/>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <dl className="dl-horizontal">
                {(() => {
                  let items = [];
                  build.topology.promotion_process.map((stage, i) => {
                    build.topology.project_templates.map((project, j) => {
                      let route = this.findRoute(project, stage);
                      if(route){
                        items.push(<dt key={'stage-dt' + i + j}>{project.name + ' ' + stage.name + ':'}</dt>);
                        items.push(<dd key={'stage-dd' + i + j}><a href={'http://' + route}> {route} </a></dd>);
                      }
                    });
                  });
                  return items;
                })()}
              </dl>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6">
              <dl className="dl-horizontal">
                <dt>Description</dt>
                <dd>{ build.topology.description }</dd>
                <dt>Version</dt>
                <dd>{ build.topology_version }</dd>
                <dt>Tower Link</dt>
                <dd><a href={ build.ansible_tower_link }>{ build.ansible_tower_link }</a></dd>
                <dt>Started</dt>
                <dd>{ moment(build.datetime_started).format('MMM Do YYYY, h:mm:ss a') }</dd>
                <dt>Finished</dt>
                <dd>{ moment(build.datetime_started).format('MMM Do YYYY, h:mm:ss a') }</dd>
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
