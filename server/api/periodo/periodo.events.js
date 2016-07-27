/**
 * Periodo model events
 */

'use strict';

import {EventEmitter} from 'events';
import Periodo from './periodo.model';
var PeriodoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PeriodoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Periodo.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PeriodoEvents.emit(event + ':' + doc._id, doc);
    PeriodoEvents.emit(event, doc);
  }
}

export default PeriodoEvents;
