// Dependencies
var express = require('express');
var router = express.Router();

// Model
var Book = require('../models/book');

// Routes
Book.methods(['get', 'put', 'post', 'delete']);
Book.register(router, '/books');

// Return router
module.exports = router;