// Drill: drill-18-37
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

class Machine {
  constructor(power) {
    this.power = power;
  }

  turnOn() {
    console.log('Power off');
  }
}

class CoffeeMachine extends Machine {
  constructor(power, capacity) {
    super(power);
    this.capacity = capacity;
  }
  makeCoffee() {
    console.log('Make Coffee');
  }
}

const machine1 = new Machine('power-machine');

console.log(machine1);

const coffeeMachine1 = new CoffeeMachine('power-coffee', 'capacity-coffee');

console.log(coffeeMachine1);

coffeeMachine1.brand = 'jacobs';

console.log(coffeeMachine1);

class Base {
  constructor(name) {
    this.name = name;
  }
  hiBase() {
    console.log(`Hi, ${this.name} from base`);
  }
}

const base1 = new Base('Joy');
base1.hiBase();

class Child extends Base {
  constructor(position, status) {
    super(name);
    this.position = position;
    this.status = status;
  }

  helloCihild() {
    console.log(`helloCihild`);
  }
}
