var express = require('express');
var router = express.Router();

var dataservice = require('../dataservices/book');
var Book = require('../models/book');

/* GET /books listing. */
router.get('/books/', function(request, response, next) {
  console.log('Listing all books'); //  with ' + request.params.key + '=' + request.params.value
  dataservice.list(Book, response);
});

/* GET /books/id */
router.get('/books/:id', function(request, response, next) {
  console.log(request.url + ' : querying for ' + request.params.id);
  dataservice.findById(Book, request.params.id, response);

});

/* POST /books (create or update) */
router.post('/books', function(request, response) {
  dataservice.create(Book, request.body, response);
});

/* PUT /books/id (update) */
router.put('/books/:id', function(request, response, next) {
  dataservice.update(Book, request.params.id, request.body, response);
});

/* DELETE /books/id */
router.delete('/books/:id', function(request, response, next) {
  dataservice.remove(Book, request.params.id, response);
});

module.exports = router;