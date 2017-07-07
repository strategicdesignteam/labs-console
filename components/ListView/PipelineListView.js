import React from 'react';
import ListGroup from './ListGroup';

class PipelineListView extends React.Component {
  static propTypes = {
    handleClick: React.PropTypes.func,
    handleEdit: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    infrastructurePipelines: React.PropTypes.array
  };

  static unbind() {
    $('.list-group-item').off('click');
  }

  static numberOfInfras(pipeline) {
    const infras = pipeline.promotion_process.reduce((acc, curr) => {
      acc[curr.infrastructure] = curr.infrastructure;
      return acc;
    }, {});
    return Object.keys(infras).length;
  }

  componentDidMount() {
    this.bindClick();
  }

  componentDidUpdate() {
    PipelineListView.unbind();
    this.bindClick();
  }

  componentWillUnmount() {
    PipelineListView.unbind();
  }

  bindClick() {
    $('.list-group-item.app-group-item').click((e) => {
      if (!$(e.target).is('button, a, input, .fa-ellipsis-v')) {
        this.props.handleClick(e, $(e.currentTarget).attr('data-id'));
      }
    });
  }

  render() {
    return (
      <ListGroup>
        {this.props.infrastructurePipelines.map((pipeline, i) => (
          <div className="list-group-item app-group-item"
            key={i}
            data-id={pipeline.id}>

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
                    <a onClick={e => this.props.handleEdit(e, pipeline.id)}>
                      Edit
                    </a>
                  </li>
                  <li role="separator" className="divider"/>
                  <li>
                    <a onClick={e => this.props.handleDelete(e, pipeline.id)}>
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="list-view-pf-main-info">
              <div className="list-view-pf-left">
                <img style={{
                  height: 40,
                  marginRight: 15,
                  marginLeft: 15,
                  marginTop: -5
                }}
                  src="/img/magnet-bank-dark.svg"
                  alt="magnet-bank"/>
              </div>
              <div className="list-view-pf-body">
                <div className="list-view-pf-description">
                  <div className="list-group-item-heading blue-text">
                    {pipeline.name}
                  </div>
                </div>
                <div className="list-view-pf-additional-info">
                  <div className="list-view-pf-additional-info-item">
                    <span className="pficon pficon-cluster"/>
                    <strong>{pipeline.promotion_process.length}</strong>
                    {pipeline.promotion_process.length === 1
                      ? 'stage'
                      : 'stages'}
                  </div>
                  <div className="list-view-pf-additional-info-item">
                    <span className="pficon pficon-network"/>
                    <strong>{PipelineListView.numberOfInfras(pipeline)}</strong>
                    {PipelineListView.numberOfInfras(pipeline) === 1
                      ? 'infrastructure'
                      : 'infrastructures'}
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

export default PipelineListView;
