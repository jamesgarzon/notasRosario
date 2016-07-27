'use strict';

var app = require('../..');
import request from 'supertest';

var newGrupo;

describe('Grupo API:', function() {

  describe('GET /api/grupos', function() {
    var grupos;

    beforeEach(function(done) {
      request(app)
        .get('/api/grupos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          grupos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      grupos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/grupos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/grupos')
        .send({
          name: 'New Grupo',
          info: 'This is the brand new grupo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGrupo = res.body;
          done();
        });
    });

    it('should respond with the newly created grupo', function() {
      newGrupo.name.should.equal('New Grupo');
      newGrupo.info.should.equal('This is the brand new grupo!!!');
    });

  });

  describe('GET /api/grupos/:id', function() {
    var grupo;

    beforeEach(function(done) {
      request(app)
        .get('/api/grupos/' + newGrupo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          grupo = res.body;
          done();
        });
    });

    afterEach(function() {
      grupo = {};
    });

    it('should respond with the requested grupo', function() {
      grupo.name.should.equal('New Grupo');
      grupo.info.should.equal('This is the brand new grupo!!!');
    });

  });

  describe('PUT /api/grupos/:id', function() {
    var updatedGrupo;

    beforeEach(function(done) {
      request(app)
        .put('/api/grupos/' + newGrupo._id)
        .send({
          name: 'Updated Grupo',
          info: 'This is the updated grupo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGrupo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGrupo = {};
    });

    it('should respond with the updated grupo', function() {
      updatedGrupo.name.should.equal('Updated Grupo');
      updatedGrupo.info.should.equal('This is the updated grupo!!!');
    });

  });

  describe('DELETE /api/grupos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/grupos/' + newGrupo._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when grupo does not exist', function(done) {
      request(app)
        .delete('/api/grupos/' + newGrupo._id)
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
