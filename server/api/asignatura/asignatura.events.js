/**
 * Asignatura model events
 */

'use strict';

import {EventEmitter} from 'events';
import Asignatura from './asignatura.model';
var AsignaturaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AsignaturaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Asignatura.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AsignaturaEvents.emit(event + ':' + doc._id, doc);
    AsignaturaEvents.emit(event, doc);
  }
}

export default AsignaturaEvents;
