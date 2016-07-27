'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var actividadCtrlStub = {
  index: 'actividadCtrl.index',
  show: 'actividadCtrl.show',
  create: 'actividadCtrl.create',
  update: 'actividadCtrl.update',
  destroy: 'actividadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var actividadIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './actividad.controller': actividadCtrlStub
});

describe('Actividad API Router:', function() {

  it('should return an express router instance', function() {
    actividadIndex.should.equal(routerStub);
  });

  describe('GET /api/actividades', function() {

    it('should route to actividad.controller.index', function() {
      routerStub.get
        .withArgs('/', 'actividadCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/actividades/:id', function() {

    it('should route to actividad.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'actividadCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/actividades', function() {

    it('should route to actividad.controller.create', function() {
      routerStub.post
        .withArgs('/', 'actividadCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/actividades/:id', function() {

    it('should route to actividad.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'actividadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/actividades/:id', function() {

    it('should route to actividad.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'actividadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/actividades/:id', function() {

    it('should route to actividad.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'actividadCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
