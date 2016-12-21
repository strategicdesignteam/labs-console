import React, { PropTypes } from 'react';
import s from './styles.css';

class ProjectCardView extends React.Component {

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
    $(".card-pf.project-cards").click((e) => {
      //check if clicked element is the kebab
      if(!$(e.target).hasClass('fa-ellipsis-v')
        && !$(e.target).hasClass('dropdown-toggle') && !$(e.target).is('a')) {
        this.props.handleProjectEdit(e, $(e.currentTarget).attr('data-key'));
      }
    });
  }

  unbind(){
    $(".card-pf.project-cards").off('click');
  }


  render() {
    const { projects } = this.props; // eslint-disable-line no-use-before-define

    return (

      <div className="row row-cards-pf">
        {projects.map((project,i) =>
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2" key={i}>
            <div className="card-pf card-pf-accented project-cards" data-key={i}>
              <div className="card-pf-body">

                <div className="card-pf-heading-kebab">
                  <div className="dropdown pull-right dropdown-kebab-pf">
                    <button className="btn btn-link dropdown-toggle" type="button" id="dropupKebabRight2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="fa fa-ellipsis-v"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropupKebabRight2">
                      <li><a href="#" onClick={(e) => {this.props.handleProjectEdit(e, i);}}>View Project</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Delete</a></li>
                    </ul>
                  </div>
                </div>

                <h2 className="card-pf-title text-center blue-text">
                  {project.name}
                </h2>
                <div className="card-pf-top-element text-center">
                  <span className={s.red + ' pficon pficon-registry'}></span>
                </div>
                <div className="card-pf-info text-center">
                  {project.type}
                </div>
                <br/>
                <div className="card-pf-items">
                  {project.apps.map((app, j) =>
                    <div className="card-pf-item" key={j}>
                      <span className="fa fa-bolt"></span>
                      <span className={s.app_name_text + ' card-pf-item-text'}>{app.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectCardView;