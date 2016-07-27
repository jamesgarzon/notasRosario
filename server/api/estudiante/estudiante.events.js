/**
 * Estudiante model events
 */

'use strict';

import {EventEmitter} from 'events';
import Estudiante from './estudiante.model';
var EstudianteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EstudianteEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Estudiante.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EstudianteEvents.emit(event + ':' + doc._id, doc);
    EstudianteEvents.emit(event, doc);
  }
}

export default EstudianteEvents;
