import React, { PropTypes } from 'react';

class StagesCardView extends React.Component {

  static propTypes = {
    handleStageEdit: React.PropTypes.func
  };

  componentDidMount() {
    //run matchHeight jquery plugin
    this.matchHeight();
    this.bindClick();
  }

  componentDidUpdate() {
    this.unbind();
    this.bindClick();
  }

  componentWillUnmount(){
    this.unbind();
  }

  matchHeight(){
    // matchHeight the contents of each .card-pf and then the .card-pf itself
    $(".row-cards-pf > [class*='col'] > .card-pf > .card-pf-body").matchHeight();
  }

  bindClick(){
    $(".card-pf.stage-cards").click((e) => {
      //check if clicked element is the kebab
      if(!$(e.target).hasClass('fa-ellipsis-v')
        && !$(e.target).hasClass('dropdown-toggle') && !$(e.target).is('a')) {
        this.props.handleStageEdit(e, $(e.currentTarget).attr('data-key'));
      }
    });
  }

  unbind(){
    $(".card-pf.stage-cards").off('click');
  }


  render() {
    return (
      <div className="row row-cards-pf">
        {this.props.stages.map((stage,i) =>
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2" key={i}>
            <div className="card-pf card-pf-accented card-pf-view-xs stage-cards" data-key={i}>
              <div className="card-pf-body">
                
                <div className="card-pf-heading-kebab">
                  <div className="dropdown pull-right dropdown-kebab-pf">
                    <button className="btn btn-link dropdown-toggle" type="button" id="dropupKebabRight2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="fa fa-ellipsis-v"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropupKebabRight2">
                      <li><a href="#" onClick={(e) => {this.props.handleStageEdit(e, i);}}>View Stage</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#" onClick={(e) => {this.props.handleStageDelete(e, i);}}>Delete</a></li>
                    </ul>
                  </div>

                  <h2 className="card-pf-title text-center blue-text">
                     { stage.name }
                  </h2>

                  <ul className="list-unstyled">
                    <li><span className="pficon pficon-users"></span>  &nbsp; {stage.project_role_bindings.length }
                      &nbsp; { stage.project_role_bindings.length == 1 ? 'user' : 'users' }
                    </li>
                    <li><span className="fa fa-bullhorn"></span>  &nbsp; {stage.application_promoters.length }
                      &nbsp; { stage.application_promoters.length == 1 ? 'promoter' : 'promoters' }
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default StagesCardView;