var BuildService = require('./controllers/BuildService');
var TopologyService = require('./controllers/TopologyService');
var UserService = require('./controllers/UserService');

module.exports = function(app, keycloak) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes here
  app.get('/login', function(req, res) {
    res.sendFile('login.html', {root: './public'});
  });
  app.use( keycloak.middleware( { logout: '/logout' } ));

  //builds routes
  app.post('/api/builds', keycloak.protect(), BuildService.addBuild);
  app.get('/api/builds', keycloak.protect(), BuildService.buildsGET);
  app.get('/api/builds/:id', keycloak.protect(), BuildService.buildsIdGET);

  //users routes
  app.post('/api/users', keycloak.protect(), UserService.addUser);
  app.get('/api/users', keycloak.protect(), UserService.usersGET);
  app.get('/api/users/:id', keycloak.protect(), UserService.usersIdGET);
  app.put('/api/users/:id', keycloak.protect(), UserService.updateUser);
  app.delete('/api/users/:id', keycloak.protect(), UserService.deleteUser);

  //topologies routes
  app.post('/api/topologies', keycloak.protect(), TopologyService.addTopology);
  app.get('/api/topologies', keycloak.protect(), TopologyService.topologiesGET);
  app.get('/api/topologies/:id', keycloak.protect(), TopologyService.topologiesIdGET);
  app.put('/api/topologies/:id', keycloak.protect(), TopologyService.updateTopology);
  app.delete('/api/topologies/:id', keycloak.protect(), TopologyService.deleteTopology);


  // frontend routes =========================================================
  // route to handle all react requests
  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: './public'});
  });

};