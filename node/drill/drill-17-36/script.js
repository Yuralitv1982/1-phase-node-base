// @ts-check
// Drill: drill-17-36
// RAM-mode: ACTIVE
import fs from 'node:fs';

console.warn('Strict Airbnb environment is ready!');

try {
  console.log('start block try');
  unexistFunction();

  console.log('this strocke is never run');
} catch (error) {
  console.error('Error: ' + error.message);
}

console.log('-'.repeat(30));

try {
  openFile();
  readData();
} catch (err) {
  console.error('Error work with file');
} finally {
  console.log('block finally');
}

console.log('-'.repeat(30));

fs.readFile('./package.json', () => {
  setTimeout(() => console.log('timer'), 0);

  setImmediate(() => console.log('immediate'));

  process.nextTick(() => console.log('nextTick'));
});

function burger(isMeatAvailable) {
  const myPager = new Promise((res, rej) => {
    if (isMeatAvailable) {
      res('Here is your burger');
    } else {
      rej('meat is not available');
    }
  });
  return myPager;
}

console.log(burger(true));
