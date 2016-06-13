var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config');

// Pull connection info based on which environment, very rails-like.
// mongoose.connect(config.db);
// var db = mongoose.connection;
//
// // Error Handler for Mongo Datastore
// db.on('error', function () {
//   throw new Error('unable to connect to database at ' + config.db);
// });
//
// // Connects to the Mongo Datastore
// db.once('open', function callback () {
//   console.log('Connected to MongoDB');
// });
//
// Dynamically loads all files in models directory using the filesystem to query files
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

// Load express
var app = express();

// Give express it's routes
require('./config/express')(app, config);
require('./config/routes')(app);

// Start listening
app.listen(config.port);
