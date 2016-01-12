exports.remove = function (model, bookId, response)
{
  console.log('Deleting book with id: ' + bookId);
  model.findOne({_id: bookId}, function(error, data) {
    if (error) {
      console.log(error);
      if (response != null) {
        response.writeHead(500, {'Content-Type' : 'text/plain'});
        response.end('Internal server error');
      }
      return;
    } else {
      if (!data) {
        console.log('not found');
        if (response != null) {
          response.writeHead(404, {'Content-Type' : 'text/plain'});
          response.end('Not Found');
        }
        return;
      } else {
        data.remove(function(error){
          if (!error) {
            data.remove();
          } else {
            console.log(error);
          }
        });
        if (response != null){
          response.send('Deleted');
        }
        return;
      }
    }
  });
}

exports.update = function (model, bookId, requestBody, response) {
  model.findOne({_id: bookId}, function(error, data) {
    if (error) {
      console.log(error);
      if (response != null) {
        response.writeHead(500, {'Content-Type' : 'text/plain'});
        response.end('Internal server error');
      }
      return;
    } else {
      var book = toBook(requestBody, model);
      if (!data) {
        console.log('Book with id: '+ bookId + ' does not exist.');
        return;
      }

      //poulate the document with the updated values
      data.id = bookId;
      data.issue = requestBody.issue;
      data.description = requestBody.description;
      data.series = requestBody.series;
      data.publisher = requestBody.publisher;
      data.dateOnSale = requestBody.dateOnSale;
      data.writers = requestBody.writers;
      data.artists = requestBody.artists;
      data.coverArtists = requestBody.coverArtists;
      data.updatedAt = new Date();

      // now save
      data.save(function (error) {
        if (!error) {
          console.log('Successfully updated book with id: '+ bookId);
          data.save();
        } else {
          console.log('error on save');
        }
      });
      if (response != null) {
        response.send('Updated');
      }
    }
  });
};

exports.create = function (model, requestBody, response) {
  var book = toBook(requestBody, model);
  var bookId = requestBody.id;
  book.save(function(error) {
    if (!error) {
      book.save();
    } else {
      console.log('Checking if book saving failed due to already existing primary number:' + primarynumber);
      model.findOne({_id: bookId}, function(error, data) {
        if (error) {
          console.log(error);
          if (response != null) {
            response.writeHead(500, {'Content-Type' : 'text/plain'}); 
            response.end('Internal server error');
          }
          return;
        } else {
          var book = toBook(requestBody, model);
          if (!data) {
            console.log('The book does not exist. It will be created');

            book.createdAt = new Date();
            book.updatedAt = new Date();
            
            book.save(function(error) {
              if (!error) {
                book.save();
              } else {
                console.log(error);
              }
            });

            if (response != null) {
              response.writeHead(201, {'Content-Type' : 'text/plain'});
              response.end('Created');
            }
            return;
          } else {  
            console.log('Updating book with id:' + bookId);
            data.id = book.id
            data.issue = body.issue;
            data.description = body.description;
            data.series = body.series;
            data.publisher = body.publisher;
            data.dateOnSale = body.dateOnSale;
            data.writers = body.writers;
            data.artists = body.artists;
            data.coverArtists = body.coverArtists;
            data.coverImageUrl = body.coverImageUrl;
            data.updatedAt = new Date();

            data.save(function (error) {
              if (!error) {
                data.save();
                response.end('Updated');
                console.log('Successfully Updated book with id: ' + bookId);
              } else {
                console.log('Error while saving book with id:' + bookId);
                console.log(error);
              }
            });
          }
        }
      });
    }
  });
};

exports.findById = function (model, bookId, response) {
  model.findOne({_id: bookId}, function(error, result) {
    if (error) {
      console.error(error);
      response.writeHead(500, {'Content-Type' : 'text/plain'});
      response.end('Internal server error');
      return;
    } else {
      if (!result) {
        if (response != null) {
          response.writeHead(404, {'Content-Type' : 'text/plain'});
          response.end('Not Found');
        }
        return;
      }
      if (response != null){
        response.setHeader('Content-Type', 'application/json');
        response.send(result);
      }
      console.log(result);
    }
  });
}

exports.list = function (model, response) {
  model.find({}, function(error, result) {
    if (error) {
      console.error(error);
      return null;
    }
    if (response != null) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    }
    return JSON.stringify(result);
  });
}

function toBook(body, Book) {
  return new Book(
  {
    issue: body.issue,
    description: body.description,
    series: body.series,
    publisher: body.publisher,
    dateOnSale: body.dateOnSale,
    writers: body.writers,
    artists: body.artists,
    coverArtists: body.coverArtists,
    coverImageUrl: body.coverImageUrl,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt
  });
}