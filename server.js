// Declare dependencies
var express = require('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');

// Configure database
mongoose.connect("mongodb://localhost:27017/longbox_dev");

// Configure Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define Routes
app.use('/api', require('./app/routes/api'));

// Run Server
app.listen(3000);
console.log('API is running on port 3000');