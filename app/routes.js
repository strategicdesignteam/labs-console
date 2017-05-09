var BuildService = require('./controllers/BuildService');
var JobsService = require('./controllers/JobsService');
var TopologyService = require('./controllers/TopologyService');
var InfrastructureService = require('./controllers/InfrastructureService');
var UserService = require('./controllers/UserService');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes here

  //tower jobs routes
  app.post('/api/jobs/infrastructure', JobsService.addInfrastructureJob);
  app.post('/api/jobs/infrastructureDestroy', JobsService.destroyInfrastructureJob);
  app.post('/api/jobs/project', JobsService.addProjectJob);
  app.get('/api/jobs/:id', JobsService.jobsIdGET);

  //builds routes
  app.post('/api/builds', BuildService.addBuild);
  app.get('/api/builds', BuildService.buildsGET);
  app.put('/api/builds/:id', BuildService.updateBuild);
  app.get('/api/builds/:id', BuildService.buildsIdGET);
  app.delete('/api/builds/:id', BuildService.deleteBuild);

  app.get('/api/downloadEngagement/:id', BuildService.downloadEngagement);

  //users routes
  app.post('/api/users', UserService.addUser);
  app.get('/api/users', UserService.usersGET);
  app.get('/api/users/:id', UserService.usersIdGET);
  app.put('/api/users/:id', UserService.updateUser);
  app.delete('/api/users/:id', UserService.deleteUser);

  //infrastructures routes
  app.post('/api/infrastructures', InfrastructureService.addInfrastructure);
  app.get('/api/infrastructures', InfrastructureService.infrastructuresGET);
  app.get('/api/infrastructures/:id', InfrastructureService.infrastructuresIdGET);
  app.put('/api/infrastructures/:id', InfrastructureService.updateInfrastructure);
  app.delete('/api/infrastructures/:id', InfrastructureService.deleteInfrastructure);

  //topologies routes
  app.post('/api/topologies', TopologyService.addTopology);
  app.get('/api/topologies', TopologyService.topologiesGET);
  app.get('/api/topologies/:id', TopologyService.topologiesIdGET);
  app.put('/api/topologies/:id', TopologyService.updateTopology);
  app.delete('/api/topologies/:id', TopologyService.deleteTopology);

  // frontend routes =========================================================
  // route to handle all react requests
  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: './public'});
  });

};