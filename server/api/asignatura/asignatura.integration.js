'use strict';

var app = require('../..');
import request from 'supertest';

var newAsignatura;

describe('Asignatura API:', function() {

  describe('GET /api/asignaturas', function() {
    var asignaturas;

    beforeEach(function(done) {
      request(app)
        .get('/api/asignaturas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          asignaturas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      asignaturas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/asignaturas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/asignaturas')
        .send({
          name: 'New Asignatura',
          info: 'This is the brand new asignatura!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAsignatura = res.body;
          done();
        });
    });

    it('should respond with the newly created asignatura', function() {
      newAsignatura.name.should.equal('New Asignatura');
      newAsignatura.info.should.equal('This is the brand new asignatura!!!');
    });

  });

  describe('GET /api/asignaturas/:id', function() {
    var asignatura;

    beforeEach(function(done) {
      request(app)
        .get('/api/asignaturas/' + newAsignatura._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          asignatura = res.body;
          done();
        });
    });

    afterEach(function() {
      asignatura = {};
    });

    it('should respond with the requested asignatura', function() {
      asignatura.name.should.equal('New Asignatura');
      asignatura.info.should.equal('This is the brand new asignatura!!!');
    });

  });

  describe('PUT /api/asignaturas/:id', function() {
    var updatedAsignatura;

    beforeEach(function(done) {
      request(app)
        .put('/api/asignaturas/' + newAsignatura._id)
        .send({
          name: 'Updated Asignatura',
          info: 'This is the updated asignatura!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAsignatura = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAsignatura = {};
    });

    it('should respond with the updated asignatura', function() {
      updatedAsignatura.name.should.equal('Updated Asignatura');
      updatedAsignatura.info.should.equal('This is the updated asignatura!!!');
    });

  });

  describe('DELETE /api/asignaturas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/asignaturas/' + newAsignatura._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when asignatura does not exist', function(done) {
      request(app)
        .delete('/api/asignaturas/' + newAsignatura._id)
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
