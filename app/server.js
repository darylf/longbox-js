// Declare dependencies
var express = require('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// Configure application
var config = require('./config');

// Load database
mongoose.connect(config.mongodb[app.settings.env]);

// Load Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define Routes
app.use('/api', require('./routes/api'));
app.use(express.static( path.resolve('public')));
app.use('/*', function(req, res){
  res.sendFile( path.resolve('public/index.html'));
});

// Run Server
var server = app.listen(3000);
console.log('API is running on port 3000');

module.exports = server