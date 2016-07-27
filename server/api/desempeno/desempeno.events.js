/**
 * Desempeno model events
 */

'use strict';

import {EventEmitter} from 'events';
import Desempeno from './desempeno.model';
var DesempenoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DesempenoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Desempeno.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DesempenoEvents.emit(event + ':' + doc._id, doc);
    DesempenoEvents.emit(event, doc);
  }
}

export default DesempenoEvents;
