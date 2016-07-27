/**
 * Area model events
 */

'use strict';

import {EventEmitter} from 'events';
import Area from './area.model';
var AreaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AreaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Area.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AreaEvents.emit(event + ':' + doc._id, doc);
    AreaEvents.emit(event, doc);
  }
}

export default AreaEvents;
