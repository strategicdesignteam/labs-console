import React from 'react';

class BuildCardView extends React.Component {
  static matchHeight() {
    // matchHeight the contents of each .card-pf and then the .card-pf itself
    $(
      ".row-cards-pf > [class*='col'] > .card-pf > .card-pf-body"
    ).matchHeight();
  }

  componentDidUpdate() {
    if (this.props.item === this.props.expandedItem) {
      BuildCardView.matchHeight();
    }
  }

  render() {
    const { build, deploying } = this.props;

    return (
      <div className="row row-cards-pf">
        {build.topology.promotion_process.map((stage, i) => (
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4"
            key={`stage-${stage.name}-${i}`}>
            <div className="card-pf card-pf-view">
              <div className="card-pf-body">
                <div className="card-pf-top-element"
                  style={{ textAlign: 'center' }}>
                  <span className="pficon pficon-cluster"
                    style={{ fontSize: '46px', height: '46px' }}/>
                </div>
                <h2 className="card-pf-title text-center">
                  {stage.name}
                </h2>
                <div className="card-pf-items text-center">
                  {deploying &&
                    <div className="progress">
                      <div className="progress-bar progress-bar-striped active"
                        role="progressbar"
                        style={{ width: '100%' }}/>
                    </div>}
                  {deploying &&
                    <p>
                      <span className="spinner spinner-xs spinner-inline"/>
                      {' '}
                      Deploying
                    </p>}
                  {!deploying &&
                    <a href={`http://${stage.projects[0].name}.apps.strategicdesign.io`}
                      target="_blank"
                      rel="noopener noreferrer">
                      {`http://${stage.projects[0].name}.apps.strategicdesign.io`}
                    </a>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default BuildCardView;
