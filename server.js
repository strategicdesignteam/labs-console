//  OpenShift sample Node application
var express = require('express'),
  fs      = require('fs'),
  app     = express(),
  morgan  = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  autoIncrement = require('mongoose-auto-increment'),
  Keycloak = require('keycloak-connect'),
  session = require('express-session');
 
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

Object.assign=require('object-assign');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(keycloak.middleware());
app.use(cors());
app.use(morgan('combined'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
  mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
    mongoPassword = process.env[mongoServiceName + '_PASSWORD']
  mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}
var db = null,
  dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) {
    //this is a local as no environment vars are found, let's use this for now locally
    mongoURL = 'mongodb://localhost:27017/test';
  }

  var mongoose = require('mongoose');
  if (mongoose == null) return;

  //testing locally for now
  var connection = mongoose.connect(mongoURL, {}, (err) => {
    if (err) {
      console.log('mongoose error:');
      console.log(err);
    }
    console.log('mongoose connected at:' + mongoURL);
  });
  //autoincrementing id's instead of mongo default keys
  autoIncrement.initialize(connection);
};

initDb();


app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app, keycloak);

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

// start app ===============================================
app.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;