// @ts-check
// Drill: drill-19-50
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

const a = 3;
const b = 5;

calc(a, b);
// calcExp(a, b);
function calc(a, b) {
  return a + b;
}

const calcExp = function (a, b) {
  return a + b;
};

const add = (a, b) => a + b;

const multiple = (a, b) => a * b;

function typeOf(type) {
  return typeof type;
}

console.log(typeOf('str'));

function greet(name) {
  return `hello ${name}`;
}

console.log(greet('coder'));

console.log('-'.repeat(10) + ' LABEL ' + '-'.repeat(10));

function createUser(name, role = 'guest') {
  return `Hello ${name} your role is ${role}`;
}

console.log(createUser('Roman'));

const arr = [1, 2, 3, 4, 5, 6, 6];

function sumAll(...nums) {
  return nums.reduce((acc, cur) => acc + cur);
}

console.log(sumAll(1, 2));
console.log(sumAll(1, 2, 3, 4, 5, 6, 6));

function log(appName, version = '1.0', ...feature) {
  const [first, second, theard] = feature;
  return `app : ${appName}, version : ${version}, and ${first} ${second} ${theard}`;
}

console.log(log('easyBot', undefined, 'i want', 'to ', 'best'));

function anyArgs() {
  return arguments;
}
console.log(anyArgs());

const arrArgs = () => arguments;

function processData(val) {
  if (val === undefined) {
    return `null`;
  }
  return val * 2;
}

console.log(processData(2));

function makeMultiplier(factor) {
  return function (x) {
    return x * factor;
  };
}

const resultFactor = makeMultiplier(5);

console.log(resultFactor(2));

function evenNum(arr) {
  return arr.filter((el) => el % 2 === 0);
}

console.log(evenNum(arr));

const arrStr = ['asd', 'd', 'ab', 'asldfjs;dlfk', 'fu'];

const newStrarr = arrStr.map((el) => el.length);

console.log(newStrarr);

// Comparator function for sorting objects by 'price' in ascending order
const compareByPrice = (a, b) => a.price - b.price;

// Example usage:
const items = [
  { name: 'Item A', price: 100 },
  { name: 'Item B', price: 20 },
  { name: 'Item C', price: 50 },
];

items.sort(compareByPrice);

// Strict comparator returning exact values: -1, 0, 1
const compareByPriceStrict = (a, b) => {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
};
