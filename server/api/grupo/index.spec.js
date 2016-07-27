'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var grupoCtrlStub = {
  index: 'grupoCtrl.index',
  show: 'grupoCtrl.show',
  create: 'grupoCtrl.create',
  update: 'grupoCtrl.update',
  destroy: 'grupoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var grupoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './grupo.controller': grupoCtrlStub
});

describe('Grupo API Router:', function() {

  it('should return an express router instance', function() {
    grupoIndex.should.equal(routerStub);
  });

  describe('GET /api/grupos', function() {

    it('should route to grupo.controller.index', function() {
      routerStub.get
        .withArgs('/', 'grupoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/grupos/:id', function() {

    it('should route to grupo.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'grupoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/grupos', function() {

    it('should route to grupo.controller.create', function() {
      routerStub.post
        .withArgs('/', 'grupoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/grupos/:id', function() {

    it('should route to grupo.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'grupoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/grupos/:id', function() {

    it('should route to grupo.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'grupoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/grupos/:id', function() {

    it('should route to grupo.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'grupoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
