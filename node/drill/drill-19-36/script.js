// @ts-check
// Drill: drill-19-36
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

// trace.js
import fs from 'node:fs';
import asyncHooks from 'node:async_hooks';

// Используем fs.writeSync для вывода в stdout,
// чтобы сам console.log не плодил новые асинхронные события
function log(msg) {
  fs.writeSync(1, `${msg}\n`);
}

const hook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    log(
      `[INIT] Resource: ${type} | ID: ${asyncId} | Triggered by ID: ${triggerAsyncId}`,
    );
  },
  before(asyncId) {
    log(`[BEFORE] Event Loop начинает выполнять callback для ID: ${asyncId}`);
  },
  after(asyncId) {
    log(`[AFTER] Callback для ID: ${asyncId} завершен`);
  },
  destroy(asyncId) {
    log(`[DESTROY] Ресурс ID: ${asyncId} уничтожен`);
  },
});

hook.enable();

log('1. Синхронный код: вызываем fs.readFile');

fs.readFile('data.txt', 'utf8', (err, data) => {
  log('3. Колбэк внутри fs.readFile выполнен!');
});

log('2. Синхронный код завершен');
