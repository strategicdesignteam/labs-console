var BuildService = require('./controllers/BuildService');
var JobsService = require('./controllers/JobsService');
var InfrastructureService = require('./controllers/InfrastructureService');
var InfrastructurePipelineService = require('./controllers/InfrastructurePipelineService');
var ProjectTemplateService = require('./controllers/ProjectTemplateService');
var UserService = require('./controllers/UserService');
var auth = require('./auth/AuthService');

module.exports = function (app) {
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes here
  app.post('/api/login', auth.login);

  // tower jobs routes
  app.all('/api/jobs*', auth.basicAuth);
  app.post('/api/jobs/infrastructure', JobsService.addInfrastructureJob);
  app.post(
    '/api/jobs/infrastructureDestroy',
    JobsService.destroyInfrastructureJob
  );
  app.post('/api/jobs/project', JobsService.addProjectJob);
  app.post('/api/jobs/insightsRemediate', JobsService.insightsRemediateJob);
  app.get('/api/jobs/:id', JobsService.jobsIdGET);

  // builds routes
  app.all('/api/builds*', auth.basicAuth);
  app.post('/api/builds', BuildService.addBuild);
  app.get('/api/builds', BuildService.buildsGET);
  app.put('/api/builds/:id', BuildService.updateBuild);
  app.get('/api/builds/:id', BuildService.buildsIdGET);
  app.delete('/api/builds/:id', BuildService.deleteBuild);

  // users routes
  app.all('/api/users*', auth.basicAuth);
  app.post('/api/users', UserService.addUser);
  app.get('/api/users', UserService.usersGET);
  app.get('/api/users/:id', UserService.usersIdGET);
  app.put('/api/users/:id', UserService.updateUser);
  app.delete('/api/users/:id', UserService.deleteUser);

  // infrastructures routes
  app.all('/api/infrastructures*', auth.basicAuth);
  app.post('/api/infrastructures', InfrastructureService.addInfrastructure);
  app.get('/api/infrastructures', InfrastructureService.infrastructuresGET);
  app.get(
    '/api/infrastructures/:id',
    InfrastructureService.infrastructuresIdGET
  );
  app.put(
    '/api/infrastructures/:id',
    InfrastructureService.updateInfrastructure
  );
  app.delete(
    '/api/infrastructures/:id',
    InfrastructureService.deleteInfrastructure
  );

  // infrastructure pipeline routes
  app.all('/api/infrastructurePipelines*', auth.basicAuth);
  app.post(
    '/api/infrastructurePipelines',
    InfrastructurePipelineService.addInfrastructurePipeline
  );
  app.get(
    '/api/infrastructurePipelines',
    InfrastructurePipelineService.infrastructurePipelinesGET
  );
  app.get(
    '/api/infrastructurePipelines/:id',
    InfrastructurePipelineService.infrastructurePipelinesIdGET
  );
  app.put(
    '/api/infrastructurePipelines/:id',
    InfrastructurePipelineService.updateInfrastructurePipeline
  );
  app.delete(
    '/api/infrastructurePipelines/:id',
    InfrastructurePipelineService.deleteInfrastructurePipeline
  );

  // project templates routes
  app.all('/api/projectTemplates*', auth.basicAuth);
  app.post('/api/projectTemplates', ProjectTemplateService.addProjectTemplate);
  app.get('/api/projectTemplates', ProjectTemplateService.projectTemplatesGET);
  app.get(
    '/api/projectTemplates/:id',
    ProjectTemplateService.projectTemplatesIdGET
  );
  app.put(
    '/api/projectTemplates/:id',
    ProjectTemplateService.updateProjectTemplate
  );
  app.delete(
    '/api/projectTemplates/:id',
    ProjectTemplateService.deleteProjectTemplate
  );

  // frontend routes =========================================================
  // route to handle all react requests
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './public' });
  });
};
