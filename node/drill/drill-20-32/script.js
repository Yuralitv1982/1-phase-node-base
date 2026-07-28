// @ts-check
// Drill: drill-20-32
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

import { EventEmitter } from 'node:events';

const kettle = new EventEmitter();

kettle.on('boiled', () => {
  console.log('[Action]: Power relay disconnected.');
});

console.log('Senson: Temperature reached 100C. Triggering execution....');

kettle.emit('boiled');
