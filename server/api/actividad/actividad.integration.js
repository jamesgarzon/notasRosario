'use strict';

var app = require('../..');
import request from 'supertest';

var newActividad;

describe('Actividad API:', function() {

  describe('GET /api/actividades', function() {
    var actividads;

    beforeEach(function(done) {
      request(app)
        .get('/api/actividades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          actividads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      actividads.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/actividades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/actividades')
        .send({
          name: 'New Actividad',
          info: 'This is the brand new actividad!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newActividad = res.body;
          done();
        });
    });

    it('should respond with the newly created actividad', function() {
      newActividad.name.should.equal('New Actividad');
      newActividad.info.should.equal('This is the brand new actividad!!!');
    });

  });

  describe('GET /api/actividades/:id', function() {
    var actividad;

    beforeEach(function(done) {
      request(app)
        .get('/api/actividades/' + newActividad._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          actividad = res.body;
          done();
        });
    });

    afterEach(function() {
      actividad = {};
    });

    it('should respond with the requested actividad', function() {
      actividad.name.should.equal('New Actividad');
      actividad.info.should.equal('This is the brand new actividad!!!');
    });

  });

  describe('PUT /api/actividades/:id', function() {
    var updatedActividad;

    beforeEach(function(done) {
      request(app)
        .put('/api/actividades/' + newActividad._id)
        .send({
          name: 'Updated Actividad',
          info: 'This is the updated actividad!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedActividad = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedActividad = {};
    });

    it('should respond with the updated actividad', function() {
      updatedActividad.name.should.equal('Updated Actividad');
      updatedActividad.info.should.equal('This is the updated actividad!!!');
    });

  });

  describe('DELETE /api/actividades/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/actividades/' + newActividad._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when actividad does not exist', function(done) {
      request(app)
        .delete('/api/actividades/' + newActividad._id)
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
