// @ts-check
// Drill: drill-18-30

// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

import fs from 'node:fs';

import EventEmitter from 'node:events';

fs.readFile('someone.txt', () => {
  setTimeout(() => console.log('Timer'), 0);

  setImmediate(() => console.log('Immedate'));

  process.nextTick(() => console.log('nextTick'));
});

class MyApp extends EventEmitter {
  constructor() {
    super();

    process.nextTick(() => {
      this.emit('ready');
    });
  }
}

const app = new MyApp();

app.on('ready', () => {
  console.log('app start!');
});

const myPager = new Promise((resolve, reject) => {
  let isMeatAvailable = true;

  if (isMeatAvailable) {
    resolve('There is your burger');
  } else {
    reject('meat end');
  }
});

console.log(myPager);

myPager.then((food) => {
  console.log('I got my ' + food);
  return food + 'and potetos';
}).then;
