var BuildService = require('./controllers/BuildService');
var TopologyService = require('./controllers/TopologyService');
var UserService = require('./controllers/UserService');
var ImageStreamService = require('./controllers/ImageStreamService');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes here

  //builds routes
  app.post('/builds', BuildService.addBuild);
  app.get('/builds', BuildService.buildsGET);
  app.get('/builds/:id', BuildService.buildsIdGET);

  //users routes
  app.post('/users', UserService.addUser);
  app.get('/users', UserService.usersGET);
  app.get('/users/:id', UserService.usersIdGET);
  app.put('/users/:id', UserService.updateUser);
  app.delete('/users/:id', UserService.deleteUser);

  //topologies routes
  app.post('/topologies', TopologyService.addTopology);
  app.get('/topologies', TopologyService.topologiesGET);
  app.get('/topologies/:id', TopologyService.topologiesIdGET);
  app.put('/topologies/:id', TopologyService.updateTopology);
  app.delete('/topologies/:id', TopologyService.deleteTopology);

  //imageStreams
  app.post('/imageStreams', ImageStreamService.addImageStream);
  app.get('/imageStreams', ImageStreamService.imageStreamsGET);
  app.get('/imageStreams/:id', ImageStreamService.imageStreamsIdGET);
  app.put('/imageStreams/:id', ImageStreamService.updateImageStream);
  app.delete('/imageStreams/:id', ImageStreamService.deleteImageStream);

  // frontend routes =========================================================
  // route to handle all react requests
  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

};