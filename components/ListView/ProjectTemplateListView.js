import React from 'react';
import ListGroup from './ListGroup';

class ProjectTemplateListView extends React.Component {
  static propTypes = {
    handleEdit: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    projectTemplates: React.PropTypes.array
  };

  static unbind() {
    $('.list-group-item').off('click');
  }

  componentDidMount() {
    this.bindClick();
  }

  componentDidUpdate() {
    ProjectTemplateListView.unbind();
    this.bindClick();
  }

  componentWillUnmount() {
    ProjectTemplateListView.unbind();
  }

  bindClick() {
    $('.list-group-item.app-group-item').click((e) => {
      if (!$(e.target).is('button, a, input, .fa-ellipsis-v')) {
        this.props.handleEdit(e, $(e.currentTarget).attr('data-id'));
      }
    });
  }

  render() {
    return (
      <ListGroup>
        {this.props.projectTemplates.map((projectTemplate, i) => (
          <div className="list-group-item app-group-item"
            key={i}
            data-id={projectTemplate.id}>

            <div className="list-view-pf-actions">
              <button className="btn btn-default"
                onClick={(e) => {
                  this.props.handleDelete(e, projectTemplate.id);
                }}>
                Delete
              </button>
              {/* <div className="dropdown pull-right dropdown-kebab-pf">
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
                    <a onClick={e =>
                        this.props.handleEdit(e, projectTemplate.id)}>
                      Edit
                    </a>
                  </li>
                  <li role="separator" className="divider"/>
                  <li>
                    <a onClick={e =>
                        this.props.handleDelete(e, projectTemplate.id)}>
                      Delete
                    </a>
                  </li>
                </ul>
              </div>*/}
            </div>

            <div className="list-view-pf-main-info">
              <div className="list-view-pf-body">
                <div className="list-view-pf-description">
                  <div className="list-group-item-heading blue-text">
                    {projectTemplate.display_name}
                  </div>
                  <div className="list-group-item-text">
                    {projectTemplate.name}
                  </div>
                </div>
                <div className="list-view-pf-additional-info">
                  {/* <div className="list-view-pf-additional-info-item">
                    <span className="pficon pficon-cluster"/>
                    <strong>{projectTemplate.apps.length}</strong>
                    {projectTemplate.apps.length === 1 ? 'app' : 'apps'}
                  </div>*/}
                  {projectTemplate.apps.map(app => (
                    <div className="list-view-pf-additional-info-item">
                      <img style={{
                        height: 40,
                        marginRight: 15,
                        marginLeft: 15,
                        marginTop: -5
                      }}
                        src={app.image}
                        alt={app.name}/>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        ))}
      </ListGroup>
    );
  }
}

export default ProjectTemplateListView;
