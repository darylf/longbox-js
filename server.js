// Initialize environment
var express = require('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

// Load configuration settings
try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var config = JSON.parse(configJSON.toString());
} catch(e) {
    console.error("File config.json not found or is invalid: " + e.message);
    process.exit(1);
}

var port = config.port || 3000;

// Load app modules
var routes = require('./app/routes');
var bookRoutes = require('./app/routes/books');
app.use('/', routes);
app.use('/api', bookRoutes);

// Connect to the database
mongoose.connect (config.mongo);

// Run Server
var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('Server listening at http://%s:%s\n', host, port);
});
