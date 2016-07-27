'use strict';

var app = require('../..');
import request from 'supertest';

var newRegistro;

describe('Registro API:', function() {

  describe('GET /api/registros', function() {
    var registros;

    beforeEach(function(done) {
      request(app)
        .get('/api/registros')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          registros = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      registros.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/registros', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/registros')
        .send({
          name: 'New Registro',
          info: 'This is the brand new registro!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRegistro = res.body;
          done();
        });
    });

    it('should respond with the newly created registro', function() {
      newRegistro.name.should.equal('New Registro');
      newRegistro.info.should.equal('This is the brand new registro!!!');
    });

  });

  describe('GET /api/registros/:id', function() {
    var registro;

    beforeEach(function(done) {
      request(app)
        .get('/api/registros/' + newRegistro._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          registro = res.body;
          done();
        });
    });

    afterEach(function() {
      registro = {};
    });

    it('should respond with the requested registro', function() {
      registro.name.should.equal('New Registro');
      registro.info.should.equal('This is the brand new registro!!!');
    });

  });

  describe('PUT /api/registros/:id', function() {
    var updatedRegistro;

    beforeEach(function(done) {
      request(app)
        .put('/api/registros/' + newRegistro._id)
        .send({
          name: 'Updated Registro',
          info: 'This is the updated registro!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRegistro = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRegistro = {};
    });

    it('should respond with the updated registro', function() {
      updatedRegistro.name.should.equal('Updated Registro');
      updatedRegistro.info.should.equal('This is the updated registro!!!');
    });

  });

  describe('DELETE /api/registros/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/registros/' + newRegistro._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when registro does not exist', function(done) {
      request(app)
        .delete('/api/registros/' + newRegistro._id)
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
