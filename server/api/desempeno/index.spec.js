'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var desempenoCtrlStub = {
  index: 'desempenoCtrl.index',
  show: 'desempenoCtrl.show',
  create: 'desempenoCtrl.create',
  update: 'desempenoCtrl.update',
  destroy: 'desempenoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var desempenoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './desempeno.controller': desempenoCtrlStub
});

describe('Desempeno API Router:', function() {

  it('should return an express router instance', function() {
    desempenoIndex.should.equal(routerStub);
  });

  describe('GET /api/desempenos', function() {

    it('should route to desempeno.controller.index', function() {
      routerStub.get
        .withArgs('/', 'desempenoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/desempenos/:id', function() {

    it('should route to desempeno.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'desempenoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/desempenos', function() {

    it('should route to desempeno.controller.create', function() {
      routerStub.post
        .withArgs('/', 'desempenoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/desempenos/:id', function() {

    it('should route to desempeno.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'desempenoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/desempenos/:id', function() {

    it('should route to desempeno.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'desempenoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/desempenos/:id', function() {

    it('should route to desempeno.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'desempenoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
