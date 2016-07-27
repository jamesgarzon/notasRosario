'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var asignaturaCtrlStub = {
  index: 'asignaturaCtrl.index',
  show: 'asignaturaCtrl.show',
  create: 'asignaturaCtrl.create',
  update: 'asignaturaCtrl.update',
  destroy: 'asignaturaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var asignaturaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './asignatura.controller': asignaturaCtrlStub
});

describe('Asignatura API Router:', function() {

  it('should return an express router instance', function() {
    asignaturaIndex.should.equal(routerStub);
  });

  describe('GET /api/asignaturas', function() {

    it('should route to asignatura.controller.index', function() {
      routerStub.get
        .withArgs('/', 'asignaturaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/asignaturas/:id', function() {

    it('should route to asignatura.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'asignaturaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/asignaturas', function() {

    it('should route to asignatura.controller.create', function() {
      routerStub.post
        .withArgs('/', 'asignaturaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/asignaturas/:id', function() {

    it('should route to asignatura.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'asignaturaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/asignaturas/:id', function() {

    it('should route to asignatura.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'asignaturaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/asignaturas/:id', function() {

    it('should route to asignatura.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'asignaturaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
