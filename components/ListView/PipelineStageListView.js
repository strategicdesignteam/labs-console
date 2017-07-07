import React from 'react';
import ListGroup from './ListGroup';
import { infraImage } from '../Canvas/CanvasHelpers';

class PipelineStageListView extends React.Component {
  static propTypes = {
    handleStageClick: React.PropTypes.func,
    handleStageDelete: React.PropTypes.func,
    infrastructurePipeline: React.PropTypes.object
  };

  static unbind() {
    $('.list-group-item').off('click');
  }

  componentDidMount() {
    this.bindClick();
  }

  componentDidUpdate() {
    PipelineStageListView.unbind();
    this.bindClick();
  }

  componentWillUnmount() {
    PipelineStageListView.unbind();
  }

  bindClick() {
    $('.list-group-item.app-group-item').click((e) => {
      if (!$(e.target).is('button, a, input, .fa-ellipsis-v')) {
        this.props.handleStageClick(e, $(e.currentTarget).attr('data-id'));
      }
    });
  }

  render() {
    return (
      <ListGroup>
        {this.props.infrastructurePipeline.promotion_process.map((stage, i) => (
          <div className="list-group-item app-group-item" key={i} data-id={i}>

            <div className="list-view-pf-actions">
              <button className="btn btn-default"
                onClick={(e) => {
                  this.props.handleStageDelete(e, i);
                }}>
                Delete
              </button>
            </div>

            <div className="list-view-pf-main-info">
              <div className="list-view-pf-body">
                <div className="list-view-pf-description">
                  <div className="list-group-item-heading blue-text">
                    {stage.name}
                  </div>
                  <div className="list-group-item-text">
                    <img style={{
                      height: 40,
                      marginRight: 15,
                      marginLeft: 15,
                      marginTop: -5
                    }}
                      src={infraImage(stage.infrastructureProvider)}
                      alt="provider"/>
                    {stage.infrastructureName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ListGroup>
    );
  }
}

export default PipelineStageListView;
