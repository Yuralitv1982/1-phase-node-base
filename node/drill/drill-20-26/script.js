// @ts-check
// Drill: drill-20-26
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

const animal = {
  eats: true,
  walk() {
    console.log('Animal walks');
  },
};

const rabbit = {
  jumps: true,
};

Object.setPrototypeOf(rabbit, animal);

console.log(rabbit.jumps);
console.log(rabbit.eats);

rabbit.walk();

function User(name) {
  this.name = name;
}

User.prototype.sayHi = function () {
  console.log('Hi, ' + this.name);
};

const user1 = new User('Alice');
const user2 = new User('Bob');

user1.sayHi();

function simulateNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);

  const result = Constructor.apply(obj, args);

  return typeof result === 'object' && result !== null ? result : obj;
}

const user3 = simulateNew(User, 'Tina');

console.log(user3);

user3.sayHi();

class Article {
  constructor(title) {
    this.title = title;
  }

  read() {
    console.log(`Reading: ${this.title}`);
  }
}

const doc = new Article('js core');

console.log(doc);

doc.read();

class Machine {
  constructor(power) {
    this.power = power;
  }

  turnOn() {
    console.log('Machine turnOn');
  }
}

class CoffeMachine extends Machine {
  constructor(power, capacity) {
    super(power);
    this.capacity = capacity;
  }

  makeCoffe() {
    console.log('make a coffe');
  }
}

const cofeMach1 = new CoffeMachine();

cofeMach1.turnOn();
cofeMach1.makeCoffe();

for (let key in cofeMach1) {
  console.log(key);
}

class Yuser {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var Yuser1 = (function () {
  function Yuser1(name, age) {
    if (!(this instanceof Yuser1)) {
      throw new TypeError('cannot call a class as a function');
    }
    this.age = age;
    this.name = name;
  }
  return Yuser1;
})();

class Developer {
  constructor(name) {
    this.name = name;
  }

  code() {
    console.log(`${this.name} writes code`);
  }

  debug = () => {
    console.log(`${this.name} debugs code`);
  };
}

const dev1 = new Developer('John');
const dev2 = new Developer('Jane');

console.log(dev1.hasOwnProperty('code'));
console.log(dev1.hasOwnProperty('debug'));

const descriptor = Object.getOwnPropertyDescriptor(Developer.prototype, 'code');
console.log(descriptor?.enumerable);

// class Parent {
//   static category = 'Base';
//   static showCategory() {
//     console.log(this.category);
//   }
// }
//
// class Child extends Parent {
//   static category = 'Derived';
// }

// Child.showCategory();

function Parent() {}
Parent.category = 'Base';
Parent.showCategory = function () {
  console.log(this.category);
};

function Child() {}

// Наследование статических свойств на уровне конструкторов:
// Child.[[Prototype]] = Parent
Object.setPrototypeOf(Child, Parent);

// Наследование обычных методов на уровне прототипов экземпляров:
// Child.prototype.[[Prototype]] = Parent.prototype
Object.setPrototypeOf(Child.prototype, Parent.prototype);

Child.category = 'Derived';

Child.showCategory(); // "Derived"
