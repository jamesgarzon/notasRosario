/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/registros              ->  index
 * POST    /api/registros              ->  create
 * GET     /api/registros/:id          ->  show
 * PUT     /api/registros/:id          ->  update
 * DELETE  /api/registros/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Registro from './registro.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Registros
export function index(req, res) {
  return Registro.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Registro from the DB
export function show(req, res) {
  return Registro.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Registro in the DB
export function create(req, res) {
  return Registro.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Registro in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Registro.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Registro from the DB
export function destroy(req, res) {
  return Registro.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
