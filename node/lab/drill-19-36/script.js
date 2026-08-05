// @ts-check
// Drill: drill-19-36

import { features } from 'node:process';

// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

class ConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConfigError';

    Error.captureStackTrace(this, this.constructor);
  }
}

const { ENABLE_CACHE = 'false', PORT = '3010', DB_IP } = process.env;

console.log(`db_ip : ${DB_IP}`);

console.log(`enable cache : ${ENABLE_CACHE}`);

if (DB_IP === undefined) {
  throw new ConfigError('missing mandatory variabel: DB_IP');
}

const port = Number(PORT);

console.log(typeof port, port);

const isCacheEnabled = ENABLE_CACHE === 'true';

// console.log(ENABLE_CACHE);

const config = {
  server: {
    port: port,
  },
  database: {
    ip: DB_IP,
  },
  features: {
    cache: isCacheEnabled,
  },
};

console.log(`Server config : `);

console.table(config);

// Function declaration for deep freezing an object
function deepFreeze(obj) {
  // Early return pattern: if the object is strictly empty, log and exit
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    console.log('Object is empty, nothing to freeze here.');
    return obj;
  }

  // 1. Get the array of object keys (the "list of names")
  const arrObj = Object.keys(obj);

  // 2. Iterate over the keys
  for (let i = 0; i < arrObj.length; i++) {
    const currentKey = arrObj[i];
    const currentValue = obj[currentKey];

    // 3. Check if the current value is an object and not null
    // typeof null is 'object' in JS, so we strictly exclude it
    if (typeof currentValue === 'object' && currentValue !== null) {
      // 4. Recursion: call deepFreeze for the nested object
      deepFreeze(currentValue);
    }
  }

  // 5. Freeze the current level of the object using standard V8 method
  Object.freeze(obj);

  // 6. Return the fully frozen object
  return obj;
}

// Applying the function to our config object
deepFreeze(config);

// Testing the freeze by attempting a mutation (in strict mode this throws an error)
// config.server.port = 9999;
