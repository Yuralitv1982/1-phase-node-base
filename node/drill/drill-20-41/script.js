// @ts-check
// Drill: drill-20-32
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

import { log } from 'node:console';
import { EventEmitter } from 'node:events';

const kettle = new EventEmitter();

kettle.on('boiled', () => {
  console.log('[Action]: Power relay disconnected.');
});

console.log('Senson: Temperature reached 100C. Triggering execution....');

kettle.emit('boiled');

const emitter = new EventEmitter();

emitter.on('ping', () => {
  console.log('emitter: pong');
});

emitter.emit('ping');
