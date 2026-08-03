//app.js
import processUsers from './processor.js';
const data = await processUsers('./users.json');
console.log(data);
