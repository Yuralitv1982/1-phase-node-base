//app.js

import processUsers from './processor.js';

const result = await processUsers('./users.json');

console.log(result.getSummary());
