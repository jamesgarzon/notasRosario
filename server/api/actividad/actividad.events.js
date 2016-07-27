/**
 * Actividad model events
 */

'use strict';

import {EventEmitter} from 'events';
import Actividad from './actividad.model';
var ActividadEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ActividadEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Actividad.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ActividadEvents.emit(event + ':' + doc._id, doc);
    ActividadEvents.emit(event, doc);
  }
}

export default ActividadEvents;
