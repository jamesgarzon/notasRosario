'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var periodoCtrlStub = {
  index: 'periodoCtrl.index',
  show: 'periodoCtrl.show',
  create: 'periodoCtrl.create',
  update: 'periodoCtrl.update',
  destroy: 'periodoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var periodoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './periodo.controller': periodoCtrlStub
});

describe('Periodo API Router:', function() {

  it('should return an express router instance', function() {
    periodoIndex.should.equal(routerStub);
  });

  describe('GET /api/periodos', function() {

    it('should route to periodo.controller.index', function() {
      routerStub.get
        .withArgs('/', 'periodoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/periodos/:id', function() {

    it('should route to periodo.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'periodoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/periodos', function() {

    it('should route to periodo.controller.create', function() {
      routerStub.post
        .withArgs('/', 'periodoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/periodos/:id', function() {

    it('should route to periodo.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'periodoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/periodos/:id', function() {

    it('should route to periodo.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'periodoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/periodos/:id', function() {

    it('should route to periodo.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'periodoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
