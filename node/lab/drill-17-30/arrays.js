const arr = [1, 2, 3, 5, 6, 7];

const arrRes = arr.map((el) => el * 2);

console.log(arrRes);

const objArr = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
];

const resObjArr = objArr.map((el) => el.name);

console.log(resObjArr);

const evenArr = arr.filter((el) => el % 2 === 0);

console.log(evenArr);

const arrAge = objArr.filter((el) => el.age < 30);
console.log(arrAge);

const arrCat = ['tech', 'life', 'tech', 'sport', 'tech', 'life'];

const resultArrCat = arrCat.reduce((acc, item) => {
  if (acc[item]) {
    acc[item] += 1;
  } else {
    acc[item] = 1;
  }
  return acc;
}, {});

console.log(resultArrCat);

const letters = ['a', 'b', 'a', 'c', 'a', 'b'];

const resLetters = letters.reduce((acc, el) => {
  if (acc[el]) {
    acc[el] += 1;
  } else {
    acc[el] = 1;
  }
  return acc;
}, {});
console.log(resLetters);

const products = [
  { name: 'Apple', category: 'fruit' },
  { name: 'Carrot', category: 'vegetable' },
  { name: 'Banana', category: 'fruit' },
];

const resProducts = products.reduce((acc, el) => {
  const category = el.category;
  if (acc[category]) {
    acc[category].push(el);
  } else {
    acc[category] = [el];
  }
  return acc;
}, {});

console.log(resProducts);

const orders = [
  { id: 1, status: 'completed', amount: 100 },
  { id: 2, status: 'pending', amount: 200 },
  { id: 3, status: 'completed', amount: 500 },
  { id: 4, status: 'canceled', amount: 150 },
  { id: 5, status: 'completed', amount: 300 },
];

const resOrders = orders
  .filter((el) => el.status === 'completed')
  .reduce((acc, el) => (acc = acc + Number(el.amount)), 0);
console.log(resOrders);

const catOrders = orders.reduce((acc, el) => {
  const status = el.status;
  if (acc[status]) {
    acc[status].push(el);
  } else {
    acc[status] = [el];
  }
  return acc;
}, {});

console.log(catOrders);

const tasks = [
  { id: 1, title: 'Learn JS array methods', completed: true },
  { id: 2, title: 'Write tests', completed: false },
  { id: 3, title: 'Deploy to server', completed: false },
];

const taskId = tasks.find((el) => el.id === 2);
const hasUncompleted = tasks.some((el) => el.completed === false);
const isAllCompleted = tasks.every((el) => el.completed === true);

console.log(taskId, hasUncompleted, isAllCompleted);
