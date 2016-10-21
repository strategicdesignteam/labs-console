import React, { PropTypes } from 'react';
import ListView from './ListView';

class AppListView extends React.Component {

  static propTypes = {
    handleAppClick: React.PropTypes.func,
    handleDelete: React.PropTypes.func
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
    $(".list-group-item.app-group-item").click((e) => {
      //check if clicked element is not our "Build" <button>
      if(!$(e.target).is('button')) {
        this.props.handleAppClick(e, $(e.currentTarget).attr('data-id'))
      }
    });
  }

  unbind(){
    $(".list-group-item").off('click');
  }

  render(){
    return (
      <ListView>
        {this.props.apps.map((app,i) =>
          <div className="list-group-item app-group-item" key={i} data-id={i}>

            <div className="list-view-pf-actions">
              <button className="btn btn-danger" onClick={(e) => {this.props.handleDelete(e, i)}}>Delete</button>
            </div>

            <div className="list-view-pf-main-info">
              <div className="list-view-pf-left">
                <span className="fa fa-bolt list-view-pf-icon-sm"></span>
              </div>
              <div className="list-view-pf-body">
                <div className="list-view-pf-description">
                  <div className="list-group-item-heading">
                    { app.name }
                  </div>
                  <div className="list-group-item-text">
                    { app.base_image }
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

export default AppListView;
