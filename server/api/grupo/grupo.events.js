/**
 * Grupo model events
 */

'use strict';

import {EventEmitter} from 'events';
import Grupo from './grupo.model';
var GrupoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GrupoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Grupo.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GrupoEvents.emit(event + ':' + doc._id, doc);
    GrupoEvents.emit(event, doc);
  }
}

export default GrupoEvents;
