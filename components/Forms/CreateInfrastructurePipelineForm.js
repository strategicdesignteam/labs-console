import React from 'react';
import cx from 'classnames';
import EmptyState from '../EmptyState/EmptyState';
import PipelineStageListView from '../ListView/PipelineStageListView';
import c from '../../pages/common.css';

class CreateInfrastructurePipelineForm extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func,
    handleChange: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    handleAddStage: React.PropTypes.func,
    handleEditStage: React.PropTypes.func,
    value: React.PropTypes.object
  };

  state = {
    newPipeline: {},
    isNew: false
  };

  componentWillMount() {
    const newPipeline = Object.assign({}, this.props.value);
    const isNew = !newPipeline.hasOwnProperty('id');
    newPipeline.promotion_process = newPipeline.promotion_process || [];

    this.setState({ newPipeline, isNew });
  }

  componentWillReceiveProps(nextProps) {
    const newPipeline = Object.assign(this.state.newPipeline, nextProps.value);
    this.setState({ newPipeline });
  }

  handleSubmit = (event) => {
    this.props.handleSubmit(event, this.state.newPipeline);
  };

  handleChange = (e, prop) => {
    this.props.handleChange(e, prop);
  };

  handleStageDelete = (e, index) => {
    e.preventDefault();
    const o = Object.assign({}, this.state.newPipeline);
    o.promotion_process.splice(index, 1);
    o.promotion_process.forEach((stage, i) => {
      stage.index = i;
    });
    this.setState({ newPipeline: o });
  };

  render() {
    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="pipelineName" className="required-pf">
            Pipeline Name
          </label>
          <input type="text"
            className="form-control"
            id="pipelineName"
            required=""
            value={this.state.newPipeline.name}
            onChange={(e) => {
              this.handleChange(e, 'name');
            }}/>
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="stagesLabel">
            <span id="stagesLabel">Pipeline Stages</span>
          </label>
          {(() => {
            if (this.state.newPipeline.promotion_process.length) {
              return [
                <div className={cx(c.float_right)}>
                  <button type="submit"
                    className="btn btn-default"
                    onClick={this.props.handleAddStage}>
                    Create
                  </button>
                </div>,
                <br/>,
                <PipelineStageListView handleStageClick={this.props.handleEditStage}
                  handleStageDelete={this.handleStageDelete}
                  infrastructurePipeline={this.state.newPipeline}/>
              ];
            }
            return (
              <EmptyState hideTitle>
                <div className="text-center">
                  <h4>No stages exist for this infrastructure pipeline.</h4>
                  <p>
                    You must have at least one stage to build your infrastructure pipeline.
                  </p>
                  <button type="submit"
                    className="btn btn-default"
                    onClick={this.props.handleAddStage}>
                    Create Stage
                  </button>
                </div>
              </EmptyState>
            );
          })()}
        </div>

        <br/>
        <div className="form-group text-center">
          <button type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
            disabled={!this.state.newPipeline.promotion_process.length}>
            Submit
          </button>
          &nbsp;&nbsp;
          <button type="submit"
            className="btn btn-default"
            onClick={this.props.handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default CreateInfrastructurePipelineForm;
