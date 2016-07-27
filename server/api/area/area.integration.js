'use strict';

var app = require('../..');
import request from 'supertest';

var newArea;

describe('Area API:', function() {

  describe('GET /api/areas', function() {
    var areas;

    beforeEach(function(done) {
      request(app)
        .get('/api/areas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          areas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      areas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/areas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/areas')
        .send({
          name: 'New Area',
          info: 'This is the brand new area!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newArea = res.body;
          done();
        });
    });

    it('should respond with the newly created area', function() {
      newArea.name.should.equal('New Area');
      newArea.info.should.equal('This is the brand new area!!!');
    });

  });

  describe('GET /api/areas/:id', function() {
    var area;

    beforeEach(function(done) {
      request(app)
        .get('/api/areas/' + newArea._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          area = res.body;
          done();
        });
    });

    afterEach(function() {
      area = {};
    });

    it('should respond with the requested area', function() {
      area.name.should.equal('New Area');
      area.info.should.equal('This is the brand new area!!!');
    });

  });

  describe('PUT /api/areas/:id', function() {
    var updatedArea;

    beforeEach(function(done) {
      request(app)
        .put('/api/areas/' + newArea._id)
        .send({
          name: 'Updated Area',
          info: 'This is the updated area!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedArea = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedArea = {};
    });

    it('should respond with the updated area', function() {
      updatedArea.name.should.equal('Updated Area');
      updatedArea.info.should.equal('This is the updated area!!!');
    });

  });

  describe('DELETE /api/areas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/areas/' + newArea._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when area does not exist', function(done) {
      request(app)
        .delete('/api/areas/' + newArea._id)
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
