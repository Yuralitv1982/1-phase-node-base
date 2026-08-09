// @ts-check
// Drill: drill-12-38

// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

const buf1 = Buffer.alloc(10);

const buf2 = Buffer.from('hello world');

console.log(buf1);

console.log(buf2);
console.log(buf2.toString('base64'));
console.log(buf2.toString('utf8'));

console.log(buf1.length);

buf1[0] = 72;
buf1[1] = 105;

buf1[2] = 33;

console.log(buf1.toString('utf8'));

let port = process.env.PORT;

if (port) {
  console.log(`port is state :${port}`);
} else {
  port = 3010;
  console.log(`default port: ${port}`);
}

const str = '10100px';

console.log(Number(str)); // number не преобразовывает в строку в число .. если смешано число и символы
console.log(parseInt(str, 10)); // прочитал строку дошел до первой буквы отрезал вывел число

function renderData() {
  return 'isLoaded true';
}

const isLoaded = true;

isLoaded && console.log(renderData());

for (let i = 10; i >= -1; i--) {
  console.log(i);

  i === 1 && console.log('start!');
}

function createServer(host = 'localhost', port = 8080) {
  return `${host}, ${port}`;
}

console.log(createServer());
console.log(createServer());
console.log(createServer());

console.log(createServer('0.0.0.0'));

console.log(createServer(undefined, 3000));

const host1 = 'localhost';
const port1 = 8080;

const config = {
  host1,
  port1,
};

console.dir(config);

const user = {
  name: 'bob',
  greet() {
    return this.name;
  },
};

const mike = {
  name: 'mike',
};

const fn = user.greet.bind(mike);
const fnAny = user.greet;
const fn1 = () => user.greet();

console.log(user.greet());
console.log(fn());
console.log(fnAny.bind(mike)());
//
console.log(fn1());

const list = ['a', 'b', 'c', 'd'];

const list1 = [...list];
// я знаю это поверхностная копия только верхний уровень ...
console.log(list1);
const sliceRes = list.slice(1, 3);
console.log('after slice', list, sliceRes);
const spliceRes = list.splice(1, 2);

console.log('after splice', list, spliceRes);

console.log(list);
console.log(spliceRes);
console.log(sliceRes);

//вывод slice ( чистый метод) он делает копию
// splice МУТИРУЕТ ОСНОВНОЙ МАССИВ ...  выход ... всегда делать копию данных перед преобразованием

const normal = {};

const pure = Object.create(null);

console.log(normal.toString, pure.toString);

// может это потому что null это последний объект в цепочке прототипирования...

class Parent {
  log() {
    return 'Parent';
  }
}

class Child extends Parent {
  log() {
    return `${super.log()} + Child`;
  }
}

const objParent = new Parent();
console.log(objParent.log());
const objChild = new Child();
console.log(objChild.log());
