// Drill: drill-20-10
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');
const addAuth = (req) => {
  req.user = 'Yura';
  console.warn('1.Auth added');
  return req;
};

const addTimestamp = (req) => {
  req.time = Date.now();
  console.warn('2. Timesamp added');
  return req;
};

const checkAccess = (req) => {
  if (req.user !== 'Yura') throw new Error('Access Denied');
  req.access = 'Granted';
  console.warn('3. Access checked');
  return req;
};

function applyMiddleware(req, handlers) {
  let currentData = req;
  for (const handler of handlers) {
    currentData = handler(currentData);
  }
  return currentData;
}

const rawRequest = { url: '/api/data' };

const pipeline = [addAuth, addTimestamp, checkAccess];

const finalResult = applyMiddleware(rawRequest, pipeline);

console.warn('Result', finalResult);

const addFive = (num) => {
  return num + 5;
};

const multiplyByTwo = (num) => {
  return num * 2;
};

const subtractTen = (num) => {
  return num - 10;
};

function mathPipeline(num, steps) {
  let startValue = num;
  for (const step of steps) {
    startValue = step(startValue);
  }
  return startValue;
}

const process = [addFive, multiplyByTwo, subtractTen];
const anyNumber = 15;

const resultProcess = mathPipeline(anyNumber, process);

console.warn('result', resultProcess);
