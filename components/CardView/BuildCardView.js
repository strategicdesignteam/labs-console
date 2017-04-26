import React, { PropTypes } from 'react';
import s from './styles.css';

class BuildCardView extends React.Component {
  
  matchHeight(){
    // matchHeight the contents of each .card-pf and then the .card-pf itself
    $(".row-cards-pf > [class*='col'] > .card-pf > .card-pf-body").matchHeight();
  }

  componentDidUpdate() {
    if(this.props.item === this.props.expandedItem){
      this.matchHeight();
    }
  }

  render() {
    const { build, deploying } = this.props;

    return (
      <div className="row row-cards-pf">
        { build.topology.promotion_process.map((stage, i) => {
          return <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={'stage-' + stage.name + 'i'}>
            <div className="card-pf card-pf-view">
              <div className="card-pf-body">
                <div className="card-pf-top-element" style={{textAlign: 'center'}}>
                  <span className="pficon pficon-cluster" style={{fontSize: '46px', height: '46px'}}></span>
                </div>
                <h2 className="card-pf-title text-center">
                  {stage.name}
                </h2>
                <div className="card-pf-items text-center">
                  {deploying &&
                  <div className="progress">
                      <div className="progress-bar progress-bar-striped active" role="progressbar" style={{width:'100%'}}></div>
                  </div>
                  }    
                  {
                    deploying &&
                    <p><span className="spinner spinner-xs spinner-inline"></span> Deploying</p>
                  }
                  {
                    !deploying && i === 0 &&
                    <a href="https://labs-console.dev.apps.c2.core.rht-labs.com">https://labs-console.dev.apps.c2.core.rht-labs.com</a>
                  }
                  {
                    !deploying && i === 1 &&
                    <a href="https://labs-console.uat.apps.c2.core.rht-labs.com">https://labs-console.uat.apps.c2.core.rht-labs.com</a>
                  }
                  {
                    !deploying && i === 2 &&
                    <a href="https://labs-console.apps.c2.core.rht-labs.com">https://labs-console.apps.c2.core.rht-labs.com</a>
                  }
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    );
  }
}

export default BuildCardView;