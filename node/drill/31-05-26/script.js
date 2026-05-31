// Drill: drill-18-53
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

function makeMultipier(factor) {
  return function getNumber(num) {
    return num * factor;
  };
}

console.warn(makeMultipier(2)(6));

const arrayOfNumber = [1, 3, 3, 4, 2, 6, 7, 6, 8];

const arrayOfNumberFilter = arrayOfNumber.filter(function (num) {
  return num % 2 === 0;
});

console.warn(arrayOfNumberFilter);

const arrayOfString = ['ad', 'oijum', 'lsil;', 'lkjoij', 'add', 'false'];

const arrayOfStringLength = arrayOfString.map((s) => s.length);

console.warn(arrayOfStringLength);

const objPrice = {
  a: 100,
  b: 400,
  c: 800,
  d: 200,
  e: 500,
};

const sortByPrice = (a, b) =>
  a.price > b.price ? 1 : a.price < b.price ? -1 : 0;

console.warn(sortByPrice(3, 4));

const obj = {
  msg: 'Node.js',
  print() {
    console.warn(this.msg);
  },
};

setTimeout(() => obj.print(), 100);
setTimeout(obj.print.bind(obj), 100);
