// Drill: drill-18-52
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

const key = 'user_role';

const meta = {
  name: 'user',
  [key]: 'admin',
};

console.warn(meta);

console.log('-'.repeat(30));

const user = {
  name: 'Bob',
  greet() {
    return this.name;
  },
};

console.warn(user.greet());

const userVasiya = {
  name: 'Vasiliy',
};

console.warn(user.greet.call(userVasiya));

console.log('-'.repeat(10) + ' LABEL ' + '-'.repeat(10));

const arr = [1, 2, 3];

const arrPush = arr.push(4);

console.warn(arrPush);
console.warn(arr);
const arrPop = arr.pop();
console.warn(arrPop);
console.warn(arr);

function User() {}

const u = new User();

console.warn(u.__proto__);
console.warn(User.prototype);
console.warn(u.__proto__ === User.prototype);
