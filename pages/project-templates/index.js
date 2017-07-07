import React from 'react';
import Layout from '../../components/Layout';
import ProjectTemplateListView
  from '../../components/ListView/ProjectTemplateListView';
import labsApi from '../../data/index';
import history from '../../core/history';
import constants from '../../core/constants';
import c from '../common.css';

class ProjectTemplatesPage extends React.Component {
  state = { projectTemplates: [] };

  componentWillMount() {
    this.getProjectTemplates();
  }

  componentDidMount() {
    document.title = constants.app_title;
    document.body.style.backgroundColor = constants.bg_white;
  }

  componentWillUnmount() {}

  getProjectTemplates = () => {
    const projectTemplatesApi = new labsApi.ProjectTemplateApi();
    projectTemplatesApi.projectTemplateGet((error, projectTemplates) => {
      this.setState({ projectTemplates });
    });
  };

  handleCreate = (event) => {
    event.preventDefault();
    history.push('/project-templates/create');
  };

  handleEditTemplate = (e, id) => {
    e.preventDefault();
    history.push(`/project-templates/${id}`);
  };

  handleDeleteTemplate = (e, id) => {
    const projectTemplatesApi = new labsApi.ProjectTemplateApi();
    projectTemplatesApi.deleteProjectTemplate(id, () => {
      this.getProjectTemplates();
    });
  };

  render() {
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical" nav>

        {(() => {
          const content = [];
          content.push(
            <div className="page-header" key="project-templates-page-header">
              <h2>
                Project Templates
                <div className={c.float_right}>
                  <button type="submit"
                    className="btn btn-primary"
                    onClick={this.handleCreate}>
                    Create
                  </button>
                </div>
              </h2>
            </div>
          );

          if (this.state.projectTemplates.length) {
            content.push(
              <ProjectTemplateListView projectTemplates={this.state.projectTemplates}
                handleEdit={this.handleEditTemplate}
                handleDelete={this.handleDeleteTemplate}
                key="project-tempates-list-view"/>
            );
          }
          else {
            content.push(
              <h4 key="project-templates-no-templates">
                No current project templates.
              </h4>
            );
            content.push(
              <p key="project-templates-no-templates-message">
                Create a project template to begin.
              </p>
            );
          }

          return content;
        })()}

      </Layout>
    );
  }
}

export default ProjectTemplatesPage;
