/**
 * Registro model events
 */

'use strict';

import {EventEmitter} from 'events';
import Registro from './registro.model';
var RegistroEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RegistroEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Registro.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RegistroEvents.emit(event + ':' + doc._id, doc);
    RegistroEvents.emit(event, doc);
  }
}

export default RegistroEvents;
