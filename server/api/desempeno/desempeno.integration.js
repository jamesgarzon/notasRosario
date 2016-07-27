'use strict';

var app = require('../..');
import request from 'supertest';

var newDesempeno;

describe('Desempeno API:', function() {

  describe('GET /api/desempenos', function() {
    var desempenos;

    beforeEach(function(done) {
      request(app)
        .get('/api/desempenos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          desempenos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      desempenos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/desempenos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/desempenos')
        .send({
          name: 'New Desempeno',
          info: 'This is the brand new desempeno!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDesempeno = res.body;
          done();
        });
    });

    it('should respond with the newly created desempeno', function() {
      newDesempeno.name.should.equal('New Desempeno');
      newDesempeno.info.should.equal('This is the brand new desempeno!!!');
    });

  });

  describe('GET /api/desempenos/:id', function() {
    var desempeno;

    beforeEach(function(done) {
      request(app)
        .get('/api/desempenos/' + newDesempeno._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          desempeno = res.body;
          done();
        });
    });

    afterEach(function() {
      desempeno = {};
    });

    it('should respond with the requested desempeno', function() {
      desempeno.name.should.equal('New Desempeno');
      desempeno.info.should.equal('This is the brand new desempeno!!!');
    });

  });

  describe('PUT /api/desempenos/:id', function() {
    var updatedDesempeno;

    beforeEach(function(done) {
      request(app)
        .put('/api/desempenos/' + newDesempeno._id)
        .send({
          name: 'Updated Desempeno',
          info: 'This is the updated desempeno!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDesempeno = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDesempeno = {};
    });

    it('should respond with the updated desempeno', function() {
      updatedDesempeno.name.should.equal('Updated Desempeno');
      updatedDesempeno.info.should.equal('This is the updated desempeno!!!');
    });

  });

  describe('DELETE /api/desempenos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/desempenos/' + newDesempeno._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when desempeno does not exist', function(done) {
      request(app)
        .delete('/api/desempenos/' + newDesempeno._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
