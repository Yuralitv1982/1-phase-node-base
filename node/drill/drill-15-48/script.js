// @ts-check
// Drill: drill-15-48
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');
import path from 'node:path';
import { PI, add, minus } from './math.js';

import MySuperLogger from './logger.js';

import doSomething from './utils.js';
const logger = new MySuperLogger();

logger.log('Hello!');
console.log(PI);

console.log(add(4, 5));

console.log(minus(9, 3));

doSomething();

console.dir(path);

const dirFile = path.dirname;

console.log(process.env.PWD);
const curPath = process.env.PWD;

const parsePath = path.parse(curPath);

console.log(parsePath);

const curPathArr = curPath.split(path.sep);

console.log(curPathArr);
