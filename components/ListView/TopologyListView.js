import React, { PropTypes } from 'react';
import ListView from './ListView';

class TopologyListView extends React.Component {

  static propTypes = {
    handleTopologyClick: React.PropTypes.func,
    handleDeleteTopology: React.PropTypes.func
  };
  
  componentDidMount() {
    this.bindClick();
  }

  componentDidUpdate() {
    this.unbind();
    this.bindClick();
  }

  componentWillUnmount(){
    this.unbind();
  }

  bindClick(){
    $(".list-group-item.topology-group-item").click((e) => {
      //check if clicked element is not our "Build" <button>
      if(!$(e.target).is('button')) {
        this.props.handleTopologyClick(e, $(e.currentTarget).attr('data-id'))
      }
    });
  }

  unbind(){
    $(".list-group-item").off('click');
  }

  render(){
    return (
      <ListView>
        {this.props.topologies.map((topology,i) =>
          <div className="list-group-item topology-group-item" key={i} data-id={topology.id}>

            <div className="list-view-pf-actions">
              {/*<button className="btn btn-danger" disabled={!topology.isBuildable}>Build</button>*/}
              <button className="btn btn-default" onClick={(e) => {this.props.handleDeleteTopology(e, topology.id)}}>Delete</button>
            </div>

            <div className="list-view-pf-main-info">
              <div className="list-view-pf-body">
                <div className="list-view-pf-description">
                  <div className="list-group-item-heading blue-text">
                    { topology.name }
                  </div>
                  <div className="list-group-item-text">
                    { topology.description }
                  </div>
                </div>
                <div className="list-view-pf-additional-info">
                  <div className="list-view-pf-additional-info-item">
                    <span className="pficon pficon-screen"></span>
                    <strong>{ topology.project_templates.length }</strong> Projects
                  </div>
                  <div className="list-view-pf-additional-info-item">
                    <span className="pficon pficon-cluster"></span>
                    <strong> { topology.promotion_process.length }</strong> Stages
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ListView>
    )
  }
}

export default TopologyListView;
