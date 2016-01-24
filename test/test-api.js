process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app/server');
var should = chai.should();

chai.use(chaiHttp);


describe('Books', function() {
    it('should list ALL books on /books GET', function(done) {
        chai.request(server)
            .get('/api/books')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should list a SINGLE book on /books/<id> GET', function(done) {
        chai.request(server)
            .get('/api/book/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should add a SINGLE book on /books POST');

    it('should update a SINGLE book on /books/<id> PUT', function(done) {
        chai.request(server)
            .post('/api/books')
            .send({'series': 'Batman', 'publisher': 'DC Comics'})
            .end(function(err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('series');
                res.body.should.have.property('publisher');
                res.body.should.have.property('_id');
                res.body.series.should.equal('Batman');
                res.body.publisher.should.equal('DC Comics');
                done();
            });
    });


    it('should delete a SINGLE book on /books/<id> DELETE');
});
