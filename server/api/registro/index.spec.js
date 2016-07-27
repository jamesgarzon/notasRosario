'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var registroCtrlStub = {
  index: 'registroCtrl.index',
  show: 'registroCtrl.show',
  create: 'registroCtrl.create',
  update: 'registroCtrl.update',
  destroy: 'registroCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var registroIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './registro.controller': registroCtrlStub
});

describe('Registro API Router:', function() {

  it('should return an express router instance', function() {
    registroIndex.should.equal(routerStub);
  });

  describe('GET /api/registros', function() {

    it('should route to registro.controller.index', function() {
      routerStub.get
        .withArgs('/', 'registroCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/registros/:id', function() {

    it('should route to registro.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'registroCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/registros', function() {

    it('should route to registro.controller.create', function() {
      routerStub.post
        .withArgs('/', 'registroCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/registros/:id', function() {

    it('should route to registro.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'registroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/registros/:id', function() {

    it('should route to registro.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'registroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/registros/:id', function() {

    it('should route to registro.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'registroCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
