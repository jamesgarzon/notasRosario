'use strict';

var app = require('../..');
import request from 'supertest';

var newPeriodo;

describe('Periodo API:', function() {

  describe('GET /api/periodos', function() {
    var periodos;

    beforeEach(function(done) {
      request(app)
        .get('/api/periodos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          periodos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      periodos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/periodos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/periodos')
        .send({
          name: 'New Periodo',
          info: 'This is the brand new periodo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPeriodo = res.body;
          done();
        });
    });

    it('should respond with the newly created periodo', function() {
      newPeriodo.name.should.equal('New Periodo');
      newPeriodo.info.should.equal('This is the brand new periodo!!!');
    });

  });

  describe('GET /api/periodos/:id', function() {
    var periodo;

    beforeEach(function(done) {
      request(app)
        .get('/api/periodos/' + newPeriodo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          periodo = res.body;
          done();
        });
    });

    afterEach(function() {
      periodo = {};
    });

    it('should respond with the requested periodo', function() {
      periodo.name.should.equal('New Periodo');
      periodo.info.should.equal('This is the brand new periodo!!!');
    });

  });

  describe('PUT /api/periodos/:id', function() {
    var updatedPeriodo;

    beforeEach(function(done) {
      request(app)
        .put('/api/periodos/' + newPeriodo._id)
        .send({
          name: 'Updated Periodo',
          info: 'This is the updated periodo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPeriodo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPeriodo = {};
    });

    it('should respond with the updated periodo', function() {
      updatedPeriodo.name.should.equal('Updated Periodo');
      updatedPeriodo.info.should.equal('This is the updated periodo!!!');
    });

  });

  describe('DELETE /api/periodos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/periodos/' + newPeriodo._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when periodo does not exist', function(done) {
      request(app)
        .delete('/api/periodos/' + newPeriodo._id)
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
