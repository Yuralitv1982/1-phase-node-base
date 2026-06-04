// Drill: drill-21-20
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

// Наша подопытная функция. Ничего лишнего, только математика.
function calculateTarget(a, b) {
  return a * b + 255;
}

// "Прогрев" (Warm-up).
// Заставляем V8 посмотреть на функцию и оптимизировать её.
let dummy = 0;
for (let i = 0; i < 100000; i++) {
  dummy += calculateTarget(i, 2);
}

console.log('Цикл завершен, функция скомпилирована.');
