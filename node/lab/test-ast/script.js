const acorn = require('acorn');

// Наш подопытный код
const code = "let sum = 5 + 10;";

// Заставляем Acorn разобрать код и построить AST
const ast = acorn.parse(code, { ecmaVersion: 2022 });

// Выводим дерево в консоль в красивом JSON-формате
console.log(JSON.stringify(ast, null, 2));
