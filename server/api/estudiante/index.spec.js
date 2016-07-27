'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var estudianteCtrlStub = {
  index: 'estudianteCtrl.index',
  show: 'estudianteCtrl.show',
  create: 'estudianteCtrl.create',
  update: 'estudianteCtrl.update',
  destroy: 'estudianteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var estudianteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './estudiante.controller': estudianteCtrlStub
});

describe('Estudiante API Router:', function() {

  it('should return an express router instance', function() {
    estudianteIndex.should.equal(routerStub);
  });

  describe('GET /api/estudiantes', function() {

    it('should route to estudiante.controller.index', function() {
      routerStub.get
        .withArgs('/', 'estudianteCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/estudiantes/:id', function() {

    it('should route to estudiante.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'estudianteCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/estudiantes', function() {

    it('should route to estudiante.controller.create', function() {
      routerStub.post
        .withArgs('/', 'estudianteCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/estudiantes/:id', function() {

    it('should route to estudiante.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'estudianteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/estudiantes/:id', function() {

    it('should route to estudiante.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'estudianteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/estudiantes/:id', function() {

    it('should route to estudiante.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'estudianteCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
